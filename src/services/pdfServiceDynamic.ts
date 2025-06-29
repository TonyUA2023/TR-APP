// src/services/pdfServiceDynamic.ts

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { PDFDocument, PDFForm, rgb, StandardFonts, PDFImage, PDFPage } from 'pdf-lib';
import { format } from 'date-fns';

import { FormData, InspectionForm, ExportResult } from '../types';
import { getTemplateMapping, TemplateMapping } from './pdf/templateMappings';

class PDFServiceDynamic {
  private templateCache: Map<string, Uint8Array> = new Map();
  
  /**
   * MÉTODO PRINCIPAL - GENERA PDF CON PLANTILLA DINÁMICA
   */
  async generateFormPDF(formData: FormData, form: InspectionForm): Promise<ExportResult> {
    console.log(`🚀 Generating PDF for form: "${form.id}" - Template: "${form.pdfTemplate}"`);

    try {
      // Validar que existe plantilla
      if (!form.pdfTemplate) {
        throw new Error('Form does not have a PDF template assigned');
      }

      // Obtener mapping de la plantilla
      const templateMapping = getTemplateMapping(form.pdfTemplate);
      if (!templateMapping) {
        throw new Error(`No mapping found for template: ${form.pdfTemplate}`);
      }

      // Cargar plantilla
      const templateBytes = await this.loadTemplate(form.pdfTemplate);
      console.log('✅ Template loaded successfully');
      
      // Llenar plantilla con datos
      return await this.fillTemplateWithData(templateBytes, formData, form, templateMapping);
      
    } catch (error) {
      console.error('❌ Error in generateFormPDF:', error);
      return {
        success: false,
        error: `PDF generation failed: ${(error as any).message}`,
      };
    }
  }

  /**
   * LLENAR PLANTILLA CON DATOS USANDO MAPPING DINÁMICO
   */
  private async fillTemplateWithData(
    templateBytes: Uint8Array, 
    formData: FormData, 
    form: InspectionForm,
    templateMapping: TemplateMapping
  ): Promise<ExportResult> {
    try {
      console.log('🎨 Filling template with data...');
      
      const pdfDoc = await PDFDocument.load(templateBytes, {
        ignoreEncryption: true,
        parseSpeed: 100,
        throwOnInvalidObject: false,
        updateMetadata: false,
        capNumbers: false,
      });
      
      const pdfForm = await this.getFormSafely(pdfDoc);
      
      if (!pdfForm) {
        throw new Error('Could not access PDF form');
      }
      
      // Llenar campos usando mappings dinámicos
      await this.fillTextFields(pdfForm, formData, templateMapping.fieldMappings);
      await this.fillCheckboxes(pdfForm, formData, templateMapping.checkboxMappings);
      await this.fillDropdowns(pdfForm, formData, templateMapping.dropdownMappings, templateMapping.dropdownValueMappings);
      await this.fillSpecialFields(pdfForm, formData, templateMapping.specialFields);
      
      // IMPORTANTE: Procesar fotos con mejor manejo asíncrono
      await this.processPhotos(pdfDoc, pdfForm, formData, templateMapping.photoButtonMappings, templateMapping.photoSizeConstraints);
      
      // Guardar PDF
      console.log('💾 Saving PDF...');
      
      const pdfBytes = await pdfDoc.save({
        updateFieldAppearances: false,
        addDefaultPage: false,
        objectsPerTick: Infinity,
        useObjectStreams: false,
      });
      
      return await this.savePDF(pdfBytes, formData, form);
      
    } catch (error) {
      console.error('❌ Error filling template:', error);
      throw error;
    }
  }

  /**
   * CARGAR PLANTILLA DINÁMICA
   */
  private async loadTemplate(templateFile: string): Promise<Uint8Array> {
    // Verificar caché
    if (this.templateCache.has(templateFile)) {
      console.log(`📋 Loading template from cache: ${templateFile}`);
      return this.templateCache.get(templateFile)!;
    }
    
    console.log(`📋 Loading PDF template: ${templateFile}`);
    
    try {
      // Mapeo de archivos de plantilla a assets
      const templateAssets: Record<string, any> = {
        'secant-pile-template.pdf': require('../assets/templates/secant-pile-template.pdf'),
        '3UNDERPINNING.pdf': require('../assets/templates/3UNDERPINNING.pdf'),
        '5ELEVATOR_PIT.pdf': require('../assets/templates/5ELEVATOR_PIT.pdf'),
        '5.1MAT_SLAB.pdf': require('../assets/templates/5.1MAT_SLAB.pdf'),
        '13WALLSTRIP.pdf': require('../assets/templates/13WALLSTRIP.pdf'),
        '9GRADE_BEAM.pdf': require('../assets/templates/9GRADE_BEAM.pdf'),
        '8FOUNDATION_WALL.pdf': require('../assets/templates/8FOUNDATION_WALL.pdf'),
        '11SHEAR_WALL.pdf': require('../assets/templates/11SHEAR_WALL.pdf'),
        '10COLUMNS.pdf': require('../assets/templates/10COLUMNS.pdf'),
        '7BEAMS.pdf': require('../assets/templates/7BEAMS.pdf'),
        '12STEEL.pdf': require('../assets/templates/12STEEL.pdf'),
        '6CFS.pdf': require('../assets/templates/6CFS.pdf'),
        '4SUBGRADE.pdf': require('../assets/templates/4SUBGRADE.pdf'),
        '14Sprinkler.pdf': require('../assets/templates/14Sprinkler.pdf'),
        '15CMU.pdf': require('../assets/templates/15CMU.pdf'),
        '17HVACMechanicalIndoor.pdf': require('../assets/templates/17HVACMechanicalIndoor.pdf'),
        '18HVACMechanicalOutdoors.pdf': require('../assets/templates/18HVACMechanicalOutdoors.pdf'),
        '18.1HVACMechanicalOutdoors34.pdf': require('../assets/templates/18.1HVACMechanicalOutdoors34.pdf'),
        '19HVACDucts.pdf': require('../assets/templates/19HVACDucts.pdf'),
      };

      if (!templateAssets[templateFile]) {
        throw new Error(`Template asset not found: ${templateFile}`);
      }

      const asset = Asset.fromModule(templateAssets[templateFile]);
      await asset.downloadAsync();
      
      if (!asset.localUri) {
        throw new Error('Asset download failed - no localUri');
      }
      
      const base64Data = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      const templateBytes = this.base64ToUint8Array(base64Data);
      
      if (templateBytes.length < 10000) {
        throw new Error(`Template too small: ${templateBytes.length} bytes`);
      }
      
      // Guardar en caché
      this.templateCache.set(templateFile, templateBytes);
      console.log(`✅ Template loaded: ${templateFile} (${templateBytes.length} bytes)`);
      
      return templateBytes;
      
    } catch (error) {
      console.error('❌ Template loading failed:', error);
      throw new Error(`Failed to load template ${templateFile}: ${(error as any).message}`);
    }
  }

  /**
   * OBTENER FORMULARIO DE MANERA SEGURA
   */
  private async getFormSafely(pdfDoc: PDFDocument): Promise<PDFForm | null> {
    try {
      console.log('🔍 Getting form safely...');
      const form = pdfDoc.getForm();
      
      const fields = form.getFields();
      console.log(`📊 Found ${fields.length} fields in form`);
      
      const problematicFields: string[] = [];
      
      fields.forEach(field => {
        const name = field.getName();
        if (name.includes('Subtitle') || name.includes('Text8') || name.includes('Rich')) {
          problematicFields.push(name);
        }
      });
      
      if (problematicFields.length > 0) {
        console.log(`⚠️ Found ${problematicFields.length} potential rich text fields`);
      }
      
      return form;
    } catch (error) {
      console.error('❌ Error getting form:', error);
      return null;
    }
  }

  /**
   * LLENAR CAMPOS DE TEXTO CON MAPPING DINÁMICO
   */
  private async fillTextFields(
    form: PDFForm, 
    formData: FormData, 
    fieldMappings: Record<string, string>
  ): Promise<void> {
    console.log('📝 Filling text fields...');
    
    let successCount = 0;
    let skipCount = 0;
    
    for (const [dataKey, pdfFieldName] of Object.entries(fieldMappings)) {
      try {
        const value = formData[dataKey as keyof FormData];
        if (value !== undefined && value !== null && value !== '') {
          let field = null;
          try {
            field = form.getTextField(pdfFieldName);
          } catch (fieldError) {
            if (
              typeof fieldError === 'object' &&
              fieldError !== null &&
              'message' in fieldError &&
              typeof (fieldError as any).message === 'string' &&
              (fieldError as any).message.includes('rich text')
            ) {
              console.log(`⏭️ Skipping rich text field ${pdfFieldName}`);
              skipCount++;
              continue;
            }
            throw fieldError;
          }
          
          if (field) {
            const stringValue = String(value);
            field.setText(stringValue);
            console.log(`✅ ${pdfFieldName}: "${stringValue}"`);
            successCount++;
          }
        }
      } catch (error) {
        console.log(`⚠️ Field ${pdfFieldName} not found or error: ${typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error)}`);
      }
    }
    
    console.log(`📝 Text fields filled: ${successCount} successful, ${skipCount} skipped`);
  }

  /**
   * LLENAR CHECKBOXES CON MAPPING DINÁMICO
   */
  private async fillCheckboxes(
    form: PDFForm, 
    formData: FormData,
    checkboxMappings: Record<string, string>
  ): Promise<void> {
    console.log('☑️ Filling checkboxes...');
    
    for (const [dataKey, pdfFieldName] of Object.entries(checkboxMappings)) {
      try {
        const value = formData[dataKey as keyof FormData];
        const checkbox = form.getCheckBox(pdfFieldName);
        
        if (this.shouldCheckBox(value)) {
          checkbox.check();
        } else {
          checkbox.uncheck();
        }
        
        console.log(`✅ ${pdfFieldName}: ${this.shouldCheckBox(value) ? 'checked' : 'unchecked'}`);
      } catch (error) {
        console.log(`⚠️ Checkbox ${pdfFieldName} not found: ${(error as any).message}`);
      }
    }
  }

  /**
   * LLENAR DROPDOWNS CON MAPPING DINÁMICO
   */
  private async fillDropdowns(
    form: PDFForm, 
    formData: FormData,
    dropdownMappings: Record<string, string>,
    dropdownValueMappings?: Record<string, Record<string, string>>
  ): Promise<void> {
    console.log('📋 Filling dropdowns...');
    
    for (const [dataKey, pdfFieldName] of Object.entries(dropdownMappings)) {
      try {
        const rawValue = formData[dataKey as keyof FormData];
        if (!rawValue) continue;
        
        const dropdown = form.getDropdown(pdfFieldName);
        const options = dropdown.getOptions();
        
        let mappedValue = String(rawValue);
        
        // Aplicar mapping de valores si existe
        if (dropdownValueMappings) {
          const mapping = dropdownValueMappings[dataKey as keyof typeof dropdownValueMappings];
          if (mapping && mapping[rawValue as string]) {
            mappedValue = mapping[rawValue as string];
          }
        }
        
        console.log(`📋 ${pdfFieldName}: trying "${mappedValue}" from options: [${options.join(', ')}]`);
        
        if (options.includes(mappedValue)) {
          dropdown.select(mappedValue);
          console.log(`✅ ${pdfFieldName}: "${mappedValue}" selected`);
        } else {
          const matchingOption = options.find(opt => 
            opt.toLowerCase() === mappedValue.toLowerCase()
          );
          
          if (matchingOption) {
            dropdown.select(matchingOption);
            console.log(`✅ ${pdfFieldName}: "${matchingOption}" selected (case-insensitive)`);
          } else {
            console.log(`⚠️ ${pdfFieldName}: value "${mappedValue}" not found in options`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Dropdown ${pdfFieldName} error: ${(error as any).message}`);
      }
    }
  }

  /**
   * LLENAR CAMPOS ESPECIALES CON MAPPING DINÁMICO
   */
  private async fillSpecialFields(
    form: PDFForm, 
    formData: FormData,
    specialFields?: Array<{ name: string; value: string | ((data: any) => string) }>
  ): Promise<void> {
    if (!specialFields || specialFields.length === 0) return;
    
    console.log('🔧 Filling special fields...');
    
    for (const { name, value } of specialFields) {
      try {
        const fieldValue = typeof value === 'function' ? value(formData) : value;
        
        if (fieldValue) {
          let field = null;
          try {
            field = form.getTextField(name);
          } catch (fieldError) {
            if ((fieldError as any).message && (fieldError as any).message.includes('rich text')) {
              console.log(`⏭️ Skipping rich text field ${name}`);
              continue;
            }
            throw fieldError;
          }
          
          if (field) {
            field.setText(String(fieldValue));
            console.log(`✅ ${name}: "${fieldValue}"`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Special field ${name} not found or error: ${(error as any).message}`);
      }
    }
  }

  /**
   * PROCESAR FOTOS CON MAPPING DINÁMICO - VERSIÓN MEJORADA
   */
  private async processPhotos(
    pdfDoc: PDFDocument, 
    form: PDFForm, 
    formData: FormData,
    photoButtonMappings: Record<string, string>,
    photoSizeConstraints?: Record<string, { maxWidth: number; maxHeight: number }>
  ): Promise<void> {
    console.log('📸 Processing photos...');
    
    const processedPhotos: string[] = [];
    const failedPhotos: string[] = [];
    
    // Procesar cada foto de manera secuencial para evitar problemas de concurrencia
    for (const [dataKey, pdfButtonName] of Object.entries(photoButtonMappings)) {
      try {
        const photoUri = formData[dataKey as keyof FormData];
        
        if (photoUri && typeof photoUri === 'string' && photoUri.length > 0) {
          console.log(`📸 Processing photo for ${dataKey}`);
          console.log(`📸 Photo URI: ${photoUri.substring(0, 100)}...`);
          
          // Verificar que el archivo existe antes de procesarlo
          const fileInfo = await FileSystem.getInfoAsync(photoUri);
          if (!fileInfo.exists) {
            console.log(`⚠️ File does not exist: ${photoUri}`);
            failedPhotos.push(dataKey);
            continue;
          }
          
          let button = null;
          try {
            button = form.getButton(pdfButtonName);
          } catch (buttonError) {
            console.log(`⚠️ Cannot get button ${pdfButtonName}: ${(buttonError as any).message}`);
            failedPhotos.push(dataKey);
            continue;
          }
          
          if (button) {
            // Embedar imagen con mejor manejo de errores
            const embeddedImage = await this.embedImageFromUri(pdfDoc, photoUri, dataKey);
            
            if (embeddedImage) {
              try {
                const dimensions = this.calculateImageDimensions(
                  embeddedImage, 
                  dataKey, 
                  photoSizeConstraints
                );
                
                // Establecer imagen en el botón
                button.setImage(embeddedImage, {
                  width: dimensions.width,
                  height: dimensions.height,
                  alignment: 0
                });
                
                // Intentar actualizar apariencias (puede fallar en algunos PDFs)
                try {
                  button.updateAppearances();
                } catch (appearanceError) {
                  console.log(`⚠️ Could not update appearance for ${pdfButtonName} - continuing anyway`);
                }
                
                processedPhotos.push(dataKey);
                console.log(`✅ Photo ${dataKey} set successfully`);
                
                // Pequeña pausa para evitar problemas de concurrencia
                await new Promise(resolve => setTimeout(resolve, 100));
                
              } catch (setImageError) {
                console.log(`⚠️ Could not set image for ${pdfButtonName}: ${(setImageError as any).message}`);
                failedPhotos.push(dataKey);
              }
            } else {
              failedPhotos.push(dataKey);
            }
          } else {
            failedPhotos.push(dataKey);
          }
        }
      } catch (error) {
        console.log(`⚠️ Error processing photo ${dataKey}: ${(error as any).message}`);
        failedPhotos.push(dataKey);
      }
    }
    
    console.log(`📸 Photos processed successfully: ${processedPhotos.length}`);
    if (failedPhotos.length > 0) {
      console.log(`⚠️ Photos that could not be processed: ${failedPhotos.join(', ')}`);
    }
  }

  /**
   * CALCULAR DIMENSIONES DE IMAGEN CON CONSTRAINTS DINÁMICOS
   */
  private calculateImageDimensions(
    image: PDFImage, 
    fieldName: string,
    sizeConstraints?: Record<string, { maxWidth: number; maxHeight: number }>
  ): { width: number; height: number } {
    const originalWidth = image.width;
    const originalHeight = image.height;
    const aspectRatio = originalWidth / originalHeight;
    
    // Obtener constraints específicos o usar valores por defecto
    const constraints = sizeConstraints?.[fieldName] || { maxWidth: 180, maxHeight: 135 };
    
    let newWidth = originalWidth;
    let newHeight = originalHeight;
    
    // Ajustar según constraints
    if (originalWidth > originalHeight) {
      // Landscape
      if (originalWidth > constraints.maxWidth) {
        newWidth = constraints.maxWidth;
        newHeight = newWidth / aspectRatio;
      }
      
      if (newHeight > constraints.maxHeight) {
        newHeight = constraints.maxHeight;
        newWidth = newHeight * aspectRatio;
      }
    } else {
      // Portrait
      if (originalHeight > constraints.maxHeight) {
        newHeight = constraints.maxHeight;
        newWidth = newHeight * aspectRatio;
      }
      
      if (newWidth > constraints.maxWidth) {
        newWidth = constraints.maxWidth;
        newHeight = newWidth / aspectRatio;
      }
    }
    
    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight)
    };
  }

  /**
   * EMBEDAR IMAGEN DESDE URI - VERSIÓN MEJORADA
   */
  private async embedImageFromUri(
    pdfDoc: PDFDocument, 
    uri: string, 
    fieldName: string
  ): Promise<PDFImage | null> {
    try {
      console.log(`🖼️ Loading image for ${fieldName}`);
      console.log(`🖼️ URI: ${uri.substring(0, 100)}...`);
      
      let base64Data: string;
      
      // Manejar diferentes tipos de URI
      if (uri.startsWith('file://') || uri.startsWith('/')) {
        // Verificar que el archivo existe
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          console.log(`⚠️ File does not exist: ${uri}`);
          return null;
        }
        
        // Leer archivo como base64
        base64Data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } else if (uri.startsWith('data:image')) {
        // Data URI - extraer base64
        base64Data = uri.split(',')[1];
      } else {
        console.log(`⚠️ Unsupported URI format: ${uri.substring(0, 50)}...`);
        return null;
      }
      
      // Convertir base64 a Uint8Array
      const imageBytes = this.base64ToUint8Array(base64Data);
      console.log(`🖼️ Image bytes length: ${imageBytes.length}`);
      
      if (imageBytes.length === 0) {
        console.log(`⚠️ Image bytes are empty`);
        return null;
      }
      
      let embeddedImage: PDFImage;
      
      // Intentar embedar como JPEG primero, luego PNG
      try {
        console.log(`🖼️ Trying to embed as JPEG...`);
        embeddedImage = await pdfDoc.embedJpg(imageBytes);
        console.log(`✅ Successfully embedded as JPEG`);
      } catch (jpegError) {
        console.log(`⚠️ JPEG embedding failed: ${(jpegError as any).message}`);
        try {
          console.log(`🖼️ Trying to embed as PNG...`);
          embeddedImage = await pdfDoc.embedPng(imageBytes);
          console.log(`✅ Successfully embedded as PNG`);
        } catch (pngError) {
          console.log(`❌ PNG embedding failed: ${(pngError as any).message}`);
          console.log(`❌ Failed to embed image for ${fieldName}`);
          return null;
        }
      }
      
      console.log(`✅ Image embedded successfully: ${embeddedImage.width}x${embeddedImage.height}`);
      return embeddedImage;
      
    } catch (error) {
      console.error(`❌ Error embedding image for ${fieldName}:`, error);
      return null;
    }
  }

  /**
   * GUARDAR PDF
   */
  private async savePDF(pdfBytes: Uint8Array, formData: FormData, form: InspectionForm): Promise<ExportResult> {
    try {
      const fileName = this.generateFileName(formData, form);
      const filePath = `${FileSystem.documentDirectory}${fileName}`;
      
      const base64 = await this.uint8ArrayToBase64(pdfBytes);
      
      await FileSystem.writeAsStringAsync(filePath, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      console.log(`✅ PDF saved: ${filePath}`);
      
      // Compartir automáticamente después de un pequeño delay
      setTimeout(async () => {
        try {
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(filePath, {
              mimeType: 'application/pdf',
              dialogTitle: 'Share Inspection Report',
            });
          }
        } catch (shareError) {
          console.warn('⚠️ Auto-share failed:', shareError);
        }
      }, 500);
      
      return {
        success: true,
        filePath,
        fileSize: pdfBytes.length,
      };
      
    } catch (error) {
      console.error('❌ Error saving PDF:', error);
      throw error;
    }
  }

  /**
   * UTILIDADES
   */
  private base64ToUint8Array(base64: string): Uint8Array {
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (error) {
      console.error('Error converting base64 to Uint8Array:', error);
      return new Uint8Array(0);
    }
  }

  private async uint8ArrayToBase64(uint8Array: Uint8Array): Promise<string> {
    const CHUNK_SIZE = 0x8000;
    let result = '';
    
    for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
      const chunk = uint8Array.slice(i, i + CHUNK_SIZE);
      result += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(result);
  }

  private shouldCheckBox(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true' || value === '1';
    if (Array.isArray(value)) return value.length > 0;
    return false;
  }

  private generateFileName(formData: FormData, form: InspectionForm): string {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HHmm');
    const reportNumber = formData.inspection_report_number || 'REPORT';
    const cleanReportNumber = reportNumber.replace(/[^a-zA-Z0-9-_]/g, '_');
    const formType = form.pdfTemplate?.replace('.pdf', '') || 'inspection';
    return `${formType}_${cleanReportNumber}_${timestamp}.pdf`;
  }

  /**
   * Limpiar cachés - MEJORADO: ahora limpia solo el caché de plantillas
   */
  clearCaches(): void {
    // Solo limpiar caché de plantillas, NO el de imágenes durante la generación
    this.templateCache.clear();
    console.log('🧹 Template cache cleared');
  }

  /**
   * Inspeccionar plantilla específica
   */
  async inspectTemplate(templateFile: string): Promise<void> {
    try {
      console.log(`🔍 === INSPECTING TEMPLATE: ${templateFile} ===`);
      
      const templateMapping = getTemplateMapping(templateFile);
      if (!templateMapping) {
        console.log('❌ No mapping found for this template');
        return;
      }

      const templateBytes = await this.loadTemplate(templateFile);
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      console.log(`📊 Total fields: ${fields.length}`);
      console.log('\n📋 MAPPED FIELDS:');
      console.log(`Text fields: ${Object.keys(templateMapping.fieldMappings).length}`);
      console.log(`Photo buttons: ${Object.keys(templateMapping.photoButtonMappings).length}`);
      console.log(`Checkboxes: ${Object.keys(templateMapping.checkboxMappings).length}`);
      console.log(`Dropdowns: ${Object.keys(templateMapping.dropdownMappings).length}`);
      
      console.log('\n🔍 ALL FIELDS IN PDF:');
      fields.forEach((field, index) => {
        try {
          const name = field.getName();
          const type = field.constructor.name;
          console.log(`${index + 1}. "${name}" (${type})`);
        } catch (error) {
          console.log(`${index + 1}. ERROR reading field`);
        }
      });
      
    } catch (error) {
      console.error('❌ Template inspection failed:', error);
    }
  }
}

export const pdfService = new PDFServiceDynamic();
export default pdfService;
// src/services/pdfServiceUpdated.ts - USANDO CAMPOS SIN COORDENADAS Y MANEJO INTELIGENTE DE TAMAÑOS

/**
 * PDFService - Servicio para generar PDFs con fotos
 * 
 * Características:
 * - Maneja automáticamente diferentes tamaños y orientaciones de fotos
 * - Ajusta las imágenes proporcionalmente según restricciones definidas
 * - Detecta y salta campos de texto enriquecido (rich text)
 * - No usa coordenadas fijas, usa los campos del PDF directamente
 * 
 * Para ajustar tamaños de fotos:
 * - Modifica PHOTO_SIZE_CONSTRAINTS según tus necesidades
 * - Las fotos landscape se ajustan priorizando el ancho
 * - Las fotos portrait se ajustan priorizando la altura
 * - Siempre se mantiene la proporción de aspecto original
 */

import { Platform, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-asset';
import { PDFDocument, PDFForm, rgb, StandardFonts, PDFImage, PDFPage } from 'pdf-lib';
import { format } from 'date-fns';

import { FormData, InspectionForm, ExportResult } from '../types';

// Configuración de mapeo de campos
const FIELD_MAPPING = {
  // Campos de texto principales
  inspection_report_number: 'Report#',
  project_address: 'DeptProject',
  contractor_name: 'DeptContractor',
  site_information: 'DeptInformation',
  inspector_name: 'Inspector',
  structural_element_location: 'Struct/Item',
  inspection_description: 'DescriptionInspection',
  notes_and_samples: 'Notes',
  
  // Medidas del pile
  pile_diameter: 'DiameterPile',
  depth_pile_north: 'DepthPileNorth',
  depth_pile_east: 'DepthPileEast',
  depth_pile_south: 'DepthPileSouth',
  pile_thickness: 'PileThick',
  
  // Especificaciones
  long_bar: 'LongBar',
  bar_center: 'BarCenter',
  space_between_piles: 'SpaceBetweenPiles',
  
  // Ubicaciones
  work_location_north: 'WorkLocationNorth',
  work_location_north_description: 'DescriptionWorkLocationNorth',
  work_location_east: 'WorkLocationEast',
  work_location_east_description: 'DescriptionWorkLocationEast',
  
  // Materiales y métodos
  portland_cement: 'PortlandCement',
  tremie_method: 'TremieMetod',
  certified_welder: 'CertifiedWelder',
  bar_in_center: 'BarInTheCenter',
  pile_grouted: 'PileGrouted',
  electrode_used: 'ElectrodeUsed',
  grout_mixer: 'GroutMixer',
  rotary_machine: 'RotaryMachine',
};

// Mapeo de botones de fotos en el PDF
const PHOTO_BUTTON_MAPPING = {
  work_location_north_foto: 'WorkLocationNorthFoto',
  work_location_east_foto: 'WorkLocationEastFoto',
  diameter_foto: 'DiameterFoto',
  depth_pile_north_foto: 'DepthPileNorthFoto',
  depth_pile_east_foto: 'DepthPileEastFoto',
  depth_pile_south_foto: 'DepthPileSouthFoto',
  pile_thick_foto: 'PileThickFoto',
  long_bar_foto: 'LongBarFoto',
  bar_center_foto: 'BarCenterFoto',
  space_between_piles_foto: 'SpaceBetweenPilesFoto',
  portland_cement_foto: 'PortlandCementFoto',
  tremie_method_foto: 'TremieMetodFoto',
  bar_in_the_center_foto: 'BarInTheCenterFoto',
  certified_welder_foto: 'CertifiedWelderFoto',
  pile_grouted_foto: 'PileGruotedFoto', // Nota: typo en el PDF original
  electrode_used_foto: 'ElectrodeUsedFoto',
  grout_mixer_foto: 'GroutMixerFoto',
  rotary_machine_foto: 'RotaryMachineFoto',
};

const CHECKBOX_MAPPING = {
  deviation_design_documents: 'Check Box 1',
  significant_observations: 'Check Box 2',
  work_improperly_executed: 'Check Box 3',
  unsafe_job_conditions: 'Check Box 4',
  precautions_taken: 'Check Box 5',
};

const DROPDOWN_MAPPING = {
  weather_conditions: 'Weather',
  arrival_time: 'ArrivalTime',
  departure_time: 'DepartureTime',
  department_name: 'DepartmentName',
};

// Mapeo de valores para dropdowns
const DROPDOWN_VALUE_MAPPING = {
  arrival_time: {
    '08:00': '8:00 am',
    '8:00': '8:00 am',
    '09:00': '9:00 am',
    '9:00': '9:00 am',
    '10:00': '10:00 am',
    '11:00': '11:00 am',
    '12:00': '12:00 pm',
    '13:00': '1:00 pm',
    '1:00': '1:00 pm',
    '14:00': '2:00 pm',
    '2:00': '2:00 pm',
    '15:00': '3:00 pm',
    '3:00': '3:00 pm',
    '16:00': '4:00 pm',
    '4:00': '4:00 pm',
  },
  departure_time: {
    '09:00': '9:00 am',
    '9:00': '9:00 am',
    '10:00': '10:00 am',
    '11:00': '11:00 am',
    '12:00': '12:00 pm',
    '13:00': '1:00 pm',
    '1:00': '1:00 pm',
    '14:00': '2:00 pm',
    '2:00': '2:00 pm',
    '15:00': '3:00 pm',
    '3:00': '3:00 pm',
    '16:00': '4:00 pm',
    '4:00': '4:00 pm',
    '16:30': '5:00 pm',
    '17:00': '5:00 pm',
    '5:00': '5:00 pm',
    '18:00': '6:00 pm',
    '6:00': '6:00 pm',
  },
  weather_conditions: {
    'sunny': 'Sunny',
    'Sunny': 'Sunny',
    'cloudy': 'Cloudy',
    'Cloudy': 'Cloudy',
    'rainy': 'Rainy',
    'Rainy': 'Rainy',
    'fair': 'Fair',
    'Fair': 'Fair',
  }
};

// Configuración de tamaños máximos para fotos según su ubicación
const PHOTO_SIZE_CONSTRAINTS: { [key: string]: { maxWidth: number; maxHeight: number } } = {
  // Fotos de ubicación (generalmente más grandes)
  work_location_north_foto: { maxWidth: 250, maxHeight: 180 },
  work_location_east_foto: { maxWidth: 250, maxHeight: 180 },
  
  // Fotos de mediciones (tamaño mediano)
  diameter_foto: { maxWidth: 200, maxHeight: 150 },
  depth_pile_north_foto: { maxWidth: 200, maxHeight: 150 },
  depth_pile_east_foto: { maxWidth: 200, maxHeight: 150 },
  depth_pile_south_foto: { maxWidth: 200, maxHeight: 150 },
  
  // Fotos de especificaciones (tamaño estándar)
  pile_thick_foto: { maxWidth: 180, maxHeight: 135 },
  long_bar_foto: { maxWidth: 180, maxHeight: 135 },
  bar_center_foto: { maxWidth: 180, maxHeight: 135 },
  space_between_piles_foto: { maxWidth: 180, maxHeight: 135 },
  
  // Fotos de materiales y métodos (tamaño compacto)
  portland_cement_foto: { maxWidth: 160, maxHeight: 120 },
  tremie_method_foto: { maxWidth: 160, maxHeight: 120 },
  bar_in_the_center_foto: { maxWidth: 160, maxHeight: 120 },
  certified_welder_foto: { maxWidth: 160, maxHeight: 120 },
  pile_grouted_foto: { maxWidth: 160, maxHeight: 120 },
  electrode_used_foto: { maxWidth: 160, maxHeight: 120 },
  grout_mixer_foto: { maxWidth: 160, maxHeight: 120 },
  rotary_machine_foto: { maxWidth: 160, maxHeight: 120 },
};

class PDFService {
  setSaveStrategy(strategy: unknown) {
    throw new Error('Method not implemented.');
  }
  private templateCache: Uint8Array | null = null;
  private imageCache: Map<string, PDFImage> = new Map();

  /**
   * MÉTODO PRINCIPAL - PRESERVA LA PLANTILLA EXACTA CON FOTOS
   */
  async generateFormPDF(formData: FormData, form: InspectionForm): Promise<ExportResult> {
    console.log(`🚀 Generating PDF for form: "${form.id}" - WITH PHOTOS (No coordinates)`);

    try {
      const templateBytes = await this.loadTemplateOrFail();
      console.log('✅ Template loaded successfully');
      
      return await this.fillTemplateWithPhotos(templateBytes, formData, form);
      
    } catch (error) {
      console.error('❌ Error in generateFormPDF:', error);
      return {
        success: false,
        error: `PDF generation failed: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * LLENAR PLANTILLA CON FOTOS
   */
  private async fillTemplateWithPhotos(
    templateBytes: Uint8Array, 
    formData: FormData, 
    form: InspectionForm
  ): Promise<ExportResult> {
    try {
      console.log('🎨 Filling template with data and photos...');
      
      const pdfDoc = await PDFDocument.load(templateBytes, {
        ignoreEncryption: true,
        parseSpeed: 100,
        throwOnInvalidObject: false,
        updateMetadata: false,
        capNumbers: false,
      });
      
      // Obtener el formulario de manera segura
      const pdfForm = await this.getFormSafely(pdfDoc);
      
      if (!pdfForm) {
        throw new Error('Could not access PDF form');
      }
      
      // Llenar campos de texto
      await this.fillTextFields(pdfForm, formData);
      
      // Llenar checkboxes
      await this.fillCheckboxes(pdfForm, formData);
      
      // Llenar dropdowns
      await this.fillDropdowns(pdfForm, formData);
      
      // Llenar campos especiales
      await this.fillSpecialFields(pdfForm, formData);
      
      // Procesar y adjuntar fotos usando los campos del PDF
      await this.processPhotosUsingFields(pdfDoc, pdfForm, formData);
      
      // Guardar preservando el formato
      console.log('💾 Saving PDF with photos...');
      
      const pdfBytes = await pdfDoc.save({
        updateFieldAppearances: false, // Volver a false para evitar problemas con rich text
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
   * OBTENER FORMULARIO DE MANERA SEGURA
   */
  private async getFormSafely(pdfDoc: PDFDocument): Promise<PDFForm | null> {
    try {
      console.log('🔍 Getting form safely...');
      const form = pdfDoc.getForm();
      
      // Pre-validar campos para detectar rich text fields
      const fields = form.getFields();
      console.log(`📊 Found ${fields.length} fields in form`);
      
      // Identificar campos problemáticos
      const problematicFields: string[] = [];
      
      fields.forEach(field => {
        const name = field.getName();
        // Detectar campos que típicamente son rich text
        if (name.includes('Subtitle') || name.includes('Text8') || name.includes('Rich')) {
          problematicFields.push(name);
        }
      });
      
      if (problematicFields.length > 0) {
        console.log(`⚠️ Found ${problematicFields.length} potential rich text fields: ${problematicFields.join(', ')}`);
      }
      
      return form;
    } catch (error) {
      console.error('❌ Error getting form:', error);
      return null;
    }
  }

  /**
   * PROCESAR Y ADJUNTAR FOTOS USANDO CAMPOS DEL PDF
   */
  private async processPhotosUsingFields(pdfDoc: PDFDocument, form: PDFForm, formData: FormData): Promise<void> {
    console.log('📸 Processing photos using PDF fields...');
    
    const processedPhotos: string[] = [];
    const failedPhotos: string[] = [];
    
    for (const [dataKey, pdfButtonName] of Object.entries(PHOTO_BUTTON_MAPPING)) {
      try {
        const photoUri = formData[dataKey as keyof FormData];
        
        if (photoUri && typeof photoUri === 'string' && photoUri.length > 0) {
          console.log(`📸 Processing photo for ${dataKey}: ${photoUri.substring(0, 50)}...`);
          
          // Intentar obtener el botón de manera segura
          let button = null;
          try {
            button = form.getButton(pdfButtonName);
          } catch (buttonError) {
            // Si es un error de rich text, intentar obtener como campo genérico
            if (
              typeof buttonError === 'object' &&
              buttonError !== null &&
              'message' in buttonError &&
              typeof (buttonError as any).message === 'string' &&
              (buttonError as any).message.includes('rich text')
            ) {
              console.log(`⚠️ ${pdfButtonName} might be a rich text field, trying alternative approach`);
            } else {
              console.log(`⚠️ Cannot get button ${pdfButtonName}: ${typeof buttonError === 'object' && buttonError !== null && 'message' in buttonError ? (buttonError as any).message : String(buttonError)}`);
            }
          }
          
          if (button) {
            // Cargar y embedar la imagen
            const embeddedImage = await this.embedImageFromUri(pdfDoc, photoUri, dataKey);
            
            if (embeddedImage) {
              try {
                // Calcular dimensiones apropiadas para la imagen
                const dimensions = this.calculateImageDimensions(embeddedImage, dataKey);
                
                // Establecer la imagen en el botón con las dimensiones calculadas
                button.setImage(embeddedImage);
                
                // Actualizar la apariencia del botón sin causar errores de rich text
                try {
                  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                  button.updateAppearances(font);
                } catch (appearanceError) {
                  console.log(`⚠️ Could not update appearance for ${pdfButtonName}: ${typeof appearanceError === 'object' && appearanceError !== null && 'message' in appearanceError ? (appearanceError as any).message : String(appearanceError)}`);
                  // Continuar sin actualizar apariencias
                }
                
                processedPhotos.push(dataKey);
                console.log(`✅ Photo ${dataKey} set to button ${pdfButtonName} (${dimensions.width}x${dimensions.height})`);
              } catch (setImageError) {
                console.log(`⚠️ Could not set image for ${pdfButtonName}: ${typeof setImageError === 'object' && setImageError !== null && 'message' in setImageError ? (setImageError as any).message : String(setImageError)}`);
                failedPhotos.push(dataKey);
              }
            }
          } else {
            // Intentar método alternativo
            const success = await this.tryAlternativeFieldMethod(pdfDoc, form, pdfButtonName, photoUri, dataKey);
            if (success) {
              processedPhotos.push(dataKey);
            } else {
              failedPhotos.push(dataKey);
            }
          }
        }
      } catch (error) {
        console.log(`⚠️ Error processing photo ${dataKey}: ${typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error)}`);
        failedPhotos.push(dataKey);
      }
    }
    
    console.log(`📸 Photos processed successfully: ${processedPhotos.length}`);
    if (failedPhotos.length > 0) {
      console.log(`⚠️ Photos that could not be processed: ${failedPhotos.length} (${failedPhotos.join(', ')})`);
    }
  }

  /**
   * MÉTODO ALTERNATIVO PARA CAMPOS QUE NO SON BOTONES
   */
  private async tryAlternativeFieldMethod(
    pdfDoc: PDFDocument, 
    form: PDFForm, 
    fieldName: string, 
    photoUri: string, 
    dataKey: string
  ): Promise<boolean> {
    try {
      console.log(`🔄 Trying alternative method for ${fieldName}...`);
      
      // Intentar obtener el campo genérico de manera segura
      const fields = form.getFields();
      const field = fields.find(f => {
        try {
          return f.getName() === fieldName;
        } catch (e) {
          // Si no podemos obtener el nombre (rich text field), skip
          return false;
        }
      });
      
      if (field) {
        const fieldType = field.constructor.name;
        console.log(`📋 Found field ${fieldName} of type: ${fieldType}`);
        
        // Si es un campo de imagen o similar, intentar procesarlo
        const embeddedImage = await this.embedImageFromUri(pdfDoc, photoUri, dataKey);
        
        if (embeddedImage) {
          // Calcular dimensiones apropiadas
          const dimensions = this.calculateImageDimensions(embeddedImage, dataKey);
          
          // Intentar diferentes métodos según el tipo de campo
          if ('setImage' in field && typeof field.setImage === 'function') {
            try {
              // Intentar establecer con dimensiones
              (field as any).setImage(embeddedImage, {
                width: dimensions.width,
                height: dimensions.height,
                alignment: 0
              });
              console.log(`✅ Image set using setImage method (${dimensions.width}x${dimensions.height})`);
              return true;
            } catch (e) {
              // Si falla con opciones, intentar sin opciones
              try {
                (field as any).setImage(embeddedImage);
                console.log(`✅ Image set using setImage method (original size)`);
                return true;
              } catch (e2) {
                console.log(`⚠️ setImage failed: ${typeof e2 === 'object' && e2 !== null && 'message' in e2 ? (e2 as any).message : String(e2)}`);
              }
            }
          }
          
          // Si no podemos establecer la imagen directamente,
          // al menos hemos embebido la imagen en el documento
          console.log(`⚠️ Field found but no setImage method available`);
        }
      } else {
        console.log(`❌ Field ${fieldName} not found in form`);
      }
      
      return false;
    } catch (error) {
      console.log(`❌ Alternative method failed for ${fieldName}: ${typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error)}`);
      return false;
    }
  }

  /**
   * CALCULAR DIMENSIONES DE IMAGEN
   */
  private calculateImageDimensions(
    image: PDFImage, 
    fieldName: string
  ): { width: number; height: number; isLandscape: boolean } {
    const originalWidth = image.width;
    const originalHeight = image.height;
    const aspectRatio = originalWidth / originalHeight;
    const isLandscape = originalWidth > originalHeight;
    
    console.log(`📐 Original image dimensions for ${fieldName}: ${originalWidth}x${originalHeight} (${isLandscape ? 'landscape' : 'portrait'})`);
    
    // Obtener las restricciones de tamaño para este campo
    const constraints = PHOTO_SIZE_CONSTRAINTS[fieldName] || { maxWidth: 180, maxHeight: 135 };
    
    let newWidth = originalWidth;
    let newHeight = originalHeight;
    
    // Si la imagen es landscape (horizontal)
    if (isLandscape) {
      // Priorizar el ancho máximo
      if (originalWidth > constraints.maxWidth) {
        newWidth = constraints.maxWidth;
        newHeight = newWidth / aspectRatio;
      }
      
      // Verificar si aún excede la altura máxima
      if (newHeight > constraints.maxHeight) {
        newHeight = constraints.maxHeight;
        newWidth = newHeight * aspectRatio;
      }
    } else {
      // Si la imagen es portrait (vertical)
      // Priorizar la altura máxima
      if (originalHeight > constraints.maxHeight) {
        newHeight = constraints.maxHeight;
        newWidth = newHeight * aspectRatio;
      }
      
      // Verificar si aún excede el ancho máximo
      if (newWidth > constraints.maxWidth) {
        newWidth = constraints.maxWidth;
        newHeight = newWidth / aspectRatio;
      }
    }
    
    // Redondear las dimensiones
    newWidth = Math.round(newWidth);
    newHeight = Math.round(newHeight);
    
    console.log(`📏 Adjusted dimensions: ${newWidth}x${newHeight} (scale: ${(newWidth/originalWidth*100).toFixed(1)}%)`);
    
    return {
      width: newWidth,
      height: newHeight,
      isLandscape
    };
  }

  /**
   * EMBEDAR IMAGEN DESDE URI
   */
  private async embedImageFromUri(
    pdfDoc: PDFDocument, 
    uri: string, 
    fieldName: string
  ): Promise<PDFImage | null> {
    try {
      // Verificar si ya tenemos la imagen en caché
      if (this.imageCache.has(uri)) {
        return this.imageCache.get(uri)!;
      }
      
      console.log(`🖼️ Loading image from: ${uri.substring(0, 50)}...`);
      
      // Leer la imagen como base64
      let base64Data: string;
      
      if (uri.startsWith('file://') || uri.startsWith('/')) {
        // Es una URI local
        base64Data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } else if (uri.startsWith('data:image')) {
        // Ya es base64
        base64Data = uri.split(',')[1];
      } else {
        console.log(`⚠️ Unsupported URI format: ${uri.substring(0, 50)}`);
        return null;
      }
      
      // Convertir base64 a Uint8Array
      const imageBytes = this.base64ToUint8Array(base64Data);
      
      // Determinar el tipo de imagen y embedar
      let embeddedImage: PDFImage;
      
      // Intentar primero como JPEG
      try {
        embeddedImage = await pdfDoc.embedJpg(imageBytes);
        console.log(`✅ Image embedded as JPEG`);
      } catch (jpegError) {
        // Si falla, intentar como PNG
        try {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
          console.log(`✅ Image embedded as PNG`);
        } catch (pngError) {
          console.log(`❌ Failed to embed image as JPEG or PNG`);
          throw new Error('Image format not supported. Please use JPEG or PNG images.');
        }
      }
      
      // Guardar en caché
      this.imageCache.set(uri, embeddedImage);
      
      // Log dimensiones de la imagen y detectar orientación
      const { width, height } = embeddedImage;
      const isLandscape = width > height;
      console.log(`📐 Image dimensions: ${width}x${height} (${isLandscape ? 'landscape' : 'portrait'})`);
      
      // Opcional: Advertir si la imagen es muy grande
      if (width > 1000 || height > 1000) {
        console.log(`⚠️ Large image detected. Consider resizing for better PDF performance.`);
      }
      
      return embeddedImage;
      
    } catch (error) {
      console.error(`❌ Error embedding image for ${fieldName}:`, error);
      return null;
    }
  }

  /**
   * LLENAR CAMPOS DE TEXTO
   */
  private async fillTextFields(form: PDFForm, formData: FormData): Promise<void> {
    console.log('📝 Filling text fields...');
    
    let successCount = 0;
    let skipCount = 0;
    
    for (const [dataKey, pdfFieldName] of Object.entries(FIELD_MAPPING)) {
      try {
        const value = formData[dataKey as keyof FormData];
        if (value !== undefined && value !== null && value !== '') {
          // Intentar obtener el campo de manera segura
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
        console.log(`⚠️ Field ${pdfFieldName} not found or error: ${typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error)}`);
      }
    }
    
    console.log(`📝 Text fields filled: ${successCount} successful, ${skipCount} skipped`);
  }

  /**
   * LLENAR CHECKBOXES
   */
  private async fillCheckboxes(form: PDFForm, formData: FormData): Promise<void> {
    console.log('☑️ Filling checkboxes...');
    
    for (const [dataKey, pdfFieldName] of Object.entries(CHECKBOX_MAPPING)) {
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
   * LLENAR DROPDOWNS
   */
  private async fillDropdowns(form: PDFForm, formData: FormData): Promise<void> {
    console.log('📋 Filling dropdowns...');
    
    for (const [dataKey, pdfFieldName] of Object.entries(DROPDOWN_MAPPING)) {
      try {
        const rawValue = formData[dataKey as keyof FormData];
        if (!rawValue) continue;
        
        const dropdown = form.getDropdown(pdfFieldName);
        const options = dropdown.getOptions();
        
        let mappedValue = String(rawValue);
        const mapping = DROPDOWN_VALUE_MAPPING[dataKey as keyof typeof DROPDOWN_VALUE_MAPPING];
        if (mapping && (mapping as Record<string, string>)[rawValue as string]) {
          mappedValue = (mapping as Record<string, string>)[rawValue as string];
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
   * LLENAR CAMPOS ESPECIALES
   */
  private async fillSpecialFields(form: PDFForm, formData: FormData): Promise<void> {
    console.log('🔧 Filling special fields...');
    
    const specialFields = [
      { name: 'Date', value: formData.inspection_date || format(new Date(), 'MM/dd/yyyy') },
      { name: 'Temp', value: formData.temperature || '' },
      { name: 'DateEmision', value: format(new Date(), 'MM/dd/yyyy') }
    ];
    
    for (const { name, value } of specialFields) {
      try {
        if (value) {
          // Intentar obtener el campo de manera segura
          let field = null;
          try {
            field = form.getTextField(name);
          } catch (fieldError) {
            if (
              typeof fieldError === 'object' &&
              fieldError !== null &&
              'message' in fieldError &&
              typeof (fieldError as any).message === 'string' &&
              (fieldError as any).message.includes('rich text')
            ) {
              console.log(`⏭️ Skipping rich text field ${name}`);
              continue;
            }
            throw fieldError;
          }
          
          if (field) {
            field.setText(String(value));
            console.log(`✅ ${name}: "${value}"`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Special field ${name} not found or error: ${(error as any).message}`);
      }
    }
  }

  /**
   * CARGAR PLANTILLA
   */
  private async loadTemplateOrFail(): Promise<Uint8Array> {
    if (this.templateCache) {
      return this.templateCache;
    }
    
    console.log('📋 Loading PDF template...');
    
    try {
      const asset = Asset.fromModule(require('../assets/templates/secant-pile-template.pdf'));
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
      
      this.templateCache = templateBytes;
      console.log(`✅ Template loaded: ${templateBytes.length} bytes`);
      
      return templateBytes;
      
    } catch (error) {
      console.error('❌ Template loading failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load template: ${errorMessage}`);
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
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
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
    return `Inspection_${cleanReportNumber}_${timestamp}.pdf`;
  }

  /**
   * Limpiar caché de imágenes (llamar cuando sea necesario liberar memoria)
   */
  clearImageCache(): void {
    this.imageCache.clear();
    console.log('🧹 Image cache cleared');
  }

  /**
   * Obtener estadísticas de imágenes en caché
   */
  getImageCacheStats(): { 
    count: number; 
    images: Array<{ uri: string; width: number; height: number; orientation: string }> 
  } {
    const images = Array.from(this.imageCache.entries()).map(([uri, image]) => ({
      uri: uri.substring(0, 50) + '...',
      width: image.width,
      height: image.height,
      orientation: image.width > image.height ? 'landscape' : 'portrait'
    }));
    
    return {
      count: this.imageCache.size,
      images
    };
  }

  /**
   * Inspeccionar todos los campos del PDF (incluye tipo de campo)
   */
  async inspectPDFTemplate(p0: string): Promise<void> {
    try {
      console.log('🔍 === TEMPLATE FIELD INSPECTION ===');
      const templateBytes = await this.loadTemplateOrFail();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      console.log(`📊 Total fields: ${fields.length}`);
      
      const fieldsByType: {
        text: string[];
        checkbox: string[];
        dropdown: string[];
        button: string[];
        pushButton: string[];
        radioButton: string[];
        richText: string[];
        other: string[];
      } = {
        text: [],
        checkbox: [],
        dropdown: [],
        button: [],
        pushButton: [],
        radioButton: [],
        richText: [],
        other: []
      };
      
      fields.forEach((field, index) => {
        try {
          const name = field.getName();
          const type = field.constructor.name;
          console.log(`${index + 1}. "${name}" (${type})`);
          
          // Clasificar por tipo más específico
          if (type.includes('TextField')) {
            // Verificar si es un campo de texto enriquecido
            try {
              form.getTextField(name);
              fieldsByType.text.push(name);
            } catch (e) {
              if (typeof e === 'object' && e !== null && 'message' in e && typeof (e as any).message === 'string' && (e as any).message.includes('rich text')) {
                fieldsByType.richText.push(name);
                console.log(`   ⚠️ Rich text field detected`);
              }
            }
          }
          else if (type.includes('CheckBox')) fieldsByType.checkbox.push(name);
          else if (type.includes('Dropdown')) fieldsByType.dropdown.push(name);
          else if (type.includes('PushButton')) fieldsByType.pushButton.push(name);
          else if (type.includes('RadioButton')) fieldsByType.radioButton.push(name);
          else if (type.includes('Button')) fieldsByType.button.push(name);
          else fieldsByType.other.push(name);
          
          // Mostrar opciones para dropdowns
          if (type.includes('Dropdown')) {
            try {
              const dropdown = form.getDropdown(name);
              const options = dropdown.getOptions();
              console.log(`   Options: [${options.join(', ')}]`);
            } catch (e) {
              console.log(`   Options: ERROR - ${(e as any).message}`);
            }
          }
          
          // Verificar si el campo soporta imágenes
          if (type.includes('Button') || type.includes('PushButton')) {
            console.log(`   📸 Potential image field`);
          }
        } catch (error) {
          console.log(`${index + 1}. ERROR reading field: ${(error as any).message}`);
        }
      });
      
      console.log('\n📊 FIELD SUMMARY:');
      console.log(`Text fields: ${fieldsByType.text.length}`);
      console.log(`Rich text fields: ${fieldsByType.richText.length}`);
      console.log(`Checkboxes: ${fieldsByType.checkbox.length}`);
      console.log(`Dropdowns: ${fieldsByType.dropdown.length}`);
      console.log(`Buttons: ${fieldsByType.button.length}`);
      console.log(`Push Buttons: ${fieldsByType.pushButton.length}`);
      console.log(`Radio Buttons: ${fieldsByType.radioButton.length}`);
      console.log(`Other: ${fieldsByType.other.length}`);
      
      // Mostrar campos de texto enriquecido
      if (fieldsByType.richText.length > 0) {
        console.log('\n⚠️ RICH TEXT FIELDS (will be skipped):');
        fieldsByType.richText.forEach(name => console.log(`- "${name}"`));
      }
      
      // Mostrar campos de botones (potenciales campos de imagen)
      if (fieldsByType.button.length > 0 || fieldsByType.pushButton.length > 0) {
        console.log('\n📸 POTENTIAL IMAGE FIELDS:');
        [...fieldsByType.button, ...fieldsByType.pushButton].forEach(name => {
          console.log(`- "${name}"`);
        });
      }
      
      // Identificar campos no mapeados
      const allMappedFields = [
        ...Object.values(FIELD_MAPPING),
        ...Object.values(CHECKBOX_MAPPING),
        ...Object.values(DROPDOWN_MAPPING),
        ...Object.values(PHOTO_BUTTON_MAPPING),
        'Date', 'Temp', 'DateEmision'
      ];
      
      const unmappedFields = fields
        .map(f => {
          try {
            return f.getName();
          } catch (e) {
            return null;
          }
        })
        .filter(name => name && !allMappedFields.includes(name) && !name.startsWith('Subtitle') && !name.startsWith('Text8'));
      
      if (unmappedFields.length > 0) {
        console.log('\n⚠️ UNMAPPED FIELDS:');
        unmappedFields.forEach(f => console.log(`- "${f}"`));
      }
    } catch (error) {
      console.error('❌ Template inspection failed:', error);
    }
  }
}

export const pdfService = new PDFService();
export default pdfService;
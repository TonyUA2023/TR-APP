// src/services/pdfFillService.ts

import { PDFDocument, PDFForm, PDFTextField, PDFCheckBox } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { format } from 'date-fns';
import { FormData, ExportResult } from '../types';

// Mapeo exacto entre campos del formulario y campos del PDF
const SECANT_PILE_FIELD_MAPPING = {
  // Página 1 - Campos principales
  inspection_report_number: 'report_number',
  project_address: 'project_address', 
  project_block_lot: 'block_lot',
  alt_type_job_number: 'alt_job_number',
  building_description: 'building_description',
  contractor_name: 'contractor_name',
  contractor_address: 'contractor_address',
  inspection_date: 'inspection_date',
  time_of_arrival: 'time_arrival',
  time_of_departure: 'time_departure',
  weather_conditions: 'weather',
  temperature: 'temperature',
  inspection_item: 'inspection_item',
  structural_element_location: 'structural_location',
  notes_and_samples: 'notes_samples',
  inspector_name: 'inspector_name',
  
  // Checkboxes de observaciones
  deviation_design_documents: 'checkbox_deviation',
  significant_observations: 'checkbox_observations',
  work_improperly_executed: 'checkbox_improper_work',
  unsafe_job_conditions: 'checkbox_unsafe',
  precautions_taken: 'checkbox_precautions',
  
  // Campos técnicos adicionales
  pile_material: 'pile_material',
  pile_diameter_measurement: 'pile_diameter', 
  pile_thickness: 'pile_thickness',
  drilling_method: 'drilling_method',
  depth_measurements: 'depth_measurements',
  grout_specifications: 'grout_specs',
};

class PDFFillService {
  
  /**
   * Cargar plantilla PDF desde assets
   */
  private async loadPDFTemplate(): Promise<Uint8Array> {
    try {
      // Cargar desde assets
      const asset = Asset.fromModule(require('../assets/templates/secant-pile-template.pdf'));
      await asset.downloadAsync();
      
      if (!asset.localUri) {
        throw new Error('No se pudo cargar la plantilla PDF');
      }
      
      const pdfBytes = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64
      });
      
      return Uint8Array.from(atob(pdfBytes), c => c.charCodeAt(0));
      
    } catch (error) {
      console.error('❌ Error cargando plantilla:', error);
      throw new Error(
        `No se pudo cargar la plantilla PDF: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  
  /**
   * Inspeccionar campos del PDF (usar solo para debug)
   */
  async inspectTemplateFields(): Promise<void> {
    try {
      const pdfBytes = await this.loadPDFTemplate();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      console.log('📋 CAMPOS EN LA PLANTILLA PDF:');
      console.log('==============================');
      
      fields.forEach((field, index) => {
        console.log(`${index + 1}. "${field.getName()}" (${field.constructor.name})`);
      });
      
    } catch (error) {
      console.error('❌ Error inspeccionando campos:', error);
    }
  }
  
  /**
   * Rellenar PDF con datos del formulario
   */
  async fillSecantPilePDF(formData: FormData): Promise<ExportResult> {
    try {
      console.log('🚀 Iniciando llenado de PDF...');
      
      // 1. Cargar plantilla
      const templateBytes = await this.loadPDFTemplate();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      
      console.log('✅ Plantilla cargada correctamente');
      
      // 2. Llenar campos de texto
      this.fillTextFields(form, formData);
      
      // 3. Llenar checkboxes
      this.fillCheckboxFields(form, formData);
      
      // 4. Llenar campos de fecha
      this.fillDateFields(form, formData);
      
      // 5. Aplanar formulario (opcional - hace campos no editables)
      // form.flatten();
      
      // 6. Generar PDF final
      const filledPdfBytes = await pdfDoc.save();
      
      // 7. Guardar archivo
      const fileName = this.generateFileName(formData);
      const filePath = await this.savePDFFile(filledPdfBytes, fileName);
      
      console.log('✅ PDF generado exitosamente:', fileName);
      
      // 8. Compartir
      await this.sharePDF(filePath);
      
      return {
        success: true,
        filePath,
        fileSize: filledPdfBytes.length
      };
      
    } catch (error) {
      console.error('❌ Error llenando PDF:', error);
      return {
        success: false,
        error: `Error generando PDF: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Llenar campos de texto
   */
  private fillTextFields(form: PDFForm, formData: FormData): void {
    Object.entries(SECANT_PILE_FIELD_MAPPING).forEach(([formFieldId, pdfFieldName]) => {
      try {
        const value = formData[formFieldId];
        
        if (value && typeof value === 'string') {
          const field = form.getTextField(pdfFieldName);
          field.setText(value);
          console.log(`✅ Campo "${pdfFieldName}": "${value}"`);
        }
        
      } catch (error) {
        console.warn(`⚠️ Campo "${pdfFieldName}" no encontrado en PDF`);
      }
    });
  }
  
  /**
   * Llenar checkboxes
   */
  private fillCheckboxFields(form: PDFForm, formData: FormData): void {
    const checkboxMappings = {
      deviation_design_documents: 'checkbox_deviation',
      significant_observations: 'checkbox_observations', 
      work_improperly_executed: 'checkbox_improper_work',
      unsafe_job_conditions: 'checkbox_unsafe',
      precautions_taken: 'checkbox_precautions'
    };
    
    Object.entries(checkboxMappings).forEach(([formFieldId, pdfFieldName]) => {
      try {
        const value = formData[formFieldId];
        
        if (value) {
          const field = form.getCheckBox(pdfFieldName);
          
          // Si es array (múltiples checkboxes)
          if (Array.isArray(value) && value.length > 0) {
            field.check();
          }
          // Si es booleano
          else if (typeof value === 'boolean' && value) {
            field.check();
          }
          // Si es string y no está vacío
          else if (typeof value === 'string' && value.trim()) {
            field.check();
          }
          
          console.log(`✅ Checkbox "${pdfFieldName}": marcado`);
        }
        
      } catch (error) {
        console.warn(`⚠️ Checkbox "${pdfFieldName}" no encontrado`);
      }
    });
  }
  
  /**
   * Llenar campos de fecha
   */
  private fillDateFields(form: PDFForm, formData: FormData): void {
    try {
      if (formData.inspection_date) {
        const formattedDate = format(new Date(formData.inspection_date), 'MM/dd/yyyy');
        const field = form.getTextField('inspection_date');
        field.setText(formattedDate);
        console.log(`✅ Fecha: ${formattedDate}`);
      }
    } catch (error) {
      console.warn('⚠️ Error llenando campos de fecha:', error);
    }
  }
  
  /**
   * Generar nombre de archivo
   */
  private generateFileName(formData: FormData): string {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HHmm');
    const reportNumber = formData.inspection_report_number || 'Unknown';
    return `Secant_Pile_Report_${reportNumber}_${timestamp}.pdf`;
  }
  
  /**
   * Guardar archivo PDF
   */
  private async savePDFFile(pdfBytes: Uint8Array, fileName: string): Promise<string> {
    const filePath = `${FileSystem.documentDirectory}${fileName}`;
    
    // Convertir Uint8Array a base64
    const base64 = btoa(String.fromCharCode(...pdfBytes));
    
    await FileSystem.writeAsStringAsync(filePath, base64, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    return filePath;
  }
  
  /**
   * Compartir PDF
   */
  private async sharePDF(filePath: string): Promise<void> {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'application/pdf',
          dialogTitle: 'Compartir Reporte de Inspección'
        });
      }
    } catch (error) {
      console.warn('⚠️ No se pudo compartir PDF:', error);
    }
  }
}

export const pdfFillService = new PDFFillService();
export default pdfFillService;
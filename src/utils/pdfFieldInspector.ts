// src/utils/pdfFieldInspector.ts

import { PDFDocument } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';

export const inspectPDFFields = async (pdfPath: string) => {
  try {
    const pdfBytes = await FileSystem.readAsStringAsync(pdfPath, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    console.log('📋 CAMPOS ENCONTRADOS EN EL PDF:');
    console.log('================================');
    
    fields.forEach((field, index) => {
      const name = field.getName();
      const type = field.constructor.name;
      
      console.log(`${index + 1}. ${name} (${type})`);
      
      // Si es un campo de texto, mostrar valor por defecto
      if (type === 'PDFTextField') {
        const textField = field as any;
        console.log(`   Valor actual: "${textField.getText() || '(vacío)'}"`);
      }
      
      // Si es checkbox
      if (type === 'PDFCheckBox') {
        const checkbox = field as any;
        console.log(`   Marcado: ${checkbox.isChecked()}`);
      }
    });
    
    return fields.map(field => ({
      name: field.getName(),
      type: field.constructor.name
    }));
    
  } catch (error) {
    console.error('❌ Error inspeccionando PDF:', error);
    return [];
  }
};
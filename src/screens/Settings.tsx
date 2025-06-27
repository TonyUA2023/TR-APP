// src/screens/Settings.tsx - COMPLETO CON ELEVATOR PIT

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../constants';
import { pileInspectionByPagesForm } from '../data/forms/structures/pileInspectionByPagesForm';
import { pdfService } from '../services/pdfService';
import { format } from 'date-fns';
import { RootStackParamList } from '../types';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { getTemplateMapping } from '../services/pdf/templateMappings';
import { getFormById } from '../data/forms';

// Importar los PDFs directamente
import SecantPilePDF from '../assets/templates/secant-pile-template.pdf';
import UnderpinningPDF from '../assets/templates/3UNDERPINNING.pdf';
// NOTA: Deberás agregar esta línea cuando tengas el archivo PDF
import ElevatorPitPDF from '../assets/templates/9GRADE_BEAM.pdf';
import FoundationWall from '../assets/templates/8FOUNDATION_WALL.pdf';
type NavigationProp = StackNavigationProp<RootStackParamList>;

interface ExtractedField {
  name: string;
  type: string;
  mappedTo?: string;
  options?: string[];
}

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showFieldsModal, setShowFieldsModal] = useState(false);
  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string>('');

  /**
   * FUNCIÓN PRINCIPAL: EXTRAER TODOS LOS CAMPOS DE LA PLANTILLA SECANT-PILE
   */
  const handleExtractAllTemplateFields = async () => {
    setIsLoading(true);
    setCurrentTemplate('secant-pile-template.pdf');
    try {
      console.log('🔍 === EXTRACTING ALL TEMPLATE FIELDS FROM SECANT-PILE ===');
      
      const svc: any = pdfService;
      const templateBytes = await svc.loadTemplateOrFail();
      
      if (!templateBytes) {
        Alert.alert('❌ Error', 'No se pudo cargar la plantilla PDF');
        return;
      }

      const extractedData = await extractFieldsFromPDF(templateBytes, 'secant-pile');
      setExtractedFields(extractedData);
      setShowFieldsModal(true);

      console.log('\n✅ Template field extraction complete');
      
    } catch (error: any) {
      console.error('❌ Field extraction failed:', error);
      Alert.alert('❌ Error', `Field extraction failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * FUNCIÓN: EXTRAER CAMPOS DE 3UNDERPINNING.PDF
   */
  const handleExtract3UnderpinningFields = async () => {
    setIsLoading(true);
    setCurrentTemplate('3UNDERPINNING.pdf');
    try {
      console.log('🔍 === EXTRACTING ALL FIELDS FROM 3UNDERPINNING.PDF ===');
      
      const asset = Asset.fromModule(UnderpinningPDF);
      
      console.log('📄 Asset info:', {
        name: asset.name,
        type: asset.type,
        uri: asset.uri,
        localUri: asset.localUri,
        downloaded: asset.downloaded,
      });
      
      await asset.downloadAsync();
      
      console.log('📄 Asset after download:', {
        localUri: asset.localUri,
        downloaded: asset.downloaded,
      });
      
      if (!asset.localUri) {
        throw new Error('Failed to download 3UNDERPINNING.pdf - no localUri available');
      }
      
      const fileInfo = await FileSystem.getInfoAsync(asset.localUri);
      console.log('📄 File info:', fileInfo);
      
      if (!fileInfo.exists) {
        throw new Error('3UNDERPINNING.pdf file does not exist at localUri');
      }
      
      const base64Data = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      if (!base64Data || base64Data.length < 100) {
        throw new Error('3UNDERPINNING.pdf appears to be empty or corrupted');
      }
      
      const templateBytes = base64ToUint8Array(base64Data);
      console.log(`✅ 3UNDERPINNING.pdf loaded: ${templateBytes.length} bytes`);
      
      const extractedData = await extractFieldsFromPDF(templateBytes, '3underpinning');
      setExtractedFields(extractedData);
      setShowFieldsModal(true);

      console.log('\n📊 === 3UNDERPINNING FIELD EXTRACTION REPORT ===');
      console.log(`Total fields: ${extractedData.length}`);
      
      const textFields = extractedData.filter(f => f.type.includes('TextField'));
      const checkboxes = extractedData.filter(f => f.type.includes('CheckBox'));
      const dropdowns = extractedData.filter(f => f.type.includes('Dropdown'));
      const buttons = extractedData.filter(f => f.type.includes('Button'));
      
      console.log(`Text fields: ${textFields.length}`);
      console.log(`Checkboxes: ${checkboxes.length}`);
      console.log(`Dropdowns: ${dropdowns.length}`);
      console.log(`Buttons (potential image fields): ${buttons.length}`);
      
      console.log('\n📋 FIELD DETAILS:');
      extractedData.forEach((field, index) => {
        console.log(`${index + 1}. "${field.name}" (${field.type})`);
        if (field.options && field.options.length > 0) {
          console.log(`   Options: [${field.options.join(', ')}]`);
        }
      });
      
      console.log('\n🔧 === SUGGESTED MAPPING FOR UNDERPINNING ===');
      generateSuggestedMapping(extractedData);
      
      console.log('\n✅ 3UNDERPINNING field extraction complete');
      
    } catch (error: any) {
      console.error('❌ 3UNDERPINNING extraction failed:', error);
      console.error('Error stack:', error.stack);
      Alert.alert(
        '❌ Error', 
        `3UNDERPINNING extraction failed: ${error.message}\n\nPlease ensure the PDF file exists in src/assets/templates/`
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * NUEVA FUNCIÓN: EXTRAER CAMPOS DE 5ELEVATOR PIT.PDF
   */
  const handleExtract5ElevatorPitFields = async () => {
    setIsLoading(true);
    setCurrentTemplate('13WALLSTRIP.pdf');
    try {
      console.log('🔍 === EXTRACTING ALL FIELDS FROM 5ELEVATOR PIT.PDF ===');
      
      // NOTA: Descomenta estas líneas cuando tengas el archivo PDF
    
      const asset = Asset.fromModule(FoundationWall);
      
      console.log('📄 Asset info:', {
        name: asset.name,
        type: asset.type,
        uri: asset.uri,
        localUri: asset.localUri,
        downloaded: asset.downloaded,
      });
      
      await asset.downloadAsync();
      
      console.log('📄 Asset after download:', {
        localUri: asset.localUri,
        downloaded: asset.downloaded,
      });
      
      if (!asset.localUri) {
        throw new Error('Failed to download 5ELEVATOR PIT.pdf - no localUri available');
      }
      
      const fileInfo = await FileSystem.getInfoAsync(asset.localUri);
      console.log('📄 File info:', fileInfo);
      
      if (!fileInfo.exists) {
        throw new Error('5ELEVATOR PIT.pdf file does not exist at localUri');
      }
      
      const base64Data = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      if (!base64Data || base64Data.length < 100) {
        throw new Error('5ELEVATOR PIT.pdf appears to be empty or corrupted');
      }
      
      const templateBytes = base64ToUint8Array(base64Data);
      console.log(`✅ 5ELEVATOR PIT.pdf loaded: ${templateBytes.length} bytes`);
      
      const extractedData = await extractFieldsFromPDF(templateBytes, 'elevator-pit');
      setExtractedFields(extractedData);
      setShowFieldsModal(true);

      // Generar reporte en consola
      console.log('\n📊 === 5ELEVATOR PIT FIELD EXTRACTION REPORT ===');
      console.log(`Total fields: ${extractedData.length}`);
      
      const textFields = extractedData.filter(f => f.type.includes('TextField'));
      const checkboxes = extractedData.filter(f => f.type.includes('CheckBox'));
      const dropdowns = extractedData.filter(f => f.type.includes('Dropdown'));
      const buttons = extractedData.filter(f => f.type.includes('Button'));
      
      console.log(`Text fields: ${textFields.length}`);
      console.log(`Checkboxes: ${checkboxes.length}`);
      console.log(`Dropdowns: ${dropdowns.length}`);
      console.log(`Buttons (potential image fields): ${buttons.length}`);
      
      console.log('\n📋 FIELD DETAILS:');
      extractedData.forEach((field, index) => {
        console.log(`${index + 1}. "${field.name}" (${field.type})`);
        if (field.options && field.options.length > 0) {
          console.log(`   Options: [${field.options.join(', ')}]`);
        }
      });
      
      // Generar mapeo sugerido para el nuevo formulario
      console.log('\n🔧 === SUGGESTED MAPPING FOR ELEVATOR PIT ===');
      generateSuggestedMappingForElevatorPit(extractedData);
      
      console.log('\n✅ 5ELEVATOR PIT field extraction complete');
      
      
    } catch (error: any) {
      console.error('❌ 5ELEVATOR PIT extraction failed:', error);
      console.error('Error stack:', error.stack);
      Alert.alert(
        '❌ Error', 
        `5ELEVATOR PIT extraction failed: ${error.message}\n\nPlease ensure the PDF file exists in src/assets/templates/`
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * GENERAR MAPEO SUGERIDO PARA ELEVATOR PIT
   */
  const generateSuggestedMappingForElevatorPit = (fields: ExtractedField[]) => {
    const suggestedMapping: any = {
      text: {},
      checkbox: {},
      dropdown: {},
      photo: {}
    };

    fields.forEach(field => {
      const fieldName = field.name.toLowerCase();
      
      // Mapeo sugerido basado en patrones comunes para elevator pit
      if (field.type.includes('TextField')) {
        if (fieldName.includes('report') && fieldName.includes('#')) {
          suggestedMapping.text['report_number'] = field.name;
        } else if (fieldName.includes('project') || fieldName.includes('address')) {
          suggestedMapping.text['project_address'] = field.name;
        } else if (fieldName.includes('contractor')) {
          suggestedMapping.text['contractor'] = field.name;
        } else if (fieldName.includes('inspector')) {
          suggestedMapping.text['inspector'] = field.name;
        } else if (fieldName.includes('date')) {
          suggestedMapping.text['inspection_date'] = field.name;
        } else if (fieldName.includes('elevator') && fieldName.includes('number')) {
          suggestedMapping.text['elevator_number'] = field.name;
        } else if (fieldName.includes('pit') && fieldName.includes('depth')) {
          suggestedMapping.text['pit_depth'] = field.name;
        } else if (fieldName.includes('water') || fieldName.includes('waterproof')) {
          suggestedMapping.text['waterproofing'] = field.name;
        } else if (fieldName.includes('drain')) {
          suggestedMapping.text['drainage'] = field.name;
        } else if (fieldName.includes('sump')) {
          suggestedMapping.text['sump_pump'] = field.name;
        }
      } else if (field.type.includes('CheckBox')) {
        if (fieldName.includes('safety')) {
          suggestedMapping.checkbox['safety_check'] = field.name;
        } else if (fieldName.includes('waterproof')) {
          suggestedMapping.checkbox['waterproofing_check'] = field.name;
        } else if (fieldName.includes('drain')) {
          suggestedMapping.checkbox['drainage_check'] = field.name;
        } else if (fieldName.includes('light')) {
          suggestedMapping.checkbox['lighting_check'] = field.name;
        } else if (fieldName.includes('ladder')) {
          suggestedMapping.checkbox['ladder_check'] = field.name;
        }
      } else if (field.type.includes('Dropdown')) {
        if (fieldName.includes('weather')) {
          suggestedMapping.dropdown['weather'] = field.name;
        } else if (fieldName.includes('shift') || fieldName.includes('time')) {
          suggestedMapping.dropdown['shift_time'] = field.name;
        } else if (fieldName.includes('condition')) {
          suggestedMapping.dropdown['pit_condition'] = field.name;
        }
      } else if (field.type.includes('Button') && (fieldName.includes('photo') || fieldName.includes('foto') || fieldName.includes('image'))) {
        // Detectar campos de fotos específicos de elevator pit
        if (fieldName.includes('pit')) {
          suggestedMapping.photo['pit_photo_1'] = field.name;
        } else if (fieldName.includes('drain')) {
          suggestedMapping.photo['drainage_photo'] = field.name;
        } else if (fieldName.includes('water')) {
          suggestedMapping.photo['waterproofing_photo'] = field.name;
        } else if (fieldName.includes('ladder')) {
          suggestedMapping.photo['ladder_photo'] = field.name;
        } else if (fieldName.includes('sump')) {
          suggestedMapping.photo['sump_pump_photo'] = field.name;
        }
      }
    });

    console.log('Suggested mapping for Elevator Pit:', JSON.stringify(suggestedMapping, null, 2));
    
    // Generar código de mapping para copiar/pegar
    console.log('\n📄 === GENERATED MAPPING CODE ===');
    console.log('// Add this to templateMappings.ts');
    console.log('const ELEVATOR_PIT_MAPPING: TemplateMapping = {');
    console.log(`  templateFile: '5ELEVATOR PIT.pdf',`);
    console.log('  fieldMappings: ' + JSON.stringify(suggestedMapping.text, null, 4) + ',');
    console.log('  photoButtonMappings: ' + JSON.stringify(suggestedMapping.photo, null, 4) + ',');
    console.log('  checkboxMappings: ' + JSON.stringify(suggestedMapping.checkbox, null, 4) + ',');
    console.log('  dropdownMappings: ' + JSON.stringify(suggestedMapping.dropdown, null, 4) + ',');
    console.log('  // Add other configurations as needed');
    console.log('};');
    
    return suggestedMapping;
  };

  /**
   * TEST UNDERPINNING: Datos mínimos
   */
  const handleTestUnderpinningMinimal = async () => {
    try {
      console.log('🧪 === TESTING UNDERPINNING WITH MINIMAL DATA ===');
      
      const testData = {
        // Página 1: Información general (requerida)
        inspection_report_number: 'UNDER-TEST-001',
        project_address: '123 Underpinning Test Street, Brooklyn, NY',
        contractor_name: 'Underpinning Test Contractor LLC',
        site_information: 'Building A - Basement Underpinning',
        inspector_name: 'John Doe - Test Inspector',
        inspection_date: format(new Date(), 'MM/dd/yyyy'),
        date_of_issuance: format(new Date(), 'MM/dd/yyyy'),
        
        // Campos opcionales básicos
        weather_conditions: 'Sunny',
        arrival_time: '8:00 am',
        departure_time: '5:00 pm',
        temperature: '75°F',
        structural_element_location: 'Foundation Wall Grid A-6 to D-6',
        inspection_description: 'Underpinning inspection for foundation reinforcement',
        
        // Checkboxes
        deviation_design_documents: false,
        significant_observations: false,
        work_improperly_executed: false,
        unsafe_job_conditions: false,
        precautions_taken: true,
      };

      console.log('📊 Test data:', testData);
      
      const underpinningForm = getFormById('underpinning-inspection-pages');
      if (!underpinningForm) {
        throw new Error('Underpinning form not found in registry');
      }
      
      console.log('📋 Form found:', underpinningForm.name);
      console.log('📄 PDF Template:', underpinningForm.pdfTemplate);
      
      const result = await pdfService.generateFormPDF(testData, underpinningForm);

      if (result.success) {
        Alert.alert(
          '✅ Underpinning PDF Generated',
          `File: ${result.filePath?.split('/').pop()}\n` +
          `Size: ${Math.round((result.fileSize || 0) / 1024)} KB`,
          [
            { text: 'OK' },
            { 
              text: 'Test with Full Data', 
              onPress: handleTestUnderpinningComplete 
            }
          ]
        );
      } else {
        Alert.alert('❌ Error', result.error || 'Unknown error');
      }

    } catch (error: any) {
      console.error('❌ Underpinning test error:', error);
      Alert.alert('❌ Error', error.message);
    }
  };

  /**
   * TEST UNDERPINNING: Datos completos con todas las páginas
   */
  const handleTestUnderpinningComplete = async () => {
    try {
      console.log('🧪 === TESTING UNDERPINNING WITH COMPLETE DATA ===');
      
      const completeData = {
        // Página 1: Información general
        inspection_report_number: 'UNDER-FULL-001',
        project_address: '456 Complete Test Avenue, Brooklyn, NY 11201',
        contractor_name: 'Premium Underpinning Contractors Inc.',
        site_information: 'Building B - Complete Foundation Underpinning Project',
        inspector_name: 'Jane Smith - Senior Inspector',
        inspection_date: format(new Date(), 'MM/dd/yyyy'),
        date_of_issuance: format(new Date(), 'MM/dd/yyyy'),
        weather_conditions: 'Cloudy',
        arrival_time: '9:00 am',
        departure_time: '4:00 pm',
        temperature: '68°F',
        structural_element_location: 'Foundation Walls - All Sides',
        inspection_description: 'Complete underpinning inspection including all structural elements',
        notes_and_samples: 'Concrete samples taken from sections A6 and D6b. All work per specifications.',
        
        // Checkboxes
        deviation_design_documents: false,
        significant_observations: true,
        work_improperly_executed: false,
        unsafe_job_conditions: false,
        precautions_taken: true,
        
        // Página 2: Vistas
        view_underpinning_north_side: 'North side underpinning complete - Grid A1 to A10',
        view_underpinning_south_side: 'South side underpinning in progress - Grid D1 to D10',
        
        // Página 3: Refuerzo vertical
        vertical_reinforcement_underpinning_d6b: '#5 Rebar @ 12" O.C. - Verified',
        vertical_reinforcement_underpinning_a6: '#5 Rebar @ 12" O.C. - Verified',
        
        // Página 4: Espaciado y ancho
        space_vertical_reinforcement_achieved: '12 inches on center - As per plans',
        width_underpinning_a6: '24 inches - Confirmed',
        
        // Página 5: Alturas
        height_underpinning_d6b: '8 feet - As specified',
        height_underpinning_a6: '8 feet - As specified',
        
        // Página 6: Profundidades
        depth_underpinning_d6b: '4 feet below existing footing',
        depth_underpinning_a6: '4 feet below existing footing',
        
        // Página 7: Concreto y vibración
        concrete_placement: '4000 PSI concrete placed via pump truck',
        vibrator_used_during_concrete_placement: 'Internal vibrator used - proper consolidation achieved',
        
        // Página 8: Muestreo y acabado
        concrete_delivered: 'Ready-mix delivered by ABC Concrete - Ticket #12345',
        cylindrical_samples_thermocure_box: '6 cylinders taken - stored in thermocure box',
        slump_test: '4 inch slump - within specifications',
        concrete_finishing_underpinning_space_shims_grout: '1.5" space left for shims and non-shrink grout',
        
        // Página 9: Shear key
        shear_key_provided: 'Shear key formed as per structural drawings',
      };

      console.log('📊 Complete test data prepared');
      
      const underpinningForm = getFormById('underpinning-inspection-pages');
      if (!underpinningForm) {
        throw new Error('Underpinning form not found');
      }
      
      const result = await pdfService.generateFormPDF(completeData, underpinningForm);

      if (result.success) {
        Alert.alert(
          '✅ Complete Underpinning PDF Generated',
          `All fields filled!\n\nFile: ${result.filePath?.split('/').pop()}\n` +
          `Size: ${Math.round((result.fileSize || 0) / 1024)} KB`,
          [{ text: 'Excellent!' }]
        );
      } else {
        Alert.alert('❌ Error', result.error || 'Unknown error');
      }

    } catch (error: any) {
      console.error('❌ Complete underpinning test error:', error);
      Alert.alert('❌ Error', error.message);
    }
  };

  /**
   * VERIFICAR MAPPINGS: Comparar campos del form con mappings del PDF
   */
  const handleVerifyUnderpinningMappings = async () => {
    console.log('🔍 === VERIFYING UNDERPINNING MAPPINGS ===');
    
    try {
      const form = getFormById('underpinning-inspection-pages');
      if (!form) {
        Alert.alert('❌ Error', 'Underpinning form not found');
        return;
      }
      
      const templateMapping = getTemplateMapping('3UNDERPINNING.pdf');
      if (!templateMapping) {
        Alert.alert('❌ Error', 'Template mapping not found');
        return;
      }
      
      const formFieldIds = new Set(form.fields.map(f => f.id));
      
      const allMappings = {
        ...templateMapping.fieldMappings,
        ...templateMapping.photoButtonMappings,
        ...templateMapping.checkboxMappings,
        ...templateMapping.dropdownMappings,
      };
      
      const missingInForm: string[] = [];
      const mappedFields: string[] = [];
      const unmappedFormFields: string[] = [];
      
      Object.keys(allMappings).forEach(fieldId => {
        if (formFieldIds.has(fieldId)) {
          mappedFields.push(fieldId);
        } else {
          missingInForm.push(fieldId);
        }
      });
      
      formFieldIds.forEach(fieldId => {
        if (!Object.keys(allMappings).includes(fieldId)) {
          unmappedFormFields.push(fieldId);
        }
      });
      
      console.log('\n📊 === MAPPING VERIFICATION REPORT ===');
      console.log(`Total form fields: ${formFieldIds.size}`);
      console.log(`Mapped fields: ${mappedFields.length}`);
      console.log(`Missing in form: ${missingInForm.length}`);
      console.log(`Unmapped form fields: ${unmappedFormFields.length}`);
      
      if (missingInForm.length > 0) {
        console.log('\n❌ FIELDS IN MAPPING BUT NOT IN FORM:');
        missingInForm.forEach(f => console.log(`  - ${f}`));
      }
      
      if (unmappedFormFields.length > 0) {
        console.log('\n⚠️ FORM FIELDS WITHOUT MAPPING:');
        unmappedFormFields.forEach(f => console.log(`  - ${f}`));
      }
      
      Alert.alert(
        '📊 Mapping Verification',
        `Form fields: ${formFieldIds.size}\n` +
        `Mapped: ${mappedFields.length}\n` +
        `Missing: ${missingInForm.length}\n` +
        `Unmapped: ${unmappedFormFields.length}\n\n` +
        'Check console for details',
        [{ text: 'OK' }]
      );
      
    } catch (error: any) {
      console.error('❌ Mapping verification error:', error);
      Alert.alert('❌ Error', error.message);
    }
  };

  /**
   * INSPECCIONAR PLANTILLA UNDERPINNING
   */
  const handleInspectUnderpinningTemplate = async () => {
    try {
      console.log('🔍 === INSPECTING UNDERPINNING TEMPLATE ===');
      await pdfService.inspectPDFTemplate('3UNDERPINNING.pdf');
      Alert.alert('✅ Success', 'Template inspection complete. Check console for details.');
    } catch (error: any) {
      console.error('❌ Template inspection failed:', error);
      Alert.alert('❌ Error', error.message);
    }
  };

  /**
   * GENERAR MAPEO SUGERIDO BASADO EN NOMBRES DE CAMPOS
   */
  const generateSuggestedMapping = (fields: ExtractedField[]) => {
    const suggestedMapping: any = {
      text: {},
      checkbox: {},
      dropdown: {},
      photo: {}
    };

    fields.forEach(field => {
      const fieldName = field.name.toLowerCase();
      
      if (field.type.includes('TextField')) {
        if (fieldName.includes('report') && fieldName.includes('#')) {
          suggestedMapping.text['report_number'] = field.name;
        } else if (fieldName.includes('project') || fieldName.includes('address')) {
          suggestedMapping.text['project_address'] = field.name;
        } else if (fieldName.includes('contractor')) {
          suggestedMapping.text['contractor'] = field.name;
        } else if (fieldName.includes('inspector')) {
          suggestedMapping.text['inspector'] = field.name;
        } else if (fieldName.includes('date')) {
          suggestedMapping.text['inspection_date'] = field.name;
        }
      } else if (field.type.includes('CheckBox')) {
        if (fieldName.includes('safety')) {
          suggestedMapping.checkbox['safety_check'] = field.name;
        } else if (fieldName.includes('completion') || fieldName.includes('complete')) {
          suggestedMapping.checkbox['completion_check'] = field.name;
        } else if (fieldName.includes('quality')) {
          suggestedMapping.checkbox['quality_check'] = field.name;
        }
      } else if (field.type.includes('Dropdown')) {
        if (fieldName.includes('weather')) {
          suggestedMapping.dropdown['weather'] = field.name;
        } else if (fieldName.includes('shift') || fieldName.includes('time')) {
          suggestedMapping.dropdown['shift_time'] = field.name;
        }
      } else if (field.type.includes('Button') && (fieldName.includes('photo') || fieldName.includes('foto') || fieldName.includes('image'))) {
        if (fieldName.includes('site')) {
          suggestedMapping.photo['site_photo_1'] = field.name;
        } else if (fieldName.includes('underpin')) {
          suggestedMapping.photo['underpinning_photo_1'] = field.name;
        }
      }
    });

    console.log('Suggested mapping:', JSON.stringify(suggestedMapping, null, 2));
    return suggestedMapping;
  };

  /**
   * FUNCIÓN COMÚN PARA EXTRAER CAMPOS DE CUALQUIER PDF
   */
  const extractFieldsFromPDF = async (templateBytes: Uint8Array, templateName: string): Promise<ExtractedField[]> => {
    const { PDFDocument } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.load(templateBytes, {
      ignoreEncryption: true,
      parseSpeed: 100,
      throwOnInvalidObject: false,
      updateMetadata: false,
      capNumbers: false,
    });
    
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const extractedData: ExtractedField[] = [];

    const currentMappings = templateName === 'secant-pile' ? {
      text: {
        'Report#': 'inspection_report_number',
        'DeptProject': 'project_address',
        'DeptContractor': 'contractor_name',
        'DeptInformation': 'site_information',
        'Inspector': 'inspector_name',
        'Struct/Item': 'structural_element_location',
        'DescriptionInspection': 'inspection_description',
        'Notes': 'notes_and_samples',
        'DiameterPile': 'pile_diameter',
        'DepthPileNorth': 'depth_pile_north',
        'DepthPileEast': 'depth_pile_east',
        'DepthPileSouth': 'depth_pile_south',
        'PileThick': 'pile_thickness',
        'LongBar': 'long_bar',
        'BarCenter': 'bar_center',
        'SpaceBetweenPiles': 'space_between_piles',
        'WorkLocationNorth': 'work_location_north',
        'DescriptionWorkLocationNorth': 'work_location_north_description',
        'WorkLocationEast': 'work_location_east',
        'PortlandCement': 'portland_cement',
        'TremieMetod': 'tremie_method',
        'CertifiedWelder': 'certified_welder',
        'BarInTheCenter': 'bar_in_center',
        'PileGrouted': 'pile_grouted',
        'ElectrodeUsed': 'electrode_used',
        'GroutMixer': 'grout_mixer',
        'RotaryMachine': 'rotary_machine',
      },
      checkbox: {
        'Check Box 1': 'deviation_design_documents',
        'Check Box 2': 'significant_observations',
        'Check Box 3': 'work_improperly_executed',
        'Check Box 4': 'unsafe_job_conditions',
        'Check Box 5': 'precautions_taken',
      },
      dropdown: {
        'Weather': 'weather_conditions',
        'ArrivalTime': 'arrival_time',
        'DepartureTime': 'departure_time',
      }
    } : { text: {}, checkbox: {}, dropdown: {} };

    const reverseMappings: any = {};
    Object.entries(currentMappings).forEach(([type, mappings]) => {
      Object.entries(mappings).forEach(([pdfField, formField]) => {
        reverseMappings[pdfField] = formField;
      });
    });

    fields.forEach((field, index) => {
      try {
        const name = field.getName();
        const type = field.constructor.name;
        
        console.log(`📋 Field ${index + 1}: "${name}" (${type})`);
        
        let fieldInfo: ExtractedField = {
          name,
          type,
          mappedTo: reverseMappings[name] || 'NOT_MAPPED'
        };

        if (type.includes('Dropdown')) {
          try {
            const dropdown = form.getDropdown(name);
            const options = dropdown.getOptions();
            fieldInfo.options = options;
            console.log(`   Options: [${options.join(', ')}]`);
          } catch (e) {
            console.log(`   Options: ERROR reading options`);
            fieldInfo.options = ['ERROR'];
          }
        }

        extractedData.push(fieldInfo);
      } catch (error) {
        console.log(`Field ${index + 1}: ERROR reading field - ${(error as any).message}`);
      }
    });

    return extractedData;
  };

  /**
   * UTILIDAD: Convertir base64 a Uint8Array
   */
  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  /**
   * TEST RÁPIDO CON DATOS MÍNIMOS (SECANT PILE)
   */
  const handleQuickTestWithMinimalData = async () => {
    try {
      console.log('🧪 === QUICK TEST WITH MINIMAL DATA ===');
      
      const testData = {
        inspection_report_number: 'TEST-001',
        project_address: '123 Test Street',
        contractor_name: 'Test Contractor',
        inspector_name: 'John Test',
        inspection_date: format(new Date(), 'MM/dd/yyyy'),
        weather_conditions: 'Sunny',
        arrival_time: '8:00 am',
        departure_time: '5:00 pm',
        temperature: '72°F',
      };

      console.log('📊 Test data:', testData);
      
      const result = await pdfService.generateFormPDF(testData, pileInspectionByPagesForm);

      if (result.success) {
        Alert.alert(
          '✅ PDF Generated Successfully',
          `File: ${result.filePath?.split('/').pop()}\n` +
          `Size: ${Math.round((result.fileSize || 0) / 1024)} KB`
        );
      } else {
        Alert.alert('❌ Error', result.error || 'Unknown error');
      }

    } catch (error: any) {
      console.error('❌ Quick test error:', error);
      Alert.alert('❌ Error', error.message);
    }
  };

  /**
   * GENERAR MAPEO PARA FORMULARIO
   */
  const handleGenerateFormMapping = () => {
    const mapping: {
      text: { [key: string]: string },
      checkbox: { [key: string]: string },
      dropdown: { [key: string]: string },
      photo: { [key: string]: string }
    } = {
      text: {},
      checkbox: {},
      dropdown: {},
      photo: {}
    };

    extractedFields.forEach(field => {
      if (field.mappedTo && field.mappedTo !== 'NOT_MAPPED') {
        if (field.type.includes('TextField')) {
          mapping.text[field.mappedTo] = field.name;
        } else if (field.type.includes('CheckBox')) {
          mapping.checkbox[field.mappedTo] = field.name;
        } else if (field.type.includes('Dropdown')) {
          mapping.dropdown[field.mappedTo] = field.name;
        } else if (field.type.includes('Button')) {
          mapping.photo[field.mappedTo] = field.name;
        }
      }
    });

    console.log(`📋 === GENERATED FORM MAPPING FOR ${currentTemplate} ===`);
    console.log('export const GENERATED_FIELD_MAPPING = {');
    console.log('  text:', JSON.stringify(mapping.text, null, 2), ',');
    console.log('  checkbox:', JSON.stringify(mapping.checkbox, null, 2), ',');
    console.log('  dropdown:', JSON.stringify(mapping.dropdown, null, 2), ',');
    console.log('  photo:', JSON.stringify(mapping.photo, null, 2));
    console.log('};');

    Alert.alert(
      '✅ Mapping Generated',
      `Check the console for the complete mapping code for ${currentTemplate}`
    );
  };

  /**
   * VERIFICAR ARCHIVOS PDF
   */
  const handleVerifyPDFFiles = async () => {
    console.log('🔍 === VERIFYING PDF FILES ===');
    
    try {
      // Verificar secant-pile-template.pdf
      const secantAsset = Asset.fromModule(SecantPilePDF);
      await secantAsset.downloadAsync();
      console.log('✅ secant-pile-template.pdf:', {
        exists: !!secantAsset.localUri,
        localUri: secantAsset.localUri,
      });
      
      // Verificar 3UNDERPINNING.pdf
      const underpinningAsset = Asset.fromModule(UnderpinningPDF);
      await underpinningAsset.downloadAsync();
      console.log('✅ 3UNDERPINNING.pdf:', {
        exists: !!underpinningAsset.localUri,
        localUri: underpinningAsset.localUri,
      });
      
      // NOTA: Descomenta cuando tengas el archivo
 
      // Verificar 5ELEVATOR PIT.pdf
      const elevatorAsset = Asset.fromModule(ElevatorPitPDF);
      await elevatorAsset.downloadAsync();
      console.log('✅ 5ELEVATOR PIT.pdf:', {
        exists: !!elevatorAsset.localUri,
        localUri: elevatorAsset.localUri,
      });
   
      
      Alert.alert('✅ PDF Files Verified', 'Available PDF templates verified successfully');
    } catch (error: any) {
      console.error('❌ PDF verification failed:', error);
      Alert.alert('❌ Error', `PDF verification failed: ${error.message}`);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings & Development Tools</Text>
        <Text style={styles.subtitle}>
          PDF template testing and analysis
        </Text>
      </View>

      {/* SECCIÓN: VERIFICACIÓN DE ARCHIVOS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>File Verification</Text>
        
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleVerifyPDFFiles}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.info + '20' }]}>
            <Ionicons name="document-text" size={24} color={COLORS.info} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Verify PDF Files</Text>
            <Text style={styles.settingDescription}>
              Check if all PDF templates are available
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>
      </View>

      {/* SECCIÓN: ANÁLISIS DE PLANTILLAS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Template Analysis</Text>
        
        {/* BOTÓN PARA SECANT-PILE */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleExtractAllTemplateFields}
          disabled={isLoading}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.primary + '20' }]}>
            <Ionicons name="code-working" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Extract Secant Pile Fields</Text>
            <Text style={styles.settingDescription}>
              Get fields from secant-pile-template.pdf
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>

        {/* BOTÓN PARA 3UNDERPINNING */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleExtract3UnderpinningFields}
          disabled={isLoading}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.secondary + '20' }]}>
            <Ionicons name="construct" size={24} color={COLORS.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Extract 3UNDERPINNING Fields</Text>
            <Text style={styles.settingDescription}>
              Get fields from 3UNDERPINNING.pdf
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>

        {/* NUEVO BOTÓN PARA 5ELEVATOR PIT */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleExtract5ElevatorPitFields}
          disabled={isLoading}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.warning + '20' }]}>
            <Ionicons name="arrow-down-circle" size={24} color={COLORS.warning} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Extract 5ELEVATOR PIT Fields</Text>
            <Text style={styles.settingDescription}>
              Get fields from 5ELEVATOR PIT.pdf
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>
      </View>

      {/* SECCIÓN: UNDERPINNING TESTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Underpinning Form Tests</Text>
        
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleTestUnderpinningMinimal}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.success + '20' }]}>
            <Ionicons name="document-text" size={24} color={COLORS.success} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Test Underpinning (Minimal)</Text>
            <Text style={styles.settingDescription}>
              Test with only required fields
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleTestUnderpinningComplete}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.primary + '20' }]}>
            <Ionicons name="document-attach" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Test Underpinning (Complete)</Text>
            <Text style={styles.settingDescription}>
              Test with all fields filled
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleVerifyUnderpinningMappings}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.warning + '20' }]}>
            <Ionicons name="git-compare" size={24} color={COLORS.warning} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Verify Mappings</Text>
            <Text style={styles.settingDescription}>
              Check form fields vs PDF mappings
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleInspectUnderpinningTemplate}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.info + '20' }]}>
            <Ionicons name="search" size={24} color={COLORS.info} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Inspect Template</Text>
            <Text style={styles.settingDescription}>
              View all PDF fields and mappings
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>
      </View>

      {/* SECCIÓN: PRUEBAS SECANT PILE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Secant Pile Testing</Text>
        
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleQuickTestWithMinimalData}
        >
          <View style={[styles.settingIcon, { backgroundColor: COLORS.success + '20' }]}>
            <Ionicons name="flash" size={24} color={COLORS.success} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Quick Test (Secant Pile)</Text>
            <Text style={styles.settingDescription}>
              Test with minimal data
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>
      </View>

      {/* INFORMACIÓN DE DEBUG */}
      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>Available Templates & Forms</Text>
        <Text style={styles.debugText}>
          📄 PDF Templates:{'\n'}
          • secant-pile-template.pdf ✅{'\n'}
          • 3UNDERPINNING.pdf ✅{'\n'}
          • 5ELEVATOR PIT.pdf 🔜 (pending){'\n'}
          {'\n'}
          📋 Registered Forms:{'\n'}
          • pile-inspection-pages → secant-pile-template.pdf{'\n'}
          • underpinning-inspection-pages → 3UNDERPINNING.pdf{'\n'}
          • elevator-pit-inspection → 5ELEVATOR PIT.pdf (pending){'\n'}
          {'\n'}
          💡 Tips:{'\n'}
          • Use "Extract Fields" to analyze PDF structure{'\n'}
          • Check console for field names and types{'\n'}
          • Use generated mapping code for new forms
        </Text>
      </View>

      {/* MODAL DE CAMPOS EXTRAÍDOS */}
      <Modal
        visible={showFieldsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Extracted Fields - {currentTemplate}
            </Text>
            <TouchableOpacity onPress={() => setShowFieldsModal(false)}>
              <Ionicons name="close" size={28} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.fieldsSummary}>
              <Text style={styles.summaryText}>
                Total Fields: {extractedFields.length}
              </Text>
              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGenerateFormMapping}
              >
                <Text style={styles.generateButtonText}>Generate Mapping Code</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldTypesSummary}>
              <Text style={styles.fieldTypeSummaryItem}>
                📝 Text: {extractedFields.filter(f => f.type.includes('TextField')).length}
              </Text>
              <Text style={styles.fieldTypeSummaryItem}>
                ☑️ Checkbox: {extractedFields.filter(f => f.type.includes('CheckBox')).length}
              </Text>
              <Text style={styles.fieldTypeSummaryItem}>
                📋 Dropdown: {extractedFields.filter(f => f.type.includes('Dropdown')).length}
              </Text>
              <Text style={styles.fieldTypeSummaryItem}>
                📸 Button: {extractedFields.filter(f => f.type.includes('Button')).length}
              </Text>
            </View>

            {extractedFields.map((field, index) => (
              <View 
                key={index} 
                style={[
                  styles.fieldItem,
                  field.mappedTo === 'NOT_MAPPED' && styles.unmappedField
                ]}
              >
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldName}>{field.name}</Text>
                  <Text style={styles.fieldType}>{field.type.replace('PDFAcroForm', '')}</Text>
                </View>
                
                <Text style={[
                  styles.mappedTo,
                  field.mappedTo === 'NOT_MAPPED' && styles.notMappedText
                ]}>
                  → {field.mappedTo}
                </Text>
                
                {field.options && (
                  <View style={styles.optionsContainer}>
                    <Text style={styles.optionsLabel}>Options:</Text>
                    <Text style={styles.optionsText}>
                      {field.options.join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Loading overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Processing {currentTemplate}...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.gray50,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  debugSection: {
    margin: 20,
    padding: 15,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  fieldsSummary: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldTypesSummary: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  fieldTypeSummaryItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  fieldItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  unmappedField: {
    borderLeftColor: COLORS.warning,
    backgroundColor: COLORS.warning + '10',
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  fieldType: {
    fontSize: 12,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mappedTo: {
    fontSize: 14,
    color: COLORS.success,
    fontStyle: 'italic',
  },
  notMappedText: {
    color: COLORS.warning,
    fontWeight: '600',
  },
  optionsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.gray50,
    borderRadius: 6,
  },
  optionsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  optionsText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
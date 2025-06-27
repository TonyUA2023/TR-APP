// Archivo: src/components/PDFTemplateTester.tsx
// Sistema mejorado para probar el llenado de plantillas PDF

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Modal,
  TextInput,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { pdfService } from '../services/pdfService';

interface TestResult {
  fieldName: string;
  expectedValue: string;
  actualValue?: string;
  success: boolean;
  errorMessage?: string;
  fieldType: 'text' | 'checkbox' | 'dropdown';
}

interface TemplateInfo {
  totalFields: number;
  textFields: string[];
  checkboxFields: string[];
  dropdownFields: string[];
}

export const PDFTemplateTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templateInfo, setTemplateInfo] = useState<TemplateInfo | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailModalData, setDetailModalData] = useState<any>(null);
  const [useCustomData, setUseCustomData] = useState(false);
  const [customTestData, setCustomTestData] = useState('{}');

  // Datos de prueba por defecto
  const defaultTestData = {
    inspection_report_number: 'TEST-001-2024',
    project_address: '123 Main Street, Test City, TS 12345',
    contractor_name: 'Test Contractor LLC',
    site_information: 'Test site with pile foundations',
    inspector_name: 'John Test Inspector',
    structural_element_location: 'Foundation Area A',
    inspection_description: 'Routine pile inspection test',
    notes_and_samples: 'This is a test of the template filling system. All data should appear correctly in the PDF.',
    pile_diameter: '24 inches',
    depth_pile_north: '25.5 feet',
    depth_pile_east: '26.0 feet',
    depth_pile_south: '24.8 feet',
    pile_thickness: '12 inches',
    long_bar: '#8 rebar',
    bar_center: '6 inches',
    space_between_piles: '3 feet',
    portland_cement: 'Type I Portland',
    tremie_method: 'Standard tremie',
    certified_welder: 'Yes - License #12345',
    bar_in_center: 'Yes',
    pile_grouted: 'Yes - Full depth',
    electrode_used: 'E7018',
    grout_mixer: 'Mechanical mixer',
    rotary_machine: 'CAT 320D',
    deviation_design_documents: true,
    significant_observations: false,
    work_improperly_executed: false,
    unsafe_job_conditions: true,
    precautions_taken: true,
    weather_conditions: 'Sunny',
    arrival_time: '08:00',
    departure_time: '16:30',
    temperature: '75°F',
    inspection_date: '12/15/2024'
  };

  /**
   * Inspeccionar la estructura de la plantilla PDF
   */
  const handleInspectTemplate = async () => {
    setIsLoading(true);
    try {
      console.log('🔍 === TEMPLATE INSPECTION ===');
      
      // Acceder a métodos privados del servicio
      const svc: any = pdfService;
      const templateBytes = await svc.loadTemplate();
      
      if (!templateBytes) {
        Alert.alert('❌ Error', 'No se pudo cargar la plantilla PDF');
        return;
      }

      // Importar PDFDocument dinámicamente
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      const textFields: string[] = [];
      const checkboxFields: string[] = [];
      const dropdownFields: string[] = [];

      fields.forEach(field => {
        const name = field.getName();
        const type = field.constructor.name;
        
        console.log(`📋 Field: "${name}" (${type})`);
        
        if (type.includes('TextField')) {
          textFields.push(name);
        } else if (type.includes('CheckBox')) {
          checkboxFields.push(name);
        } else if (type.includes('Dropdown')) {
          dropdownFields.push(name);
        }
      });

      const info: TemplateInfo = {
        totalFields: fields.length,
        textFields,
        checkboxFields,
        dropdownFields
      };

      setTemplateInfo(info);
      setDetailModalData(info);
      setShowDetailModal(true);

      console.log('✅ Template inspection complete');
      
    } catch (error: any) {
      console.error('❌ Template inspection failed:', error);
      Alert.alert('❌ Error', `Inspection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Probar el llenado de la plantilla con validación detallada
   */
  const handleTestTemplateFill = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      console.log('🧪 === TESTING TEMPLATE FILL ===');
      
      // Preparar datos de prueba
      let testData = defaultTestData;
      if (useCustomData) {
        try {
          testData = { ...defaultTestData, ...JSON.parse(customTestData) };
        } catch (e) {
          Alert.alert('❌ Error', 'Invalid JSON in custom test data');
          return;
        }
      }

      // Acceder a métodos privados del servicio
      const svc: any = pdfService;
      const templateBytes = await svc.loadTemplate();
      
      if (!templateBytes) {
        Alert.alert('❌ Error', 'No se pudo cargar la plantilla PDF');
        return;
      }

      console.log('📋 Loading template for validation...');
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();

      // Probar el llenado y validar cada campo
      const results: TestResult[] = [];
      
      // Mapeos de campos (copiados de tu servicio)
      const SECANT_PILE_FIELD_MAPPING = {
        inspection_report_number: 'Report#',
        project_address: 'DeptProject',
        contractor_name: 'DeptContractor',
        site_information: 'DeptInformation',
        inspector_name: 'Inspector',
        structural_element_location: 'Struct/Item',
        inspection_description: 'DescriptionInspection',
        notes_and_samples: 'Notes',
        pile_diameter: 'DiameterPile',
        depth_pile_north: 'DepthPileNorth',
        depth_pile_east: 'DepthPileEast',
        depth_pile_south: 'DepthPileSouth',
        pile_thickness: 'PileThick',
        long_bar: 'LongBar',
        bar_center: 'BarCenter',
        space_between_piles: 'SpaceBetweenPiles',
        portland_cement: 'PortlandCement',
        tremie_method: 'TremieMetod',
        certified_welder: 'CertifiedWelder',
        bar_in_center: 'BarInTheCenter',
        pile_grouted: 'PileGrouted',
        electrode_used: 'ElectrodeUsed',
        grout_mixer: 'GroutMixer',
        rotary_machine: 'RotaryMachine',
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
      };

      // Probar campos de texto
      Object.entries(SECANT_PILE_FIELD_MAPPING).forEach(([dataKey, pdfFieldName]) => {
        const expectedValue = testData[dataKey as keyof typeof testData]?.toString() || '';
        
        try {
          const field = form.getTextField(pdfFieldName);
          field.setText(expectedValue);
          const actualValue = field.getText();
          
          results.push({
            fieldName: pdfFieldName,
            expectedValue,
            actualValue,
            success: actualValue === expectedValue,
            fieldType: 'text'
          });
          
          console.log(`✅ Text field ${pdfFieldName}: "${expectedValue}" → "${actualValue}"`);
          
        } catch (error: any) {
          results.push({
            fieldName: pdfFieldName,
            expectedValue,
            success: false,
            errorMessage: error.message,
            fieldType: 'text'
          });
          
          console.log(`❌ Text field ${pdfFieldName}: ${error.message}`);
        }
      });

      // Probar checkboxes
      Object.entries(CHECKBOX_MAPPING).forEach(([dataKey, pdfFieldName]) => {
        const expectedValue = testData[dataKey as keyof typeof testData];
        const shouldCheck = Boolean(expectedValue);
        
        try {
          const checkbox = form.getCheckBox(pdfFieldName);
          if (shouldCheck) {
            checkbox.check();
          } else {
            checkbox.uncheck();
          }
          
          const isChecked = checkbox.isChecked();
          
          results.push({
            fieldName: pdfFieldName,
            expectedValue: shouldCheck ? 'checked' : 'unchecked',
            actualValue: isChecked ? 'checked' : 'unchecked',
            success: isChecked === shouldCheck,
            fieldType: 'checkbox'
          });
          
          console.log(`✅ Checkbox ${pdfFieldName}: ${shouldCheck} → ${isChecked}`);
          
        } catch (error: any) {
          results.push({
            fieldName: pdfFieldName,
            expectedValue: shouldCheck ? 'checked' : 'unchecked',
            success: false,
            errorMessage: error.message,
            fieldType: 'checkbox'
          });
          
          console.log(`❌ Checkbox ${pdfFieldName}: ${error.message}`);
        }
      });

      // Probar dropdowns
      Object.entries(DROPDOWN_MAPPING).forEach(([dataKey, pdfFieldName]) => {
        const expectedValue = testData[dataKey as keyof typeof testData]?.toString() || '';
        
        try {
          const dropdown = form.getDropdown(pdfFieldName);
          const options = dropdown.getOptions();
          
          if (options.includes(expectedValue)) {
            dropdown.select(expectedValue);
            const selectedValue = dropdown.getSelected()[0];
            
            results.push({
              fieldName: pdfFieldName,
              expectedValue,
              actualValue: selectedValue,
              success: selectedValue === expectedValue,
              fieldType: 'dropdown'
            });
            
            console.log(`✅ Dropdown ${pdfFieldName}: "${expectedValue}" → "${selectedValue}"`);
          } else {
            results.push({
              fieldName: pdfFieldName,
              expectedValue,
              success: false,
              errorMessage: `Value "${expectedValue}" not in options: [${options.join(', ')}]`,
              fieldType: 'dropdown'
            });
            
            console.log(`❌ Dropdown ${pdfFieldName}: "${expectedValue}" not in options`);
          }
          
        } catch (error: any) {
          results.push({
            fieldName: pdfFieldName,
            expectedValue,
            success: false,
            errorMessage: error.message,
            fieldType: 'dropdown'
          });
          
          console.log(`❌ Dropdown ${pdfFieldName}: ${error.message}`);
        }
      });

      setTestResults(results);
      
      // Generar PDF final para verificación
      const filledPdfBytes = await pdfDoc.save();
      const result = await svc.savePDFAndShare(filledPdfBytes, testData, 'TEST_VALIDATION');
      
      // Mostrar resumen
      const successful = results.filter(r => r.success).length;
      const total = results.length;
      
      Alert.alert(
        '🧪 Test Complete',
        `Fields tested: ${total}\n` +
        `Successful: ${successful}\n` +
        `Failed: ${total - successful}\n\n` +
        `PDF saved: ${result.filePath?.split('/').pop()}`
      );

      console.log('✅ Template fill test complete');
      
    } catch (error: any) {
      console.error('❌ Template fill test failed:', error);
      Alert.alert('❌ Error', `Test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Renderizar resultados de prueba
   */
  const renderTestResults = () => {
    if (testResults.length === 0) return null;

    const successful = testResults.filter(r => r.success).length;
    const failed = testResults.filter(r => !r.success).length;

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Test Results</Text>
        
        <View style={styles.resultsSummary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={styles.summaryValue}>{testResults.length}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: COLORS.success }]}>Success:</Text>
            <Text style={[styles.summaryValue, { color: COLORS.success }]}>{successful}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: COLORS.error }]}>Failed:</Text>
            <Text style={[styles.summaryValue, { color: COLORS.error }]}>{failed}</Text>
          </View>
        </View>

        <ScrollView style={styles.resultsList} nestedScrollEnabled>
          {testResults.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.resultItem,
                { borderLeftColor: result.success ? COLORS.success : COLORS.error }
              ]}
              onPress={() => {
                setDetailModalData(result);
                setShowDetailModal(true);
              }}
            >
              <View style={styles.resultHeader}>
                <Text style={styles.fieldName}>{result.fieldName}</Text>
                <Ionicons
                  name={result.success ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={result.success ? COLORS.success : COLORS.error}
                />
              </View>
              
              <Text style={styles.fieldType}>{result.fieldType}</Text>
              
              {result.errorMessage && (
                <Text style={styles.errorMessage}>{result.errorMessage}</Text>
              )}
              
              {result.success && (
                <Text style={styles.valuePreview}>
                  {result.expectedValue.substring(0, 50)}
                  {result.expectedValue.length > 50 ? '...' : ''}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PDF Template Tester</Text>
      <Text style={styles.subtitle}>Validate template field mapping and data filling</Text>

      {/* Opciones de configuración */}
      <View style={styles.configSection}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Use Custom Test Data</Text>
          <Switch
            value={useCustomData}
            onValueChange={setUseCustomData}
            trackColor={{ false: COLORS.gray300, true: COLORS.primary }}
          />
        </View>
        
        {useCustomData && (
          <TextInput
            style={styles.jsonInput}
            multiline
            placeholder='{"field_name": "custom_value"}'
            value={customTestData}
            onChangeText={setCustomTestData}
          />
        )}
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.inspectButton]}
          onPress={handleInspectTemplate}
          disabled={isLoading}
        >
          <Ionicons name="search" size={20} color="white" />
          <Text style={styles.buttonText}>Inspect Template</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.testButton]}
          onPress={handleTestTemplateFill}
          disabled={isLoading}
        >
          <Ionicons name="flask" size={20} color="white" />
          <Text style={styles.buttonText}>Test Fill</Text>
        </TouchableOpacity>
      </View>

      {/* Información de la plantilla */}
      {templateInfo && (
        <View style={styles.templateInfo}>
          <Text style={styles.infoTitle}>Template Info</Text>
          <Text style={styles.infoText}>Total Fields: {templateInfo.totalFields}</Text>
          <Text style={styles.infoText}>Text: {templateInfo.textFields.length}</Text>
          <Text style={styles.infoText}>Checkboxes: {templateInfo.checkboxFields.length}</Text>
          <Text style={styles.infoText}>Dropdowns: {templateInfo.dropdownFields.length}</Text>
        </View>
      )}

      {/* Resultados de prueba */}
      {renderTestResults()}

      {/* Modal de detalles */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Details</Text>
            <TouchableOpacity onPress={() => setShowDetailModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
              {JSON.stringify(detailModalData, null, 2)}
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  configSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  jsonInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    gap: 8,
  },
  inspectButton: {
    backgroundColor: COLORS.info,
  },
  testButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  templateInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    flex: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  resultsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  fieldName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  fieldType: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 12,
    color: COLORS.error,
    fontStyle: 'italic',
  },
  valuePreview: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
  modalText: {
    fontFamily: 'monospace',
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
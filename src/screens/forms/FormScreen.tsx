// src/screens/forms/FormScreen.tsx - ARCHIVO COMPLETO

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, FormData, InspectionRecord } from '../../types';
import { COLORS } from '../../constants';
import { getFormById } from '../../data/forms';
import DynamicForm from '../../components/forms/DynamicForm';
import { storageService } from '../../services/storageService';
import { pdfService } from '../../services/pdfServiceDynamic';

type FormScreenRouteProp = RouteProp<RootStackParamList, 'FormScreen'>;
type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FormScreen'>;

interface FormScreenState {
  isLoading: boolean;
  isSaving: boolean;
  isExporting: boolean;
  hasUnsavedChanges: boolean;
  formData: FormData;
  inspectionRecord: InspectionRecord | null;
  error: string | null;
}

const FormScreen: React.FC = () => {
  const route = useRoute<FormScreenRouteProp>();
  const navigation = useNavigation<FormScreenNavigationProp>();
  const { formId, recordId } = route.params;

  const [state, setState] = useState<FormScreenState>({
    isLoading: true,
    isSaving: false,
    isExporting: false,
    hasUnsavedChanges: false,
    formData: {},
    inspectionRecord: null,
    error: null,
  });

  // Obtener formulario desde el registro central
  const form = getFormById(formId);

  // Manejar botón atrás con cambios sin guardar
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (state.hasUnsavedChanges) {
          Alert.alert(
            'Unsaved Changes',
            'You have unsaved changes. Do you want to save before leaving?',
            [
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => navigation.goBack(),
              },
              {
                text: 'Save',
                onPress: async () => {
                  await handleSave(state.formData);
                  navigation.goBack();
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [state.hasUnsavedChanges, state.formData, navigation])
  );

  useEffect(() => {
    loadFormData();
  }, [formId, recordId]);

  useEffect(() => {
    // Configurar título de la pantalla
    if (form) {
      navigation.setOptions({
        title: form.name,
        headerBackTitle: 'Back',
      });
    }
  }, [form, navigation]);

  /**
   * Cargar datos del formulario
   */
  const loadFormData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      if (recordId) {
        // Cargar inspección existente
        const record = await storageService.getInspectionRecord(recordId);
        if (record) {
          setState(prev => ({
            ...prev,
            inspectionRecord: record,
            formData: record.data,
            hasUnsavedChanges: false,
          }));
        } else {
          throw new Error('Inspection record not found');
        }
      } else {
        // Nuevo formulario - cargar datos por defecto
        const defaultData = generateDefaultFormData();
        setState(prev => ({
          ...prev,
          formData: defaultData,
          hasUnsavedChanges: false,
        }));
      }
    } catch (error: any) {
      console.error('Error loading form data:', error);
      setState(prev => ({
        ...prev,
        error: `Failed to load form data: ${error.message}`,
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * Generar datos por defecto del formulario
   */
  const generateDefaultFormData = (): FormData => {
    const defaultData: FormData = {};
    
    // Pre-llenar fecha de inspección con hoy
    defaultData.inspection_date = new Date().toISOString().split('T')[0];
    
    // Pre-llenar según el tipo de formulario
    switch (formId) {
      case 'secant-pile-inspection':
        defaultData.weather_conditions = 'Sunny';
        defaultData.temperature = '72°F';
        defaultData.arrival_time = '8:00 am';
        defaultData.departure_time = '5:00 pm';
        break;
        
      case 'pile-inspection':
        defaultData.weather_conditions = 'Sunny';
        defaultData.temperature = '72°F';
        break;
        
      // Agregar más casos según agregues formularios
    }
    
    return defaultData;
  };

  /**
   * Manejar cambios en los datos del formulario
   */
  const handleDataChange = useCallback((data: FormData) => {
    setState(prev => ({
      ...prev,
      formData: data,
      hasUnsavedChanges: true,
    }));
  }, []);

  /**
   * Guardar formulario
   */
  const handleSave = async (data: FormData) => {
    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      let record: InspectionRecord;
      
      if (state.inspectionRecord) {
        // Actualizar registro existente
        record = {
          ...state.inspectionRecord,
          data,
          updatedAt: new Date(),
          status: 'draft',
        };
      } else {
        // Crear nuevo registro
        record = {
          id: generateRecordId(),
          formId,
          categoryId: form?.categoryId || 'unknown',
          title: generateRecordTitle(data),
          data,
          photos: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'draft',
        };
      }
      
      await storageService.saveInspectionRecord(record);
      
      setState(prev => ({
        ...prev,
        inspectionRecord: record,
        formData: data,
        hasUnsavedChanges: false,
        error: null,
      }));
      
      console.log('✅ Form saved successfully');
      
    } catch (error: any) {
      console.error('❌ Error saving form:', error);
      Alert.alert('Save Error', `Failed to save form: ${error.message}`);
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  };

  /**
   * Exportar a PDF
   */
  const handleExportPDF = async (data: FormData): Promise<any> => {
    if (!form) {
      Alert.alert('Error', 'Form configuration not found');
      return { success: false, error: 'Form not found' };
    }

    console.log('📋 === PDF EXPORT FROM FORMSCREEN ===');
    console.log('📊 Form data:', data);
    console.log('📋 Form ID:', form.id);

    setState(prev => ({ ...prev, isExporting: true }));
    
    try {
      // Primero guardar los datos
      console.log('💾 Saving form data...');
      await handleSave(data);
      
      // Validar datos requeridos
      const validationResult = validateFormData(data);
      if (!validationResult.isValid) {
        Alert.alert(
          'Incomplete Form',
          `Please fill in the following required fields:\n${validationResult.missingFields.join('\n')}`,
          [{ text: 'OK' }]
        );
        return { success: false, error: 'Incomplete form data' };
      }
      
      // Generar PDF
      console.log('📄 Generating PDF...');
      const result = await pdfService.generateFormPDF(data, form);
      
      console.log('📋 PDF generation result:', result);
      
      if (result.success) {
        console.log('✅ PDF generated successfully');
        
        // Actualizar estado del registro
        if (state.inspectionRecord) {
          const updatedRecord = {
            ...state.inspectionRecord,
            status: 'exported' as const,
            pdfPath: result.filePath,
            completedAt: new Date(),
          };
          await storageService.saveInspectionRecord(updatedRecord);
          setState(prev => ({ 
            ...prev, 
            inspectionRecord: updatedRecord,
            hasUnsavedChanges: false,
          }));
        }
        
        Alert.alert(
          'Export Successful!', 
          `PDF exported successfully!\n\nFile: ${result.filePath?.split('/').pop()}\nSize: ${Math.round((result.fileSize || 0) / 1024)} KB`,
          [
            { 
              text: 'Continue Editing', 
              style: 'default' 
            },
            { 
              text: 'Back to Dashboard', 
              style: 'default',
              onPress: () => navigation.navigate('Dashboard')
            }
          ]
        );
        
        return result;
      } else {
        console.error('❌ PDF generation failed:', result.error);
        Alert.alert(
          'Export Error', 
          `Failed to export PDF:\n${result.error}`,
          [
            { text: 'Try Again' },
            { 
              text: 'Contact Support', 
              onPress: () => {
                console.log('Contact support requested for PDF export error');
              }
            }
          ]
        );
        return result;
      }
      
    } catch (error: any) {
      console.error('❌ Error exporting PDF:', error);
      Alert.alert(
        'Export Error', 
        `An unexpected error occurred:\n${error.message}`,
        [{ text: 'OK' }]
      );
      return { success: false, error: error.message };
    } finally {
      setState(prev => ({ ...prev, isExporting: false }));
    }
  };

  /**
   * Validar datos del formulario
   */
  const validateFormData = (data: FormData): { isValid: boolean; missingFields: string[] } => {
    if (!form) return { isValid: false, missingFields: ['Form not found'] };

    const missingFields: string[] = [];

    // Validar solo campos marcados como requeridos
    form.fields.forEach(field => {
      if (field.required) {
        const value = data[field.id];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          missingFields.push(field.label);
        }
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };

  /**
   * Generar ID único para el registro
   */
  const generateRecordId = (): string => {
    return `${formId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Generar título del registro basado en los datos
   */
  const generateRecordTitle = (data: FormData): string => {
    const reportNumber = data.inspection_report_number || 'Unknown';
    
    switch (formId) {
      case 'secant-pile-inspection':
        const projectAddress = data.project_address || 'Project';
        return `Report #${reportNumber} - ${projectAddress}`;
      
      case 'pile-inspection':
        const projectName = data.project_name || 'Project';
        return `Report #${reportNumber} - ${projectName}`;
      
      default:
        return `${form?.name || 'Inspection'} - ${new Date().toLocaleDateString()}`;
    }
  };

  // Mostrar error si hay problemas críticos
  if (state.error && !state.isLoading) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Error Loading Form</Text>
        <Text style={styles.errorText}>{state.error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadFormData}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mostrar loading
  if (state.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading form...</Text>
      </View>
    );
  }

  // Mostrar error si no se encuentra el formulario
  if (!form) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Form Not Found</Text>
        <Text style={styles.errorText}>Form ID: {formId}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Overlay de guardado/exportación */}
      {(state.isSaving || state.isExporting) && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.overlayText}>
              {state.isSaving ? 'Saving form...' : 'Generating PDF...'}
            </Text>
            {state.isExporting && (
              <Text style={styles.overlaySubtext}>
                This may take a few moments...
              </Text>
            )}
          </View>
        </View>
      )}

      {/* Formulario dinámico */}
      <DynamicForm
        form={form}
        initialData={state.formData}
        onSave={handleSave}
        onExportPDF={handleExportPDF}
        onDataChange={handleDataChange} // Add this line
        autoSave={true}
        hasUnsavedChanges={state.hasUnsavedChanges} // Add this line
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  overlayText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    marginTop: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  overlaySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default FormScreen;
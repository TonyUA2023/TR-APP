// src/components/forms/DynamicForm.tsx

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

import { InspectionForm, FormData, FormField } from '../../types';
import { COLORS } from '../../constants';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import FormImagePicker from './FormImagePicker';
import FormSignature from './FormSignature';


interface DynamicFormProps {
  form: InspectionForm;
  initialData?: FormData;
  onSave: (data: FormData) => void;
  onExportPDF: (data: FormData) => void;
  autoSave?: boolean;
  onDataChange?: (data: FormData) => void; // Add this if missing
  hasUnsavedChanges?: boolean; // Add this if missing
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  form,
  initialData = {},
  onSave,
  onExportPDF,
  autoSave = true,
}) => {
  const [currentSection, setCurrentSection] = useState<string>('');
  const [sections, setSections] = useState<string[]>([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [completedFields, setCompletedFields] = useState<number>(0);

  // Crear schema de validación dinámico
  const createValidationSchema = () => {
    const shape: any = {};
    
    form.fields.forEach((field) => {
      let validator = yup.mixed();
      
      if (field.required) {
        validator = validator.required(`${field.label} is required`);
      }
      
      if (field.type === 'email') {
        validator = yup.string().email('Invalid email format');
      }
      
      if (field.type === 'number') {
        validator = yup.number();
        if (field.validation?.min) {
          validator = validator.min(field.validation.min);
        }
        if (field.validation?.max) {
          validator = validator.max(field.validation.max);
        }
      }
      
      if (field.validation?.pattern) {
        validator = yup.string().matches(new RegExp(field.validation.pattern));
      }
      
      shape[field.id] = validator;
    });
    
    return yup.object().shape(shape);
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(createValidationSchema()),
    defaultValues: initialData,
  });

  // Extraer secciones únicas
  useEffect(() => {
    const uniqueSections = [...new Set(form.fields.map(field => field.section || 'General'))];
    setSections(uniqueSections);
    if (uniqueSections.length > 0) {
      setCurrentSection(uniqueSections[0]);
    }
  }, [form.fields]);

  // Calcular campos completados
  useEffect(() => {
    const formValues = getValues();
    const completed = form.fields.filter(field => {
      const value = formValues[field.id];
      return value !== undefined && value !== null && value !== '' && 
             (Array.isArray(value) ? value.length > 0 : true);
    }).length;
    setCompletedFields(completed);
  }, [watch(), form.fields]);

  // Auto-guardado
  useEffect(() => {
    if (!autoSave || !isDirty) return;

    const timer = setTimeout(async () => {
      setIsAutoSaving(true);
      const currentData = getValues();
      await onSave(currentData);
      setIsAutoSaving(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [watch(), autoSave, isDirty]);

  // Filtrar campos por sección actual
  const getCurrentSectionFields = () => {
    return form.fields.filter(field => 
      (field.section || 'General') === currentSection
    );
  };

  // Calcular estadísticas de la sección actual
  const getCurrentSectionStats = () => {
    const sectionFields = getCurrentSectionFields();
    const formValues = getValues();
    const completed = sectionFields.filter(field => {
      const value = formValues[field.id];
      return value !== undefined && value !== null && value !== '' && 
             (Array.isArray(value) ? value.length > 0 : true);
    }).length;
    
    return {
      total: sectionFields.length,
      completed,
      percentage: sectionFields.length > 0 ? Math.round((completed / sectionFields.length) * 100) : 0
    };
  };

  // Renderizar campo según tipo
  const renderField = (field: FormField) => {
    const commonProps = {
      field,
      error: errors[field.id]?.message as string,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
      case 'textarea':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormInput
                {...commonProps}
                value={formField.value}
                onChangeText={formField.onChange}
              />
            )}
          />
        );

      case 'date':
      case 'time':
      case 'datetime':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormInput
                {...commonProps}
                value={formField.value}
                onChangeText={formField.onChange}
                dateType={field.type}
              />
            )}
          />
        );

      case 'select':
      case 'radio':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormSelect
                {...commonProps}
                value={formField.value}
                onSelect={formField.onChange}
                options={field.options || []}
                multiple={false}
              />
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormCheckbox
                {...commonProps}
                value={formField.value}
                onChange={formField.onChange}
                options={field.options || []}
              />
            )}
          />
        );

      case 'boolean':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormCheckbox
                {...commonProps}
                value={formField.value ? ['true'] : []}
                onChange={(values) => formField.onChange(values.includes('true'))}
                options={['true']}
                singleToggle={true}
              />
            )}
          />
        );

      case 'image':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormImagePicker
                {...commonProps}
                value={formField.value}
                onChange={formField.onChange}
              />
            )}
          />
        );

      case 'signature':
        return (
          <Controller
            key={field.id}
            name={field.id}
            control={control}
            render={({ field: formField }) => (
              <FormSignature
                {...commonProps}
                value={formField.value}
                onChange={formField.onChange}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  // Manejar guardado
  const handleSave = (data: FormData) => {
    onSave(data);
    Alert.alert('Success', 'Form saved successfully!');
  };

  // Manejar exportación PDF
  const handleExportPDF = async () => {
    try {
      console.log('🚀 === INICIANDO EXPORTACIÓN PDF DESDE FORMULARIO ===');
      
      // 1. Obtener datos del formulario
      const data = getValues();
      console.log('📊 Datos del formulario obtenidos:', data);
      console.log('📋 Formulario ID:', form.id);
      console.log('📋 Formulario name:', form.name);
      
      // 2. Validar que hay datos
      const hasData = Object.values(data).some(value => 
        value !== undefined && value !== null && value !== '' && 
        (Array.isArray(value) ? value.length > 0 : true)
      );
      
      if (!hasData) {
        Alert.alert(
          'No Data', 
          'Please fill in some fields before exporting.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      console.log('✅ Datos validados, procediendo con exportación...');
      
      // 3. Mostrar indicador de carga
      Alert.alert(
        'Exporting PDF',
        'Generating your inspection report...',
        [{ text: 'OK' }]
      );
      
      // 4. Llamar al servicio de exportación
      console.log('📤 Llamando a onExportPDF...');
      const result = await onExportPDF(data);
      
      console.log('📋 Resultado de exportación:', result);
      
    } catch (error) {
      console.error('❌ Error en handleExportPDF:', error);
      Alert.alert(
        'Export Error',
        `Failed to export PDF: ${error.message}`,
        [{ text: 'OK' }]
      );
    }
  };

  // Navegación entre secciones
  const goToNextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const sectionStats = getCurrentSectionStats();
  const overallProgress = form.fields.length > 0 ? Math.round((completedFields / form.fields.length) * 100) : 0;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header compacto con más información */}
      <View style={styles.header}>
        {/* Información principal del formulario */}
        <View style={styles.formInfoRow}>
          <View style={styles.formTitleContainer}>
            <Text style={styles.formTitle}>{form.name}</Text>
            {form.description && (
              <Text style={styles.formDescription} numberOfLines={1}>
                {form.description}
              </Text>
            )}
          </View>
          
          {/* Progreso general */}
          <View style={styles.overallProgressContainer}>
            <Text style={styles.progressLabel}>Overall</Text>
            <Text style={styles.progressValue}>{overallProgress}%</Text>
            <Text style={styles.fieldsCount}>{completedFields}/{form.fields.length}</Text>
          </View>
        </View>

        {/* Información de la sección actual */}
        <View style={styles.sectionInfoRow}>
          <View style={styles.sectionDetails}>
            <Text style={styles.sectionTitle}>{currentSection}</Text>
            <Text style={styles.sectionProgress}>
              {sectionStats.completed}/{sectionStats.total} fields • {sectionStats.percentage}%
            </Text>
          </View>

          {/* Indicadores de estado */}
          <View style={styles.statusIndicators}>
            {isAutoSaving && (
              <View style={styles.autoSaveIndicator}>
                <Ionicons name="cloud-upload" size={14} color={COLORS.info} />
                <Text style={styles.autoSaveText}>Saving...</Text>
              </View>
            )}
            
            {form.estimatedTime && (
              <View style={styles.timeIndicator}>
                <Ionicons name="time" size={14} color={COLORS.textSecondary} />
                <Text style={styles.timeText}>~{form.estimatedTime}min</Text>
              </View>
            )}
          </View>
        </View>

        {/* Barra de progreso de la sección */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${sectionStats.percentage}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Tabs de secciones más compactos */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.sectionTabs}
        contentContainerStyle={styles.sectionTabsContent}
      >
        {sections.map((section, index) => {
          const sectionFields = form.fields.filter(f => (f.section || 'General') === section);
          const formValues = getValues();
          const sectionCompleted = sectionFields.filter(f => {
            const value = formValues[f.id];
            return value !== undefined && value !== null && value !== '' && 
                   (Array.isArray(value) ? value.length > 0 : true);
          }).length;
          const sectionTotal = sectionFields.length;
          const isCompleted = sectionCompleted === sectionTotal && sectionTotal > 0;
          
          return (
            <TouchableOpacity
              key={section}
              style={[
                styles.sectionTab,
                currentSection === section && styles.sectionTabActive
              ]}
              onPress={() => setCurrentSection(section)}
            >
              <View style={styles.sectionTabContent}>
                <Text 
                  style={[
                    styles.sectionTabText,
                    currentSection === section && styles.sectionTabTextActive
                  ]}
                  numberOfLines={1}
                >
                  {section}
                </Text>
                <View style={styles.sectionTabIndicators}>
                  {isCompleted && (
                    <Ionicons name="checkmark-circle" size={12} color={COLORS.success} />
                  )}
                  <Text style={styles.sectionTabCount}>
                    {sectionCompleted}/{sectionTotal}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Campos del formulario con más espacio */}
      <ScrollView 
        style={styles.formContainer}
        showsVerticalScrollIndicator={true}
      >
        {getCurrentSectionFields().map(renderField)}
        
        {/* Espaciado adicional al final para mejor scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Footer más compacto */}
      <View style={styles.footer}>
        {/* Navegación entre secciones */}
        <View style={styles.navigationRow}>
          <TouchableOpacity
            style={[
              styles.navButton,
              sections.indexOf(currentSection) === 0 && styles.navButtonDisabled
            ]}
            onPress={goToPreviousSection}
            disabled={sections.indexOf(currentSection) === 0}
          >
            <Ionicons name="chevron-back" size={18} color="white" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <View style={styles.sectionIndicator}>
            <Text style={styles.sectionIndicatorText}>
              {sections.indexOf(currentSection) + 1} of {sections.length}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.navButton,
              sections.indexOf(currentSection) === sections.length - 1 && styles.navButtonDisabled
            ]}
            onPress={goToNextSection}
            disabled={sections.indexOf(currentSection) === sections.length - 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(handleSave)}
          >
            <Ionicons name="save" size={18} color="white" />
            <Text style={styles.saveButtonText}>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportPDF}
          >
            <Ionicons name="document" size={18} color="white" />
            <Text style={styles.exportButtonText}>Export PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  formInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  formTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  formDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  overallProgressContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  progressLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  fieldsCount: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  sectionInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionDetails: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sectionProgress: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  autoSaveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  autoSaveText: {
    fontSize: 10,
    color: COLORS.info,
    fontWeight: '500',
  },
  timeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  sectionTabs: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    maxHeight: 60,
  },
  sectionTabsContent: {
    paddingHorizontal: 4,
  },
  sectionTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 6,
    minWidth: 80,
  },
  sectionTabActive: {
    backgroundColor: COLORS.primary + '10',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  sectionTabContent: {
    alignItems: 'center',
  },
  sectionTabText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTabTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  sectionTabIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  sectionTabCount: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomSpacing: {
    height: 20,
  },
  footer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 100,
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: COLORS.gray300,
  },
  navButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  sectionIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
  },
  sectionIndicatorText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.warning,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DynamicForm;
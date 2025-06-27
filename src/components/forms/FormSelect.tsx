// src/components/forms/FormSelect.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { FormField } from '../../types';

interface FormSelectProps {
  field: FormField;
  value: string | string[];
  onSelect: (value: string | string[]) => void;
  options: string[];
  multiple?: boolean;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  field,
  value,
  onSelect,
  options,
  multiple = false,
  error,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Convertir valor a array para manejo uniforme
  const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);

  // Manejar selección de opción
  const handleOptionPress = (option: string) => {
    if (multiple) {
      const currentValues = selectedValues;
      let newValues: string[];
      
      if (currentValues.includes(option)) {
        // Remover si ya está seleccionado
        newValues = currentValues.filter(v => v !== option);
      } else {
        // Agregar si no está seleccionado
        newValues = [...currentValues, option];
      }
      
      onSelect(newValues);
    } else {
      // Selección simple
      onSelect(option);
      setIsModalVisible(false);
    }
  };

  // Obtener texto para mostrar
  const getDisplayText = (): string => {
    if (selectedValues.length === 0) {
      return field.placeholder || 'Select an option';
    }
    
    if (multiple) {
      if (selectedValues.length === 1) {
        return selectedValues[0];
      }
      return `${selectedValues.length} options selected`;
    }
    
    return selectedValues[0] || '';
  };

  // Verificar si una opción está seleccionada
  const isOptionSelected = (option: string): boolean => {
    return selectedValues.includes(option);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>

      {/* Selector principal */}
      <TouchableOpacity
        style={[
          styles.selector,
          error && styles.selectorError,
        ]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text 
          style={[
            styles.selectorText,
            selectedValues.length === 0 && styles.placeholderText,
          ]}
        >
          {getDisplayText()}
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={COLORS.gray400} 
        />
      </TouchableOpacity>

      {/* Mostrar opciones seleccionadas (múltiple) */}
      {multiple && selectedValues.length > 0 && (
        <View style={styles.selectedOptionsContainer}>
          {selectedValues.map((selectedValue, index) => (
            <View key={index} style={styles.selectedOption}>
              <Text style={styles.selectedOptionText}>{selectedValue}</Text>
              <TouchableOpacity
                onPress={() => handleOptionPress(selectedValue)}
                style={styles.removeOption}
              >
                <Ionicons name="close" size={16} color={COLORS.gray600} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Error */}
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {/* Help text */}
      {field.helpText && !error && (
        <Text style={styles.helpText}>{field.helpText}</Text>
      )}

      {/* Modal con opciones */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header del modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {field.label}
                {multiple && ' (Multiple selection)'}
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={COLORS.gray600} />
              </TouchableOpacity>
            </View>

            {/* Lista de opciones */}
            <ScrollView style={styles.optionsList}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    isOptionSelected(option) && styles.optionSelected,
                  ]}
                  onPress={() => handleOptionPress(option)}
                >
                  <Text 
                    style={[
                      styles.optionText,
                      isOptionSelected(option) && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  
                  {isOptionSelected(option) && (
                    <Ionicons 
                      name="checkmark" 
                      size={20} 
                      color={COLORS.primary} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Footer del modal */}
            {multiple && (
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 48,
  },
  selectorError: {
    borderColor: COLORS.error,
  },
  selectorText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.gray400,
  },
  selectedOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOptionText: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 8,
  },
  removeOption: {
    padding: 2,
  },
  error: {
    fontSize: 14,
    color: COLORS.error,
    marginTop: 5,
  },
  helpText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
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
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  optionsList: {
    maxHeight: 400,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  optionSelected: {
    backgroundColor: COLORS.primary + '10',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FormSelect;
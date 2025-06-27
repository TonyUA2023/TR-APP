// src/components/forms/FormCheckbox.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { FormField } from '../../types';

interface FormCheckboxProps {
  field: FormField;
  value: string[];
  onChange: (values: string[]) => void;
  options: string[];
  error?: string;
  singleToggle?: boolean;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  field,
  value = [],
  onChange,
  options,
  error,
  singleToggle = false,
}) => {
  const handleToggle = (option: string) => {
    if (singleToggle) {
      // Para boolean fields
      onChange(value.includes(option) ? [] : [option]);
      return;
    }

    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    
    onChange(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>
      
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => handleToggle(option)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.checkbox,
            value.includes(option) && styles.checkboxSelected,
          ]}>
            {value.includes(option) && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          
          <Text style={styles.optionText}>
            {singleToggle ? field.label : option}
          </Text>
        </TouchableOpacity>
      ))}
      
      {error && <Text style={styles.error}>{error}</Text>}
      {field.helpText && !error && (
        <Text style={styles.helpText}>{field.helpText}</Text>
      )}
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
    marginBottom: 12,
  },
  required: {
    color: COLORS.error,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
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
});

export default FormCheckbox;
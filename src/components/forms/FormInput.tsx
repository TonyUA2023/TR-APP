// src/components/forms/FormInput.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { FormField } from '../../types';
import { COLORS } from '../../constants';

interface FormInputProps {
  field: FormField;
  value: any;
  onChangeText: (text: string) => void;
  error?: string;
  dateType?: 'date' | 'time' | 'datetime';
}

const FormInput: React.FC<FormInputProps> = ({
  field,
  value,
  onChangeText,
  error,
  dateType,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSecure, setIsSecure] = useState(field.type === 'password');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      let formattedDate = '';
      switch (dateType) {
        case 'date':
          formattedDate = format(selectedDate, 'yyyy-MM-dd');
          break;
        case 'time':
          formattedDate = format(selectedDate, 'HH:mm');
          break;
        case 'datetime':
          formattedDate = format(selectedDate, 'yyyy-MM-dd HH:mm');
          break;
        default:
          formattedDate = selectedDate.toISOString();
      }
      onChangeText(formattedDate);
    }
  };

  const getKeyboardType = () => {
    switch (field.type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const renderDateInput = () => (
    <TouchableOpacity
      style={[styles.input, error && styles.inputError]}
      onPress={() => setShowDatePicker(true)}
    >
      <Text style={[styles.dateText, !value && styles.placeholder]}>
        {value || field.placeholder || `Select ${dateType}`}
      </Text>
      <Ionicons name="calendar" size={20} color={COLORS.gray400} />
    </TouchableOpacity>
  );

  const renderTextInput = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          field.type === 'textarea' && styles.textArea,
          error && styles.inputError,
        ]}
        value={value || ''}
        onChangeText={onChangeText}
        placeholder={field.placeholder}
        placeholderTextColor={COLORS.gray400}
        keyboardType={getKeyboardType()}
        secureTextEntry={isSecure}
        multiline={field.type === 'textarea'}
        numberOfLines={field.type === 'textarea' ? 4 : 1}
        autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
        autoCorrect={field.type !== 'email'}
      />
      {field.type === 'password' && (
        <TouchableOpacity
          style={styles.secureToggle}
          onPress={() => setIsSecure(!isSecure)}
        >
          <Ionicons 
            name={isSecure ? 'eye-off' : 'eye'} 
            size={20} 
            color={COLORS.gray400} 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      {dateType ? renderDateInput() : renderTextInput()}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode={dateType === 'time' ? 'time' : 'date'}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

// src/components/forms/FormSelect.tsx

interface FormSelectProps {
  field: FormField;
  value: any;
  onSelect: (value: string) => void;
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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    if (!multiple) {
      setIsExpanded(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.selectButton, error && styles.inputError]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {value || field.placeholder || 'Select an option'}
        </Text>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={COLORS.gray400} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                value === option && styles.optionSelected,
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text style={[
                styles.optionText,
                value === option && styles.optionTextSelected,
              ]}>
                {option}
              </Text>
              {value === option && (
                <Ionicons name="checkmark" size={16} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// src/components/forms/FormCheckbox.tsx

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
    const newValue = [...value];
    const index = newValue.indexOf(option);
    
    if (singleToggle) {
      onChange(index >= 0 ? [] : [option]);
    } else {
      if (index >= 0) {
        newValue.splice(index, 1);
      } else {
        newValue.push(option);
      }
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        {options.map((option, index) => {
          const isChecked = value.includes(option);
          return (
            <TouchableOpacity
              key={index}
              style={styles.checkboxItem}
              onPress={() => handleToggle(option)}
            >
              <View style={[
                styles.checkbox,
                isChecked && styles.checkboxChecked,
              ]}>
                {isChecked && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                {singleToggle && option === 'true' ? field.label : option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// src/components/forms/FormImagePicker.tsx

interface FormImagePickerProps {
  field: FormField;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const [images, setImages] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const handleImagePick = async () => {
    // Por ahora placeholder - implementaremos la cámara después
    const mockImageUri = `mock_image_${Date.now()}.jpg`;
    const newImages = [...images, mockImageUri];
    setImages(newImages);
    onChange(field.type === 'image' && newImages.length === 1 ? newImages[0] : newImages);
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages.length === 1 ? newImages[0] : newImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.imagePickerButton, error && styles.inputError]}
        onPress={handleImagePick}
      >
        <Ionicons name="camera" size={24} color={COLORS.primary} />
        <Text style={styles.imagePickerText}>
          {images.length > 0 ? `${images.length} photo(s) selected` : 'Take Photo'}
        </Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imagePreview}>
              <Text style={styles.imageText}>{image}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleImageRemove(index)}
              >
                <Ionicons name="close" size={16} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// src/components/forms/FormSignature.tsx

interface FormSignatureProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const FormSignature: React.FC<FormSignatureProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const handleSignatureCapture = () => {
    // Por ahora placeholder - implementaremos la firma después
    const mockSignature = `signature_${Date.now()}.svg`;
    onChange(mockSignature);
  };

  const handleSignatureClear = () => {
    onChange('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      <View style={[styles.signatureContainer, error && styles.inputError]}>
        {value ? (
          <View style={styles.signaturePreview}>
            <Ionicons name="create" size={24} color={COLORS.success} />
            <Text style={styles.signatureText}>Signature captured</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleSignatureClear}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.signatureButton}
            onPress={handleSignatureCapture}
          >
            <Ionicons name="create" size={24} color={COLORS.primary} />
            <Text style={styles.signatureButtonText}>Add Signature</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  required: {
    color: COLORS.error,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: COLORS.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.error,
  },
  placeholder: {
    color: COLORS.gray400,
  },
  secureToggle: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  selectText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  optionsContainer: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: 'white',
    maxHeight: 200,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: `${COLORS.primary}10`,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkboxContainer: {
    gap: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    backgroundColor: `${COLORS.primary}05`,
  },
  imagePickerText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    marginTop: 10,
    gap: 8,
  },
  imagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray100,
    padding: 10,
    borderRadius: 6,
  },
  imageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  signatureContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 20,
    backgroundColor: 'white',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureButton: {
    alignItems: 'center',
  },
  signatureButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: '500',
  },
  signaturePreview: {
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 16,
    color: COLORS.success,
    marginTop: 8,
    fontWeight: '500',
  },
  clearButton: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.error,
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.error,
    marginLeft: 5,
  },
});

// Exportaciones
export { FormInput, FormSelect, FormCheckbox, FormImagePicker, FormSignature };
export default FormInput;
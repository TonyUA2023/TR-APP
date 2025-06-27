// src/components/forms/FormSignature.tsx

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

interface FormSignatureProps {
  field: FormField;
  value?: string;
  onChange: (signature: string) => void;
  error?: string;
}

const FormSignature: React.FC<FormSignatureProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const handleAddSignature = () => {
    // Implementar más tarde con react-native-signature-canvas
    console.log('Signature pad coming soon');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <TouchableOpacity style={styles.signaturePad} onPress={handleAddSignature}>
        <Ionicons name="create" size={32} color={COLORS.primary} />
        <Text style={styles.signatureText}>Add Signature</Text>
        <Text style={styles.signatureSubtext}>Coming Soon</Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 8 },
  required: { color: COLORS.error },
  signaturePad: { 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 8, 
    padding: 30, 
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center'
  },
  signatureText: { fontSize: 16, color: COLORS.primary, marginTop: 8 },
  signatureSubtext: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  error: { fontSize: 14, color: COLORS.error, marginTop: 5 },
});

export default FormSignature;
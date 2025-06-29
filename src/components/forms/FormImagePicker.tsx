// src/components/forms/FormImagePicker.tsx - VERSIÓN MEJORADA

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

import { FormField } from '../../types';
import { COLORS } from '../../constants';

interface FormImagePickerProps {
  field: FormField;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
  multiple?: boolean;
  formType?: string;
  fieldCategory?: 'main' | 'detail' | 'process' | 'compact';
}

interface ProcessedImage {
  uri: string;
  width: number;
  height: number;
  size: number;
  isValid: boolean;
  error?: string;
  processedForPDF: boolean;
}

interface ImageProcessingConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  category: string;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({
  field,
  value,
  onChange,
  error,
  multiple = false,
  formType = 'general',
  fieldCategory = 'detail',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>('');

  // Convertir value a array para manejo uniforme
  const images = Array.isArray(value) ? value : value ? [value] : [];

  useEffect(() => {
    requestPermissions();
  }, []);

  /**
   * Obtener configuración de procesamiento según el tipo de campo
   */
  const getProcessingConfig = (): ImageProcessingConfig => {
    const configs: Record<string, ImageProcessingConfig> = {
      main: {
        maxWidth: 1200,
        maxHeight: 900,
        quality: 0.9,
        category: 'Main Photo (High Quality)'
      },
      detail: {
        maxWidth: 1000,
        maxHeight: 750,
        quality: 0.8,
        category: 'Detail Photo (Standard Quality)'
      },
      process: {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.7,
        category: 'Process Photo (Medium Quality)'
      },
      compact: {
        maxWidth: 600,
        maxHeight: 450,
        quality: 0.6,
        category: 'Compact Photo (Optimized Size)'
      }
    };

    return configs[fieldCategory] || configs.detail;
  };

  /**
   * Solicitar permisos de cámara y galería
   */
  const requestPermissions = async () => {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraPermission.status !== 'granted' || mediaLibraryPermission.status !== 'granted') {
        console.log('Permissions not fully granted');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  /**
   * Crear directorio específico para imágenes de la app
   */
  const createAppImageDirectory = async (): Promise<string> => {
    const appImageDir = `${FileSystem.documentDirectory}inspection_images/`;
    
    try {
      const dirInfo = await FileSystem.getInfoAsync(appImageDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(appImageDir, { intermediates: true });
        console.log('📁 Created app image directory:', appImageDir);
      }
    } catch (error) {
      console.error('Error creating directory:', error);
    }
    
    return appImageDir;
  };

  /**
   * MEJORADO: Procesar y optimizar imagen con mejor compatibilidad
   */
  const processImage = async (uri: string, fieldId: string): Promise<ProcessedImage> => {
    try {
      const config = getProcessingConfig();
      console.log('🖼️ Processing image for field:', fieldId);
      console.log('⚙️ Using config:', config);
      
      setProcessingStatus(`Optimizing ${config.category.toLowerCase()}...`);
      
      // 1. Verificar imagen original
      const originalInfo = await FileSystem.getInfoAsync(uri);
      if (!originalInfo.exists || !originalInfo.size || originalInfo.size === 0) {
        throw new Error('Original image file is invalid or empty');
      }
      
      console.log('📊 Original file size:', originalInfo.size);
      
      // 2. Calcular dimensiones de redimensionado
      setProcessingStatus('Calculating optimal dimensions...');
      
      // IMPORTANTE: Usar manipulación sin base64 para mejor compatibilidad
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [], // Sin manipulaciones para obtener info
        { 
          compress: 1.0,
          format: ImageManipulator.SaveFormat.JPEG 
        }
      );
      
      const originalWidth = manipResult.width;
      const originalHeight = manipResult.height;
      const aspectRatio = originalWidth / originalHeight;
      
      console.log('📐 Original dimensions:', `${originalWidth}x${originalHeight}`);
      
      // Calcular nuevas dimensiones
      let newWidth = originalWidth;
      let newHeight = originalHeight;
      
      if (originalWidth > config.maxWidth) {
        newWidth = config.maxWidth;
        newHeight = newWidth / aspectRatio;
      }
      
      if (newHeight > config.maxHeight) {
        newHeight = config.maxHeight;
        newWidth = newHeight * aspectRatio;
      }
      
      newWidth = Math.round(newWidth);
      newHeight = Math.round(newHeight);
      
      console.log('🎯 Target dimensions:', `${newWidth}x${newHeight}`);
      
      // 3. Procesar imagen con configuración optimizada
      setProcessingStatus(`Processing ${config.category.toLowerCase()}...`);
      
      const manipulationActions = [];
      
      if (newWidth !== originalWidth || newHeight !== originalHeight) {
        manipulationActions.push({ resize: { width: newWidth, height: newHeight } });
      }
      
      const processedImage = await ImageManipulator.manipulateAsync(
        uri,
        manipulationActions,
        {
          compress: config.quality,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: false, // IMPORTANTE: No usar base64 aquí
        }
      );
      
      // 4. Guardar imagen procesada en directorio persistente
      setProcessingStatus('Saving optimized image...');
      const appImageDir = await createAppImageDirectory();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 9);
      const fileName = `${fieldId}_${formType}_${timestamp}_${randomId}.jpg`;
      const finalUri = `${appImageDir}${fileName}`;
      
      // IMPORTANTE: Usar moveAsync en lugar de copyAsync para mejor compatibilidad
      try {
        await FileSystem.moveAsync({
          from: processedImage.uri,
          to: finalUri,
        });
      } catch (moveError) {
        // Si moveAsync falla, intentar con copyAsync
        console.log('Move failed, trying copy...', moveError);
        await FileSystem.copyAsync({
          from: processedImage.uri,
          to: finalUri,
        });
        
        // Limpiar archivo temporal
        try {
          await FileSystem.deleteAsync(processedImage.uri, { idempotent: true });
        } catch (deleteError) {
          console.log('Could not delete temp file:', deleteError);
        }
      }
      
      // 5. Verificar archivo guardado
      const finalInfo = await FileSystem.getInfoAsync(finalUri);
      if (!finalInfo.exists || !finalInfo.size || finalInfo.size < 1000) {
        throw new Error('Failed to save processed image properly');
      }
      
      console.log('✅ Image saved successfully:', {
        uri: finalUri,
        size: finalInfo.size,
        dimensions: `${newWidth}x${newHeight}`
      });
      
      return {
        uri: finalUri,
        width: newWidth,
        height: newHeight,
        size: finalInfo.size || 0,
        isValid: true,
        processedForPDF: true,
      };
      
    } catch (error) {
      console.error('❌ Error processing image:', error);
      return {
        uri: '',
        width: 0,
        height: 0,
        size: 0,
        isValid: false,
        processedForPDF: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };

  /**
   * Validar imagen antes de procesar
   */
  const validateImageUri = async (uri: string): Promise<{ isValid: boolean; error?: string }> => {
    try {
      if (!uri || typeof uri !== 'string' || uri.trim().length === 0) {
        return { isValid: false, error: 'Empty URI' };
      }
      
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        return { isValid: false, error: 'File does not exist' };
      }
      
      if (!fileInfo.size || fileInfo.size === 0) {
        return { isValid: false, error: 'File is empty' };
      }
      
      if (fileInfo.size < 100) {
        return { isValid: false, error: 'File too small (likely corrupted)' };
      }
      
      if (fileInfo.size > 50 * 1024 * 1024) {
        return { isValid: false, error: 'File too large (max 50MB)' };
      }
      
      return { isValid: true };
      
    } catch (error) {
      return { 
        isValid: false, 
        error: `Validation error: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  };

  /**
   * Mostrar opciones de imagen
   */
  const showImageOptions = () => {
    const config = getProcessingConfig();
    
    Alert.alert(
      'Add Photo',
      `Select image source for: ${config.category}\n\nImages will be automatically optimized for PDF export.`,
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  /**
   * Tomar foto con la cámara
   */
  const takePhoto = async () => {
    try {
      setIsLoading(true);
      setProcessingStatus('Opening camera...');

      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== 'granted') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Camera permission is required to take photos.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // IMPORTANTE: Desactivar edición para evitar problemas
        quality: 1.0,
        base64: false,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        await handleImageSelected(imageUri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsLoading(false);
      setProcessingStatus('');
    }
  };

  /**
   * Seleccionar imagen de la galería
   */
  const pickFromGallery = async () => {
    try {
      setIsLoading(true);
      setProcessingStatus('Opening gallery...');

      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Gallery permission is required to select photos.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // IMPORTANTE: Desactivar edición
        quality: 1.0,
        base64: false,
        exif: false,
        allowsMultipleSelection: multiple && images.length === 0,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        if (multiple && result.assets.length > 1) {
          for (const asset of result.assets) {
            await handleImageSelected(asset.uri);
          }
        } else {
          await handleImageSelected(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Error picking from gallery:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    } finally {
      setIsLoading(false);
      setProcessingStatus('');
    }
  };

  /**
   * Manejar imagen seleccionada
   */
  const handleImageSelected = async (rawImageUri: string) => {
    try {
      const config = getProcessingConfig();
      console.log('📸 Processing new image for field:', field.id);
      
      // 1. Validar imagen
      setProcessingStatus('Validating image...');
      const validation = await validateImageUri(rawImageUri);
      if (!validation.isValid) {
        throw new Error(`Image validation failed: ${validation.error}`);
      }
      
      // 2. Procesar imagen
      const processed = await processImage(rawImageUri, field.id);
      if (!processed.isValid) {
        throw new Error(`Image processing failed: ${processed.error}`);
      }
      
      console.log('✅ Image processed successfully:', processed.uri);
      
      // 3. Actualizar estado
      if (multiple) {
        const updatedImages = [...images, processed.uri];
        onChange(updatedImages);
      } else {
        onChange(processed.uri);
      }
      
      // 4. Mostrar confirmación
      const sizeKB = Math.round((processed.size) / 1024);
      Alert.alert(
        'Photo Added Successfully',
        `📷 ${config.category}\n🗂️ Size: ${sizeKB}KB\n📐 Dimensions: ${processed.width}×${processed.height}`,
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      console.error('❌ Error handling selected image:', error);
      Alert.alert(
        'Image Processing Error',
        `Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again.`,
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Eliminar imagen
   */
  const removeImage = (index: number) => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const imageToRemove = images[index];
              
              // Intentar eliminar archivo
              if (imageToRemove && imageToRemove.includes('inspection_images/')) {
                try {
                  await FileSystem.deleteAsync(imageToRemove, { idempotent: true });
                  console.log('🗑️ Deleted image file:', imageToRemove);
                } catch (deleteError) {
                  console.log('⚠️ Could not delete image file:', deleteError);
                }
              }
              
              // Actualizar estado
              if (multiple) {
                const updatedImages = images.filter((_, i) => i !== index);
                onChange(updatedImages.length > 0 ? updatedImages : []);
              } else {
                onChange('');
              }
            } catch (error) {
              console.error('Error removing image:', error);
            }
          },
        },
      ]
    );
  };

  /**
   * Ver imagen en modal
   */
  const viewImage = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  /**
   * Renderizar miniatura
   */
  const renderImageThumbnail = (imageUri: string, index: number) => {
    const config = getProcessingConfig();
    const isProcessed = imageUri.includes('inspection_images/');
    
    return (
      <View key={`${imageUri}-${index}`} style={styles.imageContainer}>
        <TouchableOpacity onPress={() => viewImage(index)} activeOpacity={0.8}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.thumbnail}
            resizeMode="cover"
          />
          
          {/* Indicador de categoría */}
          <View style={[styles.categoryIndicator, getCategoryStyle(fieldCategory)]}>
            <Text style={styles.categoryText}>
              {fieldCategory.charAt(0).toUpperCase()}
            </Text>
          </View>
          
          {/* Indicador de procesado */}
          {isProcessed && (
            <View style={styles.processedIndicator}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeImage(index)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-circle" size={24} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Obtener estilo según la categoría
   */
  const getCategoryStyle = (category: string) => {
    const styles = {
      main: { backgroundColor: COLORS.primary },
      detail: { backgroundColor: COLORS.success },
      process: { backgroundColor: COLORS.warning },
      compact: { backgroundColor: COLORS.info },
    };
    return styles[category as keyof typeof styles] || styles.detail;
  };

  const config = getProcessingConfig();

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>

      {/* Indicador de categoría */}
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryBadge, getCategoryStyle(fieldCategory)]}>
          <Text style={styles.categoryBadgeText}>{config.category}</Text>
        </View>
      </View>

      {/* Descripción */}
      {field.description && (
        <Text style={styles.description}>{field.description}</Text>
      )}

      {/* Área de imágenes */}
      <View style={styles.imagesArea}>
        {/* Imágenes existentes */}
        {images.map((imageUri, index) => renderImageThumbnail(imageUri, index))}

        {/* Botón para agregar imagen */}
        {(!images.length || (multiple && images.length < (typeof field.maxImages === 'number' ? field.maxImages : 10))) && (
          <TouchableOpacity
            style={[styles.addButton, isLoading && styles.addButtonDisabled]}
            onPress={showImageOptions}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                {processingStatus && (
                  <Text style={styles.processingText}>{processingStatus}</Text>
                )}
              </View>
            ) : (
              <>
                <Ionicons name="camera" size={32} color={COLORS.primary} />
                <Text style={styles.addButtonText}>
                  {images.length > 0 ? 'Add Photo' : 'Take/Select Photo'}
                </Text>
                <Text style={styles.addButtonSubtext}>
                  {config.category}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Contador de imágenes */}
      {multiple && field.maxImages && images.length > 0 && (
        <Text style={styles.imageCount}>
          {images.length} / {field.maxImages} images
        </Text>
      )}

      {/* Información de procesamiento */}
      {images.length > 0 && (
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle" size={14} color={COLORS.info} />
          <Text style={styles.infoText}>
            Images optimized as {config.category.toLowerCase()} (max {config.maxWidth}×{config.maxHeight}px, {Math.round(config.quality * 100)}% quality)
          </Text>
        </View>
      )}

      {/* Error */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Modal para ver imagen completa */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {selectedImageIndex !== null && images[selectedImageIndex] && (
                <Image
                  source={{ uri: images[selectedImageIndex] }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              )}
              
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-circle" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
  categoryHeader: {
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  imagesArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },
  categoryIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  processedIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 2,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  processingText: {
    fontSize: 10,
    color: COLORS.primary,
    marginTop: 4,
    textAlign: 'center',
  },
  addButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  addButtonSubtext: {
    fontSize: 9,
    color: COLORS.primary,
    marginTop: 2,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imageCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 4,
  },
  infoText: {
    fontSize: 10,
    color: COLORS.info,
    fontStyle: 'italic',
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
  closeModalButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
  },
});

export default FormImagePicker;
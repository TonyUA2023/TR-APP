// src/screens/forms/FormsList.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, InspectionForm } from '../../types';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { getFormsByCategory, getCategoryInfo } from '../../data/forms';

type FormsListRouteProp = RouteProp<RootStackParamList, 'FormsList'>;
type FormsListNavProp = StackNavigationProp<RootStackParamList, 'FormsList'>;

const FormsListScreen: React.FC = () => {
  const route = useRoute<FormsListRouteProp>();
  const navigation = useNavigation<FormsListNavProp>();
  const { categoryId } = route.params;

  // Get forms from the centralized forms registry
  const forms = getFormsByCategory(categoryId);
  const categoryInfo = getCategoryInfo(categoryId);

  // Helper function to get category display info
  const getCategoryDisplayInfo = (category: string) => {
    switch (category) {
      case 'structures':
        return {
          title: 'Structural Inspections',
          icon: 'construct' as const,
          color: COLORS.primary,
        };
      case 'subgrade':
        return {
          title: 'Subgrade Inspections',
          icon: 'layers' as const,
          color: '#8B4513',
        };
      case 'firesuppression':
        return {
          title: 'Fire Suppression Inspections',
          icon: 'flash' as const,
          color: '#FFD700',
        };
      case 'masonry':
        return {
          title: 'Masonry Inspections',
          icon: 'settings' as const,
          color: '#708090',
        };
      case 'energy':
        return {
          title: 'Enery Inspections',
          icon: 'water' as const,
          color: '#4682B4',
        };
      default:
        return {
          title: categoryInfo.name + ' Inspections',
          icon: 'document-text' as const,
          color: COLORS.primary,
        };
    }
  };

  const categoryDisplay = getCategoryDisplayInfo(categoryId);

  const handlePress = (form: InspectionForm) => {
    navigation.navigate('FormScreen', {
      formId: form.id,
      recordId: undefined,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderBottomColor: categoryDisplay.color + '30' }]}>
        <View style={styles.headerContent}>
          <Ionicons name={categoryDisplay.icon} size={32} color={categoryDisplay.color} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{categoryDisplay.title}</Text>
            <Text style={styles.subtitle}>
              {forms.length} form{forms.length !== 1 ? 's' : ''} available
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={forms}
        keyExtractor={f => f.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.formCard, { borderLeftColor: categoryDisplay.color }]}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.formHeader}>
              <View style={[styles.iconContainer, { backgroundColor: categoryDisplay.color + '15' }]}>
                <Ionicons name="document-text" size={24} color={categoryDisplay.color} />
              </View>
              <View style={styles.formInfo}>
                <Text style={styles.formName}>{item.name}</Text>
                <Text style={styles.formDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.formMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
                    <Text style={styles.estimatedTime}>{item.estimatedTime} min</Text>
                  </View>
                  <Text style={[styles.templateBadge, { 
                    backgroundColor: categoryDisplay.color + '20', 
                    color: categoryDisplay.color 
                  }]}>
                    {item.pdfTemplate}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={[styles.emptyIconContainer, { backgroundColor: categoryDisplay.color + '15' }]}>
              <Ionicons name={categoryDisplay.icon} size={48} color={categoryDisplay.color} />
            </View>
            <Text style={styles.emptyText}>No forms available yet</Text>
            <Text style={styles.emptySubtext}>
              {categoryId === 'subgrade' 
                ? 'Subgrade inspection forms are coming soon'
                : `Forms for ${categoryDisplay.title.toLowerCase()} are coming soon`
              }
            </Text>
          </View>
        }
      />
    </View>
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
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  formCard: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInfo: {
    flex: 1,
    marginLeft: 12,
  },
  formName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  formDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  formMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estimatedTime: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  templateBadge: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default FormsListScreen;
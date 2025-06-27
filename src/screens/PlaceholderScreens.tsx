// src/screens/PlaceholderScreens.tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../constants';
import { pileInspectionByPagesForm } from '../data/forms/structures/pileInspectionByPagesForm';
import { underpinningInspectionByPagesForm } from '../data/forms/structures/underpinningInspectionByPagesForm';
import { elevatorPitInspectionForm } from '../data/forms/structures/elevatorPitInspectionForm';
import { matSlabInspectionForm } from '../data/forms/structures/matSlabInspectionForm';
import { RootStackParamList } from '../types';
import { wallStripInspectionForm } from '../data/forms/structures/wallStripInspectionForm';
import { gradeBeamInspectionForm } from '../data/forms/structures/gradeBeamInspectionForm';
import { foundationWallInspectionByPagesForm } from '../data/forms/structures/foundationWallInspectionByPagesForm';
import { shearWallInspectionByPagesForm } from '../data/forms/structures/shearWallInspectionByPagesForm';
import { columnsInspectionByPagesForm } from '../data/forms/structures/columnsInspectionByPagesForm';
import { beamsInspectionByPagesForm } from '../data/forms/structures/beamsInspectionByPagesForm';
import { steelInspectionByPagesForm } from '../data/forms/structures/steelInspectionByPagesForm';
import { cfsInspectionByPagesForm } from '../data/forms/structures/cfsInspectionByPagesForm';
// Import subgrade forms when available
import { subgradeInspectionForm } from '../data/forms/subgrade/subgradeInspectionForm';

import { sprinklerInspectionForm } from '../data/forms/fire-suppression/sprinklerInspectionForm';
// Import masonry forms when available
import { cmuInspectionForm } from '../data/forms/masonry/cmuInspectionForm';

// Import energy forms when available
import { hvacMechanicalInteriorByPagesForm } from '../data/forms/energy/hvacMechanicalInteriorByPagesForm';
import { hvacMechanicalOutdoorsByPagesForm } from '../data/forms/energy/hvacMechanicalOutdoorsByPages';
import { hvacMechanicalOutdoors34ByPagesForm } from '../data/forms/energy/hvacMechanicalOutdoors34ByPagesForm';
import { hvacDuctsByPagesForm } from '../data/forms/energy/hvacDuctsByPagesForm';
type NavigationProp = StackNavigationProp<RootStackParamList>;

// ===== FORMS LIST SCREEN =====
export const FormsListScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'FormsList'>>();
  const navigation = useNavigation<NavigationProp>();
  const { categoryId } = route.params;

  // Helper function to get category display info
  const getCategoryInfo = (category: string) => {
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
          color: '#8B4513', // Brown color for earth/soil
        };
      case 'electrical':
        return {
          title: 'Electrical Inspections',
          icon: 'flash' as const,
          color: '#FFD700',
        };
      case 'mechanical':
        return {
          title: 'Mechanical Inspections',
          icon: 'settings' as const,
          color: '#708090',
        };
      case 'enery':
        return {
          title: 'Energy Inspections',
          icon: 'water' as const,
          color: '#4682B4',
        };
      default:
        return {
          title: 'Inspections',
          icon: 'document-text' as const,
          color: COLORS.primary,
        };
    }
  };

  const categoryInfo = getCategoryInfo(categoryId);

  const forms = categoryId === 'structures'
    ? [
        pileInspectionByPagesForm, 
        underpinningInspectionByPagesForm, 
        elevatorPitInspectionForm, 
        matSlabInspectionForm, 
        wallStripInspectionForm, 
        gradeBeamInspectionForm, 
        foundationWallInspectionByPagesForm, 
        shearWallInspectionByPagesForm,
        columnsInspectionByPagesForm,
        beamsInspectionByPagesForm,
        steelInspectionByPagesForm,
        cfsInspectionByPagesForm
      ]
    : categoryId === 'subgrade'
    ? [
        subgradeInspectionForm
      ]
    : categoryId === 'fire-suppression' 
    ? [
        sprinklerInspectionForm
      ]
    : categoryId === 'masonry' 
    ? [
        cmuInspectionForm
      ]
    : categoryId === 'energy'
    ? [
      hvacMechanicalInteriorByPagesForm,
      hvacMechanicalOutdoorsByPagesForm,
      hvacMechanicalOutdoors34ByPagesForm,
      hvacDuctsByPagesForm
      ]:[]

  const handleFormPress = (formId: string) => {
    navigation.navigate('FormScreen', { formId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { borderBottomColor: categoryInfo.color + '30' }]}>
        <View style={styles.headerContent}>
          <Ionicons name={categoryInfo.icon} size={32} color={categoryInfo.color} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{categoryInfo.title}</Text>
            <Text style={styles.subtitle}>
              {forms.length} form{forms.length !== 1 ? 's' : ''} available
            </Text>
          </View>
        </View>
      </View>
      
      {forms.map((form) => (
        <TouchableOpacity
          key={form.id}
          style={[styles.formCard, { borderLeftColor: categoryInfo.color }]}
          onPress={() => handleFormPress(form.id)}
        >
          <View style={styles.formHeader}>
            <View style={[styles.iconContainer, { backgroundColor: categoryInfo.color + '15' }]}>
              <Ionicons name="document-text" size={24} color={categoryInfo.color} />
            </View>
            <View style={styles.formInfo}>
              <Text style={styles.formName}>{form.name}</Text>
              <Text style={styles.formDescription}>{form.description}</Text>
              <View style={styles.formMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
                  <Text style={styles.estimatedTime}>{form.estimatedTime} min</Text>
                </View>
                <Text style={[styles.templateBadge, { backgroundColor: categoryInfo.color + '20', color: categoryInfo.color }]}>
                  {form.pdfTemplate}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
          </View>
        </TouchableOpacity>
      ))}

      {forms.length === 0 && (
        <View style={styles.emptyState}>
          <View style={[styles.emptyIconContainer, { backgroundColor: categoryInfo.color + '15' }]}>
            <Ionicons name={categoryInfo.icon} size={48} color={categoryInfo.color} />
          </View>
          <Text style={styles.emptyText}>No forms available yet</Text>
          <Text style={styles.emptySubtext}>
            {categoryId === 'subgrade' 
              ? 'Subgrade inspection forms are coming soon'
              : `Forms for ${categoryInfo.title.toLowerCase()} are coming soon`
            }
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// ===== FORM SCREEN =====
export const FormScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'FormScreen'>>();
  const navigation = useNavigation<NavigationProp>();
  const { formId, recordId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Ionicons name="construct" size={64} color={COLORS.primary} />
        <Text style={styles.comingSoon}>Form Builder Coming Soon</Text>
        <Text style={styles.formId}>Form ID: {formId}</Text>
        {recordId && <Text style={styles.recordId}>Record ID: {recordId}</Text>}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ===== DOCUMENT LIBRARY SCREEN =====
export const DocumentLibraryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Ionicons name="folder-open" size={64} color={COLORS.primary} />
        <Text style={styles.comingSoon}>Document Library</Text>
        <Text style={styles.subtitle}>Your exported PDFs will appear here</Text>
      </View>
    </View>
  );
};

// ===== CAMERA SCREEN =====
export const CameraScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Ionicons name="camera" size={64} color={COLORS.primary} />
        <Text style={styles.comingSoon}>Camera Integration</Text>
        <Text style={styles.subtitle}>Take photos for your inspections</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  comingSoon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  formId: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  recordId: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
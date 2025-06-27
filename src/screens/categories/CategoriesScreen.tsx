// src/screens/categories/CategoriesScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { COLORS, APP_TEXTS, INSPECTION_CATEGORIES } from '../../constants';
import { InspectionCategory, RootStackParamList } from '../../types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCategoryPress = (category: InspectionCategory) => {
    navigation.navigate('FormsList', { categoryId: category.id });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{APP_TEXTS.categories.title}</Text>
        <Text style={styles.subtitle}>{APP_TEXTS.categories.selectCategory}</Text>
      </View>

      {/* Grid de categorías */}
      <View style={styles.grid}>
        {INSPECTION_CATEGORIES.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={() => handleCategoryPress(category)}
            index={index}
          />
        ))}
      </View>

      {/* Estadísticas por categoría */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Usage Statistics</Text>
        {INSPECTION_CATEGORIES.map((category) => (
          <View key={category.id} style={styles.statRow}>
            <View style={styles.statInfo}>
              <Ionicons name={category.icon as any} size={20} color={category.color} />
              <Text style={styles.statLabel}>{category.name}</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statCount}>
                {Math.floor(Math.random() * 20) + 1} {/* Datos de ejemplo */}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Componente de tarjeta de categoría
const CategoryCard: React.FC<{
  category: InspectionCategory;
  onPress: () => void;
  index: number;
}> = ({ category, onPress, index }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { 
          backgroundColor: `${category.color}15`,
          borderColor: `${category.color}30`,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icono de la categoría */}
      <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
        <Ionicons 
          name={category.icon as any} 
          size={32} 
          color={category.color} 
        />
      </View>

      {/* Información de la categoría */}
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryDescription} numberOfLines={2}>
          {category.description}
        </Text>
      </View>

      {/* Indicador de número de formularios */}
      <View style={styles.formsIndicator}>
        <Text style={styles.formsCount}>
          {category.forms?.length || 0} forms
        </Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.gray400} />
      </View>

      {/* Decoración */}
      <View style={[styles.cardDecoration, { backgroundColor: category.color }]} />
    </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  },
  grid: {
    padding: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryInfo: {
    marginBottom: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  formsIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formsCount: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  cardDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4,
    height: '100%',
  },
  statsSection: {
    margin: 20,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 12,
  },
  statBadge: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default CategoriesScreen;
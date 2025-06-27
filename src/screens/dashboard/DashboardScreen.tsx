// src/screens/dashboard/DashboardScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types'; // Adjust path as needed
import { format } from 'date-fns';

import { COLORS, APP_TEXTS, INSPECTION_CATEGORIES } from '../../constants';
import { DashboardStats, InspectionRecord } from '../../types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Adjust 60 for padding/margin as needed
const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalInspections: 0,
    completedToday: 0,
    completedThisWeek: 0,
    averageTime: 0,
    mostUsedForms: [],
  });
  const [recentInspections, setRecentInspections] = useState<InspectionRecord[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Aquí cargaremos los datos del storage local
    // Por ahora usamos datos de ejemplo
    setStats({
      totalInspections: 45,
      completedToday: 3,
      completedThisWeek: 12,
      averageTime: 18,
      mostUsedForms: [
        { formId: 'pile-inspection', formName: 'Pile Inspection', count: 8 },
        { formId: 'foundation-inspection', formName: 'Foundation Inspection', count: 6 },
        { formId: 'steel-inspection', formName: 'Steel Inspection', count: 4 },
      ],
    });

    // Datos de ejemplo para inspecciones recientes
    setRecentInspections([
      {
        id: '1',
        formId: 'pile-inspection',
        categoryId: 'structures',
        title: 'Pile P-001 Inspection',
        data: {},
        photos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'completed',
      },
      {
        id: '2',
        formId: 'pile-inspection',
        categoryId: 'structures',
        title: 'Pile P-002 Inspection',
        data: {},
        photos: [],
        createdAt: new Date(Date.now() - 3600000), // 1 hora atrás
        updatedAt: new Date(Date.now() - 3600000),
        status: 'draft',
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const navigateToCategory = (categoryId: string) => {
    navigation.navigate('FormsList', { categoryId });
  };

  const navigateToForm = (formId: string, recordId?: string) => {
    navigation.navigate('FormScreen', { formId, recordId });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header de bienvenida */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.date}>{format(new Date(), 'EEEE, MMMM d')}</Text>
      </View>

      {/* Estadísticas del día */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          <StatsCard
            icon="checkmark-circle"
            value={stats.completedToday.toString()}
            label="Completed Today"
            color={COLORS.success}
          />
          <StatsCard
            icon="time"
            value={`${stats.averageTime}m`}
            label="Avg. Time"
            color={COLORS.info}
          />
          <StatsCard
            icon="document-text"
            value={stats.totalInspections.toString()}
            label="Total Inspections"
            color={COLORS.primary}
          />
          <StatsCard
            icon="trending-up"
            value={stats.completedThisWeek.toString()}
            label="This Week"
            color={COLORS.warning}
          />
        </View>
      </View>

      {/* Acceso rápido a categorías */}
      <View style={styles.quickAccessContainer}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {INSPECTION_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { borderLeftColor: category.color }]}
              onPress={() => navigateToCategory(category.id)}
            >
              <Ionicons name={category.icon as any} size={24} color={category.color} />
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription} numberOfLines={2}>
                {category.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Inspecciones recientes */}
      <View style={styles.recentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Inspections</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Documents')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        
        {recentInspections.length > 0 ? (
          recentInspections.map((inspection) => (
            <TouchableOpacity
              key={inspection.id}
              style={styles.inspectionCard}
              onPress={() => navigateToForm(inspection.formId, inspection.id)}
            >
              <View style={styles.inspectionHeader}>
                <Text style={styles.inspectionTitle}>{inspection.title}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(inspection.status) }
                ]}>
                  <Text style={styles.statusText}>
                    {inspection.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.inspectionTime}>
                {format(inspection.updatedAt, 'MMM d, h:mm a')}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color={COLORS.gray300} />
            <Text style={styles.emptyText}>{APP_TEXTS.dashboard.noInspections}</Text>
            <Text style={styles.emptySubtext}>{APP_TEXTS.dashboard.startFirst}</Text>
          </View>
        )}
      </View>

      {/* Botón de acción flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Categories')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

// Componente de tarjeta de estadísticas
const StatsCard: React.FC<{
  icon: string;
  value: string;
  label: string;
  color: string;
}> = ({ icon, value, label, color }) => (
  <View style={[styles.statsCard, { borderTopColor: color }]}>
    <Ionicons name={icon as any} size={20} color={color} />
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsLabel}>{label}</Text>
  </View>
);

// Función para obtener el color del estado
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return COLORS.success;
    case 'draft':
      return COLORS.warning;
    case 'exported':
      return COLORS.info;
    default:
      return COLORS.gray400;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: cardWidth,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  statsLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  quickAccessContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryCard: {
    width: 140,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 14,
  },
  recentContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  inspectionCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inspectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  inspectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  inspectionTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default DashboardScreen;
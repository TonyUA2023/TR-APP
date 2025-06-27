// src/services/storageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { InspectionRecord, DashboardStats, FormData, AppConfig } from '../types';
import { STORAGE_KEYS, DEFAULT_CONFIG } from '../constants';

class StorageService {

  /**
   * Guardar registro de inspección
   */
  async saveInspectionRecord(record: InspectionRecord): Promise<void> {
    try {
      const existingRecords = await this.getAllInspectionRecords();
      const updatedRecords = existingRecords.filter(r => r.id !== record.id);
      updatedRecords.push(record);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.inspections, 
        JSON.stringify(updatedRecords)
      );
      
      console.log('Inspection record saved:', record.id);
    } catch (error) {
      console.error('Error saving inspection record:', error);
      throw error;
    }
  }

  /**
   * Obtener registro de inspección por ID
   */
  async getInspectionRecord(id: string): Promise<InspectionRecord | null> {
    try {
      const records = await this.getAllInspectionRecords();
      const record = records.find(r => r.id === id);
      
      if (record) {
        // Convertir fechas de string a Date
        return {
          ...record,
          createdAt: new Date(record.createdAt),
          updatedAt: new Date(record.updatedAt),
          completedAt: record.completedAt ? new Date(record.completedAt) : undefined,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting inspection record:', error);
      return null;
    }
  }

  /**
   * Obtener todos los registros de inspección
   */
  async getAllInspectionRecords(): Promise<InspectionRecord[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.inspections);
      if (!data) return [];
      
      const records = JSON.parse(data) as InspectionRecord[];
      
      // Convertir fechas de string a Date
      return records.map(record => ({
        ...record,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        completedAt: record.completedAt ? new Date(record.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error getting all inspection records:', error);
      return [];
    }
  }

  /**
   * Obtener registros por categoría
   */
  async getInspectionRecordsByCategory(categoryId: string): Promise<InspectionRecord[]> {
    try {
      const allRecords = await this.getAllInspectionRecords();
      return allRecords.filter(record => record.categoryId === categoryId);
    } catch (error) {
      console.error('Error getting records by category:', error);
      return [];
    }
  }

  /**
   * Obtener registros por formulario
   */
  async getInspectionRecordsByForm(formId: string): Promise<InspectionRecord[]> {
    try {
      const allRecords = await this.getAllInspectionRecords();
      return allRecords.filter(record => record.formId === formId);
    } catch (error) {
      console.error('Error getting records by form:', error);
      return [];
    }
  }

  /**
   * Eliminar registro de inspección
   */
  async deleteInspectionRecord(id: string): Promise<boolean> {
    try {
      const records = await this.getAllInspectionRecords();
      const filteredRecords = records.filter(r => r.id !== id);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.inspections, 
        JSON.stringify(filteredRecords)
      );
      
      console.log('Inspection record deleted:', id);
      return true;
    } catch (error) {
      console.error('Error deleting inspection record:', error);
      return false;
    }
  }

  /**
   * Generar estadísticas del dashboard
   */
  async generateDashboardStats(): Promise<DashboardStats> {
    try {
      const records = await this.getAllInspectionRecords();
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      // Filtrar por fechas
      const completedToday = records.filter(r => 
        r.status === 'completed' && 
        r.completedAt && 
        r.completedAt >= today
      ).length;
      
      const completedThisWeek = records.filter(r => 
        r.status === 'completed' && 
        r.completedAt && 
        r.completedAt >= weekAgo
      ).length;
      
      // Calcular tiempo promedio (simulado por ahora)
      const averageTime = this.calculateAverageInspectionTime(records);
      
      // Formularios más usados
      const formUsage = this.calculateFormUsage(records);
      
      return {
        totalInspections: records.length,
        completedToday,
        completedThisWeek,
        averageTime,
        mostUsedForms: formUsage,
      };
    } catch (error) {
      console.error('Error generating dashboard stats:', error);
      return {
        totalInspections: 0,
        completedToday: 0,
        completedThisWeek: 0,
        averageTime: 0,
        mostUsedForms: [],
      };
    }
  }

  /**
   * Calcular tiempo promedio de inspección
   */
  private calculateAverageInspectionTime(records: InspectionRecord[]): number {
    const completedRecords = records.filter(r => 
      r.status === 'completed' && r.createdAt && r.completedAt
    );
    
    if (completedRecords.length === 0) return 0;
    
    const totalTime = completedRecords.reduce((sum, record) => {
      const duration = record.completedAt!.getTime() - record.createdAt.getTime();
      return sum + Math.floor(duration / (1000 * 60)); // en minutos
    }, 0);
    
    return Math.floor(totalTime / completedRecords.length);
  }

  /**
   * Calcular uso de formularios
   */
  private calculateFormUsage(records: InspectionRecord[]): Array<{
    formId: string;
    formName: string;
    count: number;
  }> {
    const usage: Record<string, { formId: string; formName: string; count: number }> = {};
    
    records.forEach(record => {
      if (!usage[record.formId]) {
        usage[record.formId] = {
          formId: record.formId,
          formName: this.getFormDisplayName(record.formId),
          count: 0,
        };
      }
      usage[record.formId].count++;
    });
    
    return Object.values(usage)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5
  }

  /**
   * Obtener nombre de formulario para mostrar
   */
  private getFormDisplayName(formId: string): string {
    const formNames: Record<string, string> = {
      'pile-inspection': 'Pile Inspection',
      'foundation-inspection': 'Foundation Inspection',
      'steel-inspection': 'Steel Inspection',
      // Agregar más según se vayan creando
    };
    
    return formNames[formId] || formId;
  }

  /**
   * Guardar draft del formulario
   */
  async saveDraft(formId: string, data: FormData): Promise<void> {
    try {
      const drafts = await this.getAllDrafts();
      drafts[formId] = {
        data,
        savedAt: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.drafts, JSON.stringify(drafts));
      console.log('Draft saved for form:', formId);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }

  /**
   * Obtener draft del formulario
   */
  async getDraft(formId: string): Promise<FormData | null> {
    try {
      const drafts = await this.getAllDrafts();
      return drafts[formId]?.data || null;
    } catch (error) {
      console.error('Error getting draft:', error);
      return null;
    }
  }

  /**
   * Obtener todos los drafts
   */
  async getAllDrafts(): Promise<Record<string, { data: FormData; savedAt: string }>> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.drafts);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting drafts:', error);
      return {};
    }
  }

  /**
   * Eliminar draft
   */
  async deleteDraft(formId: string): Promise<void> {
    try {
      const drafts = await this.getAllDrafts();
      delete drafts[formId];
      await AsyncStorage.setItem(STORAGE_KEYS.drafts, JSON.stringify(drafts));
      console.log('Draft deleted for form:', formId);
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  }

  /**
   * Guardar configuración de la app
   */
  async saveAppConfig(config: AppConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
      console.log('App config saved');
    } catch (error) {
      console.error('Error saving app config:', error);
      throw error;
    }
  }

  /**
   * Obtener configuración de la app
   */
  async getAppConfig(): Promise<AppConfig> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.config);
      if (data) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
      }
      return DEFAULT_CONFIG;
    } catch (error) {
      console.error('Error getting app config:', error);
      return DEFAULT_CONFIG;
    }
  }

  /**
   * Limpiar todos los datos
   */
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.inspections,
        STORAGE_KEYS.drafts,
        STORAGE_KEYS.stats,
        STORAGE_KEYS.photos,
      ]);
      console.log('All data cleared');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }

  /**
   * Exportar todos los datos
   */
  async exportAllData(): Promise<string> {
    try {
      const [inspections, drafts, config] = await Promise.all([
        this.getAllInspectionRecords(),
        this.getAllDrafts(),
        this.getAppConfig(),
      ]);
      
      const exportData = {
        inspections,
        drafts,
        config,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  /**
   * Importar datos
   */
  async importData(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.inspections) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.inspections, 
          JSON.stringify(data.inspections)
        );
      }
      
      if (data.drafts) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.drafts, 
          JSON.stringify(data.drafts)
        );
      }
      
      if (data.config) {
        await this.saveAppConfig(data.config);
      }
      
      console.log('Data imported successfully');
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  /**
   * Obtener estadísticas de almacenamiento
   */
  async getStorageStats(): Promise<{
    totalRecords: number;
    totalDrafts: number;
    estimatedSize: string;
  }> {
    try {
      const [records, drafts] = await Promise.all([
        this.getAllInspectionRecords(),
        this.getAllDrafts(),
      ]);
      
      const exportData = await this.exportAllData();
      const sizeInBytes = new Blob([exportData]).size;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      
      return {
        totalRecords: records.length,
        totalDrafts: Object.keys(drafts).length,
        estimatedSize: `${sizeInMB} MB`,
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return {
        totalRecords: 0,
        totalDrafts: 0,
        estimatedSize: '0 MB',
      };
    }
  }
}

// Exportar instancia singleton
export const storageService = new StorageService();
export default storageService;
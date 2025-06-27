// src/types/index.ts

export interface InspectionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  forms: InspectionForm[];
}

export interface InspectionForm {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  fields: FormField[];
  pdfTemplate?: string;
  estimatedTime: number; // en minutos
}

export interface FormField {
  description: any;
  maxImages: boolean;
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // Para select, radio, checkbox
  validation?: ValidationRule;
  dependsOn?: string; // ID del campo del que depende
  section?: string; // Agrupar campos por secciones
}

export type FieldType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'phone' 
  | 'date' 
  | 'time' 
  | 'datetime'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'image'
  | 'signature'
  | 'location'
  | 'boolean';

export interface ValidationRule {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface FormData {
  [fieldId: string]: any;
}

export interface InspectionRecord {
  id: string;
  formId: string;
  categoryId: string;
  title: string;
  data: FormData;
  photos: PhotoRecord[];
  signature?: string;
  location?: LocationData;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  status: 'draft' | 'completed' | 'exported';
  pdfPath?: string;
}

export interface PhotoRecord {
  id: string;
  uri: string;
  fieldId?: string;
  description?: string;
  timestamp: Date;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
}

export interface DashboardStats {
  totalInspections: number;
  completedToday: number;
  completedThisWeek: number;
  averageTime: number;
  mostUsedForms: Array<{
    formId: string;
    formName: string;
    count: number;
  }>;
}

// Tipos de navegación
export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  Dashboard: undefined;
  Categories: undefined;
  FormsList: { categoryId: string };
  FormScreen: { formId: string; recordId?: string };
  DocumentLibrary: undefined;
  DocumentViewer: { documentId: string };
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Camera: undefined;
  Documents: undefined;
  Settings: undefined;
};

// Tipos para configuración
export interface AppConfig {
  companyName: string;
  companyLogo: string;
  theme: 'light' | 'dark' | 'auto';
  autoSave: boolean;
  autoSaveInterval: number; // en segundos
  imageQuality: number; // 0-1
  maxPhotosPerForm: number;
}

// Tipos para exportación
export interface ExportOptions {
  format: 'pdf';
  includePhotos: boolean;
  includeSignature: boolean;
  includeLocation: boolean;
  quality: 'low' | 'medium' | 'high';
}

export interface ExportResult {
  success: boolean;
  filePath?: string;
  error?: string;
  fileSize?: number;
}
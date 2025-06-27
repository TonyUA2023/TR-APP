// src/constants/index.ts

import { InspectionCategory, AppConfig } from '../types';

// Colores del tema
export const COLORS = {
  primary: '#2563eb',      // Azul profesional
  secondary: '#7c3aed',    // Púrpura
  success: '#16a34a',      // Verde
  warning: '#ea580c',      // Naranja
  error: '#dc2626',        // Rojo
  info: '#0891b2',         // Cyan
  
  // Grises
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Fondos
  background: '#ffffff',
  surface: '#f8fafc',
  
  // Texto
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  
  // Bordes
  border: '#e5e7eb',
  borderFocus: '#2563eb',
} as const;

// Configuración por defecto
export const DEFAULT_CONFIG: AppConfig = {
  companyName: 'TÉCNICO Special Inspection Agency',
  companyLogo: '', // Se definirá después
  theme: 'light',
  autoSave: true,
  autoSaveInterval: 30,
  imageQuality: 0.8,
  maxPhotosPerForm: 20,
};

// Importar formularios de structures
import { pileInspectionByPagesForm } from '../data/forms/structures/pileInspectionByPagesForm';
import { underpinningInspectionByPagesForm } from '../data/forms/structures/underpinningInspectionByPagesForm';
import { elevatorPitInspectionForm } from '../data/forms/structures/elevatorPitInspectionForm';
import { foundationWallInspectionByPagesForm } from '../data/forms/structures/foundationWallInspectionByPagesForm';
import { gradeBeamInspectionForm } from '../data/forms/structures/gradeBeamInspectionForm';
import { matSlabInspectionForm } from '../data/forms/structures/matSlabInspectionForm';
import { wallStripInspectionForm } from '../data/forms/structures/wallStripInspectionForm';
import { shearWallInspectionByPagesForm } from '../data/forms/structures/shearWallInspectionByPagesForm';
import { columnsInspectionByPagesForm } from '../data/forms/structures/columnsInspectionByPagesForm';
import { beamsInspectionByPagesForm } from '../data/forms/structures/beamsInspectionByPagesForm';
import { steelInspectionByPagesForm } from '../data/forms/structures/steelInspectionByPagesForm';
import { cfsInspectionByPagesForm } from '../data/forms/structures/cfsInspectionByPagesForm';

// Importar formularios de subgrade
import { subgradeInspectionForm } from '../data/forms/subgrade/subgradeInspectionForm';

import { sprinklerInspectionForm } from '../data/forms/fire-suppression/sprinklerInspectionForm';

// Importar formularios de masonry
import { cmuInspectionForm } from '../data/forms/masonry/cmuInspectionForm';
// Categorías principales de inspección
export const INSPECTION_CATEGORIES: InspectionCategory[] = [
  {
    id: 'structures',
    name: 'Structures',
    icon: 'construct',
    color: COLORS.primary,
    description: 'Structural inspections and evaluations',
    forms: [
      pileInspectionByPagesForm,
      underpinningInspectionByPagesForm,
      elevatorPitInspectionForm,
      foundationWallInspectionByPagesForm,
      gradeBeamInspectionForm,
      matSlabInspectionForm,
      wallStripInspectionForm,
      shearWallInspectionByPagesForm,
      columnsInspectionByPagesForm,
      beamsInspectionByPagesForm,
      steelInspectionByPagesForm,
      cfsInspectionByPagesForm
    ]
  },
  {
    id: 'subgrade',
    name: 'Subgrade',
    icon: 'layers',
    color: '#8B4513',
    description: 'Soil, excavation, and ground preparation inspections',
    forms: [
      subgradeInspectionForm
    ]
  },
  {
    id: 'fire-suppression',
    name: 'Fire Suppression System',
    icon: 'flame',
    color: COLORS.error,
    description: 'Fire safety and suppression systems',
    forms: [
      sprinklerInspectionForm
    ]
  },
  {
    id: 'masonry',
    name: 'Masonry',
    icon: 'business',
    color: '#f59e0b',
    description: 'Masonry and stonework inspections',
    forms: [
      cmuInspectionForm
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'flash',
    color: COLORS.success,
    description: 'Electrical and energy systems',
    forms: []
  },
];

// Configuraciones de pantalla
export const SCREEN_CONFIGS = {
  splashDuration: 2000, // 2 segundos
  autoSaveInterval: 30000, // 30 segundos
  maxImageSize: 2048, // píxeles
  thumbnailSize: 150, // píxeles
} as const;

// Textos de la aplicación
export const APP_TEXTS = {
  splash: {
    welcome: 'Welcome to',
    subtitle: 'Special Inspection Agency',
    loading: 'Loading...',
  },
  dashboard: {
    title: 'Dashboard',
    recentInspections: 'Recent Inspections',
    quickActions: 'Quick Actions',
    stats: 'Today\'s Statistics',
    noInspections: 'No inspections yet',
    startFirst: 'Start your first inspection',
  },
  categories: {
    title: 'Inspection Categories',
    selectCategory: 'Select a category to begin',
  },
  forms: {
    title: 'Forms',
    selectForm: 'Select an inspection form',
    requiredField: 'This field is required',
    saveSuccess: 'Form saved successfully',
    exportSuccess: 'PDF exported successfully',
  },
  camera: {
    takePhoto: 'Take Photo',
    retakePhoto: 'Retake',
    usePhoto: 'Use Photo',
    addDescription: 'Add description (optional)',
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    export: 'Export PDF',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    retry: 'Retry',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
  },
} as const;

// Configuraciones de validación
export const VALIDATION = {
  maxTextLength: 500,
  maxDescriptionLength: 1000,
  minPasswordLength: 6,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phonePattern: /^\+?[\d\s\-\(\)]+$/,
} as const;

// Configuraciones de almacenamiento
export const STORAGE_KEYS = {
  inspections: '@tr_app_inspections',
  config: '@tr_app_config',
  drafts: '@tr_app_drafts',
  photos: '@tr_app_photos',
  stats: '@tr_app_stats',
} as const;

// Estadísticas de categorías
export const getCategoryStats = (categoryId: string) => {
  const category = INSPECTION_CATEGORIES.find(cat => cat.id === categoryId);
  if (!category) {
    return {
      total: 0,
      ready: 0,
      pending: 0,
      noPdf: 0,
    };
  }
  
  return {
    total: category.forms.length,
    ready: category.forms.filter(f => f.pdfTemplate).length,
    pending: 0,
    noPdf: category.forms.filter(f => !f.pdfTemplate).length,
  };
};

// Versión simple alternativa
export const getCategoryStatsSimple = (categoryId: string) => {
  switch (categoryId) {
    case 'structures':
      return { total: 12, ready: 12, pending: 0, noPdf: 0 };
    case 'subgrade':
      return { total: 1, ready: 1, pending: 0, noPdf: 0 };
    case 'fire-suppression':
    case 'masonry':
    case 'energy':
      return { total: 1, ready: 0, pending: 0, noPdf: 0 };
    default:
      return { total: 0, ready: 0, pending: 0, noPdf: 0 };
  }
};

// Formatos de fecha
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  displayWithTime: 'MMM dd, yyyy HH:mm',
  filename: 'yyyy-MM-dd_HHmm',
  iso: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
} as const;

// Configuraciones específicas para la plantilla Secant Pile
export const SECANT_PILE_CONFIG = {
  maxPhotos: 17,
  requiredPhotos: [
    'site_photo_1',
    'site_photo_2',
    'site_photo_3'
  ],
  photoSections: [
    'SECANT PILES, NORTH SIDE',
    'SECANT PILES, EAST SIDE',
    'DIAMETER OF PILE',
    'DEPTH OF PILE, NORTH SIDE',
    'DEPTH OF PILE, EAST SIDE',
    'DEPTH OF PILE, SOUTH SIDE',
    'PILE THICK',
    'LONG BAR FOR PILE',
    'PLACED IN THE CENTER OF PILE',
    'SPACE BETWEEN PILES, NORTH SIDE',
    'PORTLAND CEMENT TYPE',
    'TREMIE METHOD USED FOR GROUTING',
    'BAR IN THE CENTER OF PILE',
    'CERTIFIED WELDER',
    'PILE GROUTED',
    'ELECTRODE USED IN FIELD',
    'GROUT MIXER IN FIELD',
    'ROTARY MACHINE FOR PILE'
  ],
  fieldMappings: {
    textFields: 27,
    checkboxes: 5,
    dropdowns: 3,
    specialFields: ['Date', 'Temp', 'DateEmision']
  }
} as const;

// Configuraciones específicas para la plantilla Subgrade
export const SUBGRADE_CONFIG = {
  maxPhotos: 4,
  requiredPhotos: [],
  photoSections: [
    'AREA INSPECTION, EAST SIDE',
    'PLATE COMPACTOR USED IN FIELD',
    'SUB-GRADE INSPECTION PERFORMED USING HUMBOLT PENETROMETER',
    '2.5 TONS/FT² VERIFIED IN FIELD'
  ],
  fieldMappings: {
    textFields: 21,
    checkboxes: 5,
    dropdowns: 3,
    specialFields: ['Date', 'Temp', 'DateEmision']
  }
} as const;

// Configuración para debugging
export const DEBUG_CONFIG = {
  showFieldNames: false,
  logPdfGeneration: true,
  showTemplateInfo: true,
} as const;

// Exportar todo como un objeto para fácil acceso
export default {
  COLORS,
  DEFAULT_CONFIG,
  INSPECTION_CATEGORIES,
  SCREEN_CONFIGS,
  APP_TEXTS,
  VALIDATION,
  STORAGE_KEYS,
  DATE_FORMATS,
  SECANT_PILE_CONFIG,
  SUBGRADE_CONFIG,
  DEBUG_CONFIG,
  getCategoryStats,
  getCategoryStatsSimple,
};
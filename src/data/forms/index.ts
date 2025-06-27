// src/data/forms/index.ts - ACTUALIZADO CON SUBGRADE

import { InspectionForm } from '../../types';
import { pileInspectionByPagesForm } from './structures/pileInspectionByPagesForm';
import { underpinningInspectionByPagesForm } from './structures/underpinningInspectionByPagesForm';
import { elevatorPitInspectionForm } from './structures/elevatorPitInspectionForm';
import { matSlabInspectionForm } from './structures/matSlabInspectionForm';
import { wallStripInspectionForm } from './structures/wallStripInspectionForm';
import { gradeBeamInspectionForm } from './structures/gradeBeamInspectionForm';
import { foundationWallInspectionByPagesForm } from './structures/foundationWallInspectionByPagesForm';
import { shearWallInspectionByPagesForm } from './structures/shearWallInspectionByPagesForm';
import { columnsInspectionByPagesForm } from './structures/columnsInspectionByPagesForm';
import { beamsInspectionByPagesForm } from './structures/beamsInspectionByPagesForm';
import { steelInspectionByPagesForm } from './structures/steelInspectionByPagesForm';
import { cfsInspectionByPagesForm } from './structures/cfsInspectionByPagesForm';

import { subgradeInspectionForm } from './subgrade/subgradeInspectionForm';

import { sprinklerInspectionForm } from './fire-suppression/sprinklerInspectionForm';

import { cmuInspectionForm } from './masonry/cmuInspectionForm';

import { hvacMechanicalInteriorByPagesForm } from './energy/hvacMechanicalInteriorByPagesForm';
import { hvacMechanicalOutdoorsByPagesForm } from './energy/hvacMechanicalOutdoorsByPages';
import { hvacMechanicalOutdoors34ByPagesForm } from './energy/hvacMechanicalOutdoors34ByPagesForm';
import { hvacDuctsByPagesForm } from './energy/hvacDuctsByPagesForm';

// Todos los formularios disponibles
export const AVAILABLE_FORMS: Record<string, InspectionForm> = {
  'pile-inspection-pages': pileInspectionByPagesForm,
  'underpinning-inspection-pages': underpinningInspectionByPagesForm,
  'elevator-pit-inspection': elevatorPitInspectionForm,
  'mat-slab-inspection': matSlabInspectionForm,
  'wall-strip-inspection': wallStripInspectionForm,
  'grade-beam-inspection': gradeBeamInspectionForm,
  'foundation-wall-inspection-pages': foundationWallInspectionByPagesForm,
  'shear-wall-inspection-pages': shearWallInspectionByPagesForm,
  'columns-inspection-pages': columnsInspectionByPagesForm,
  'beams-inspection-pages': beamsInspectionByPagesForm,
  'steel-inspection-pages': steelInspectionByPagesForm,
  'cfs-inspection-pages': cfsInspectionByPagesForm,
  'subgrade-inspection': subgradeInspectionForm,
  'sprinkler-inspection': sprinklerInspectionForm,

  // Add masonry forms here when available
  'cmu-inspection': cmuInspectionForm,
  // Add HVAC forms here when available
  'hvac-mechanical-interior-pages': hvacMechanicalInteriorByPagesForm,
  'hvac-mechanical-outdoors-segments-1-2-pages': hvacMechanicalOutdoorsByPagesForm,
  'hvac-mechanical-outdoors-segments-3-4-pages': hvacMechanicalOutdoors34ByPagesForm,
  'hvac-ducts-pages': hvacDuctsByPagesForm
};

// Formularios por categoría
export const FORMS_BY_CATEGORY: Record<string, InspectionForm[]> = {
  structures: [
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
  ],
  subgrade: [
    subgradeInspectionForm,
    // Add subgrade forms here when available
    // subgradeExampleForm
  ],
  firesuppression: [
    sprinklerInspectionForm,
  ],
  masonry: [
    cmuInspectionForm
  ],
  energy: [
    hvacMechanicalInteriorByPagesForm,
    hvacMechanicalOutdoorsByPagesForm,
    hvacMechanicalOutdoors34ByPagesForm,
    hvacDuctsByPagesForm
  ]
};

// Función helper para obtener formulario por ID
export function getFormById(formId: string): InspectionForm | null {
  return AVAILABLE_FORMS[formId] || null;
}

// Función helper para obtener formularios por categoría
export function getFormsByCategory(categoryId: string): InspectionForm[] {
  return FORMS_BY_CATEGORY[categoryId] || [];
}

// Función helper para obtener todos los formularios
export function getAllForms(): InspectionForm[] {
  return Object.values(AVAILABLE_FORMS);
}

// Función helper para obtener información de categoría
export function getCategoryInfo(categoryId: string): { name: string; count: number } {
  const forms = FORMS_BY_CATEGORY[categoryId] || [];
  const categoryNames: Record<string, string> = {
    structures: 'Structural',
    subgrade: 'Subgrade',
    firesuppression: 'firesuppression',
    masonry: 'masonry',
    enery: 'energy'
  };
  
  return {
    name: categoryNames[categoryId] || categoryId,
    count: forms.length,
  };
}
// src/services/pdf/templateMappings.ts

export interface TemplateMapping {
  templateFile: string;
  fieldMappings: Record<string, string>;
  photoButtonMappings: Record<string, string>;
  checkboxMappings: Record<string, string>;
  dropdownMappings: Record<string, string>;
  dropdownValueMappings?: Record<string, Record<string, string>>;
  specialFields?: Array<{ name: string; value: string | ((data: any) => string) }>;
  photoSizeConstraints?: Record<string, { maxWidth: number; maxHeight: number }>;
}

// FUNCIÓN HELPER PARA VALIDAR CONSTRAINTS
export function validatePhotoConstraints(
  mapping: TemplateMapping,
  fieldName: string
): { maxWidth: number; maxHeight: number } {
  const constraints = mapping.photoSizeConstraints?.[fieldName];
  
  if (!constraints) {
    console.warn(`⚠️ No photo constraints found for field: ${fieldName}, using defaults`);
    return { maxWidth: 180, maxHeight: 135 };
  }
  
  // Validar que las dimensiones sean válidas
  if (constraints.maxWidth <= 0 || constraints.maxHeight <= 0) {
    console.warn(`⚠️ Invalid photo constraints for field: ${fieldName}, using defaults`);
    return { maxWidth: 180, maxHeight: 135 };
  }
  
  console.log(`📐 Using photo constraints for ${fieldName}: ${constraints.maxWidth}x${constraints.maxHeight}`);
  return constraints;
}

// Mapping para Secant Pile (existente)
const SECANT_PILE_MAPPING: TemplateMapping = {
  templateFile: 'secant-pile-template.pdf',
  
  fieldMappings: {
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',
    pile_diameter: 'DiameterPile',
    depth_pile_north: 'DepthPileNorth',
    depth_pile_east: 'DepthPileEast',
    depth_pile_south: 'DepthPileSouth',
    pile_thickness: 'PileThick',
    long_bar: 'LongBar',
    bar_center: 'BarCenter',
    space_between_piles: 'SpaceBetweenPiles',
    work_location_north: 'WorkLocationNorth',
    work_location_north_description: 'DescriptionWorkLocationNorth',
    work_location_east: 'WorkLocationEast',
    work_location_east_description: 'DescriptionWorkLocationEast',
    portland_cement: 'PortlandCement',
    tremie_method: 'TremieMetod',
    certified_welder: 'CertifiedWelder',
    bar_in_center: 'BarInTheCenter',
    pile_grouted: 'PileGrouted',
    electrode_used: 'ElectrodeUsed',
    grout_mixer: 'GroutMixer',
    rotary_machine: 'RotaryMachine',
  },
  
  photoButtonMappings: {
    work_location_north_foto: 'WorkLocationNorthFoto',
    work_location_east_foto: 'WorkLocationEastFoto',
    diameter_foto: 'DiameterFoto',
    depth_pile_north_foto: 'DepthPileNorthFoto',
    depth_pile_east_foto: 'DepthPileEastFoto',
    depth_pile_south_foto: 'DepthPileSouthFoto',
    pile_thick_foto: 'PileThickFoto',
    long_bar_foto: 'LongBarFoto',
    bar_center_foto: 'BarCenterFoto',
    space_between_piles_foto: 'SpaceBetweenPilesFoto',
    portland_cement_foto: 'PortlandCementFoto',
    tremie_method_foto: 'TremieMetodFoto',
    bar_in_the_center_foto: 'BarInTheCenterFoto',
    certified_welder_foto: 'CertifiedWelderFoto',
    pile_grouted_foto: 'PileGruotedFoto',
    electrode_used_foto: 'ElectrodeUsedFoto',
    grout_mixer_foto: 'GroutMixerFoto',
    rotary_machine_foto: 'RotaryMachineFoto',
  },
  
  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },
  
  dropdownMappings: {
    weather_conditions: 'Weather',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    department_name: 'DepartmentName',
  },
  
  dropdownValueMappings: {
    arrival_time: {
      '08:00': '8:00 am',
      '8:00': '8:00 am',
      '09:00': '9:00 am',
      '9:00': '9:00 am',
      '10:00': '10:00 am',
      '11:00': '11:00 am',
      '12:00': '12:00 pm',
      '13:00': '1:00 pm',
      '1:00': '1:00 pm',
      '14:00': '2:00 pm',
      '2:00': '2:00 pm',
      '15:00': '3:00 pm',
      '3:00': '3:00 pm',
      '16:00': '4:00 pm',
      '4:00': '4:00 pm',
    },
    departure_time: {
      '09:00': '9:00 am',
      '9:00': '9:00 am',
      '10:00': '10:00 am',
      '11:00': '11:00 am',
      '12:00': '12:00 pm',
      '13:00': '1:00 pm',
      '1:00': '1:00 pm',
      '14:00': '2:00 pm',
      '2:00': '2:00 pm',
      '15:00': '3:00 pm',
      '3:00': '3:00 pm',
      '16:00': '4:00 pm',
      '4:00': '4:00 pm',
      '16:30': '5:00 pm',
      '17:00': '5:00 pm',
      '5:00': '5:00 pm',
      '18:00': '6:00 pm',
      '6:00': '6:00 pm',
    },
    weather_conditions: {
      'sunny': 'Sunny',
      'Sunny': 'Sunny',
      'cloudy': 'Cloudy',
      'Cloudy': 'Cloudy',
      'rainy': 'Rainy',
      'Rainy': 'Rainy',
      'fair': 'Fair',
      'Fair': 'Fair',
    }
  },
  
  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: () => new Date().toLocaleDateString() }
  ],
  
  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Vistas generales más grandes
    work_location_north_foto: { maxWidth: 250, maxHeight: 180 },
    work_location_east_foto: { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE MEDIDAS - Tamaño mediano para detalles estructurales
    diameter_foto: { maxWidth: 200, maxHeight: 150 },
    depth_pile_north_foto: { maxWidth: 200, maxHeight: 150 },
    depth_pile_east_foto: { maxWidth: 200, maxHeight: 150 },
    depth_pile_south_foto: { maxWidth: 200, maxHeight: 150 },
    pile_thick_foto: { maxWidth: 180, maxHeight: 135 },
    long_bar_foto: { maxWidth: 180, maxHeight: 135 },
    bar_center_foto: { maxWidth: 180, maxHeight: 135 },
    space_between_piles_foto: { maxWidth: 180, maxHeight: 135 },
    
    // FOTOS DE PROCESO - Tamaño compacto para procesos y equipos
    portland_cement_foto: { maxWidth: 160, maxHeight: 120 },
    tremie_method_foto: { maxWidth: 160, maxHeight: 120 },
    bar_in_the_center_foto: { maxWidth: 160, maxHeight: 120 },
    certified_welder_foto: { maxWidth: 160, maxHeight: 120 },
    pile_grouted_foto: { maxWidth: 160, maxHeight: 120 },
    electrode_used_foto: { maxWidth: 160, maxHeight: 120 },
    grout_mixer_foto: { maxWidth: 160, maxHeight: 120 },
    rotary_machine_foto: { maxWidth: 160, maxHeight: 120 },
  }
};

// Mapping para Underpinning (nuevo)
const UNDERPINNING_MAPPING: TemplateMapping = {
  templateFile: '3UNDERPINNING.pdf',
  
  fieldMappings: {
    // Página 1: Información General
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',
    
    // Página 2: Vistas de Underpinning
    view_underpinning_north_side: 'ViewUnderPinningNorthSide',
    view_underpinning_south_side: 'ViewUnderPinningSouthSide',
    
    // Página 3: Refuerzo Vertical
    vertical_reinforcement_underpinning_d6b: 'VerticalReinforcementUnderPinningD6b',
    vertical_reinforcement_underpinning_a6: 'VerticalReinforcementUnderPinningA6',
    
    // Página 4: Espaciado y Ancho
    space_vertical_reinforcement_achieved: 'SpaceVerticalReinforcementAchieved',
    width_underpinning_a6: 'WidthUnderPinningA6',
    
    // Página 5: Medidas de Altura
    height_underpinning_d6b: 'HeightUnderPinningD6b',
    height_underpinning_a6: 'HeightUnderPinningA6',
    
    // Página 6: Medidas de Profundidad
    depth_underpinning_d6b: 'DepthUnderPinningD6b',
    depth_underpinning_a6: 'DepthUnderPinningA6',
    
    // Página 7: Concreto y Vibración
    concrete_placement: 'ConcretePlacement',
    vibrator_used_during_concrete_placement: 'VibratorUsedDuringConcretePlacement',
    
    // Página 8: Muestreo y Acabado
    concrete_delivered: 'ConcreteDelivered',
    cylindrical_samples_thermocure_box: 'CylindricalSamplesThermocureBox',
    slump_test: 'SlumpTest',
    concrete_finishing_underpinning_space_shims_grout: 'ConcreteFinishingUnderPinningSpaceShimsGrout',
    
    // Página 9: Shear Key
    shear_key_provided: 'ShearKeyProvided',
  },
  
  photoButtonMappings: {
    // Fotos página 2
    view_underpinning_north_side_foto: 'ViewUnderPinningNorthSideFoto',
    view_underpinning_south_side_foto: 'ViewUnderPinningSouthSideFoto',
    
    // Fotos página 3
    vertical_reinforcement_underpinning_d6b_foto: 'VerticalReinforcementUnderPinningD6bFoto',
    vertical_reinforcement_underpinning_a6_foto: 'VerticalReinforcementUnderPinningA6Foto',
    
    // Fotos página 4
    space_vertical_reinforcement_achieved_foto: 'SpaceVerticalReinforcementAchievedFoto',
    width_underpinning_a6_foto: 'WidthUnderPinningA6Foto',
    
    // Fotos página 5
    height_underpinning_d6b_foto: 'HeightUnderpinningD6bFoto',
    height_underpinning_a6_foto: 'HeightUnderPinningA6Foto',
    
    // Fotos página 6
    depth_underpinning_d6b_foto: 'DepthUnderPinningD6bFoto',
    depth_underpinning_a6_foto: 'DepthUnderPinningA6Foto',
    
    // Fotos página 7
    concrete_placement_foto: 'ConcretePlacementFoto',
    vibrator_used_during_concrete_placement_foto: 'VibratorUsedDuringConcretePlacementFoto',
    
    // Fotos página 8
    concrete_delivered_foto: 'ConcreteDeliveredFoto',
    cylindrical_samples_thermocure_box_foto: 'CylindricalSamplesThermocureBoxFoto',
    slump_test_foto: 'SlumpTestFoto',
    concrete_finishing_underpinning_space_shims_grout_foto: 'ConcreteFinishingUnderPinningSpaceShimsGroutFoto',
    
    // Fotos página 9
    shear_key_provided_foto: 'ShearKeyProvidedFoto',
  },
  
  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },
  
  dropdownMappings: {
    weather_conditions: 'Weather',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    department_name: 'DepartmentName',
  },
  
  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },
  
  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'DateofIssuance', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
  ],
  
  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Vistas generales más grandes
    view_underpinning_north_side_foto: { maxWidth: 250, maxHeight: 180 },
    view_underpinning_south_side_foto: { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE REFUERZO - Tamaño mediano para detalles estructurales
    vertical_reinforcement_underpinning_d6b_foto: { maxWidth: 200, maxHeight: 150 },
    vertical_reinforcement_underpinning_a6_foto: { maxWidth: 200, maxHeight: 150 },
    space_vertical_reinforcement_achieved_foto: { maxWidth: 200, maxHeight: 150 },
    width_underpinning_a6_foto: { maxWidth: 200, maxHeight: 150 },
    height_underpinning_d6b_foto: { maxWidth: 200, maxHeight: 150 },
    height_underpinning_a6_foto: { maxWidth: 200, maxHeight: 150 },
    depth_underpinning_d6b_foto: { maxWidth: 200, maxHeight: 150 },
    depth_underpinning_a6_foto: { maxWidth: 200, maxHeight: 150 },
    
    // FOTOS DE PROCESO - Tamaño compacto para procesos de construcción
    concrete_placement_foto: { maxWidth: 180, maxHeight: 135 },
    vibrator_used_during_concrete_placement_foto: { maxWidth: 180, maxHeight: 135 },
    concrete_delivered_foto: { maxWidth: 180, maxHeight: 135 },
    cylindrical_samples_thermocure_box_foto: { maxWidth: 180, maxHeight: 135 },
    slump_test_foto: { maxWidth: 180, maxHeight: 135 },
    concrete_finishing_underpinning_space_shims_grout_foto: { maxWidth: 180, maxHeight: 135 },
    shear_key_provided_foto: { maxWidth: 180, maxHeight: 135 },
  }
};

const ELEVATOR_PIT_MAPPING: TemplateMapping = {
  templateFile: '5ELEVATOR PIT.pdf',
  
  fieldMappings: {
    // Página 1: Información general
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',
    
    // Página 2: Foundation Mat Slab
    foundation_mat_slab_general_view: 'FoundationMatSlabForElevatorPitGeneralView',
    
    // Página 3: Bottom Rebar
    foundation_bottom_rebar_9_12: 'FoundationBottomRebar#9@12',
    bottom_rebar_9_verified: 'BottomRebar#9Verified',
    
    // Página 4: Top Rebar
    foundation_top_rebar_9_12: 'FoundationTopRebar#9@12',
    top_rebar_9_verified: 'TopRebar#9Verified',
    
    // Página 5: Additional Rebar
    additional_rebar_9_bottom_west_east: 'AdditionalRebar#9BottomWestEast',
    additional_rebar_9_bottom_north_south: 'AdditionalRebar#9BottomNorthSouth',
    
    // Página 6: Rebar Continue & Clearance
    bottom_top_rebar_continue_mat1: 'BottomTopRebarContinueMat1',
    clearance_between_bottom_rebar: 'ClearanceBetweenBottomRebar',
    
    // Página 7: Mat Slab Height & Sump Pit
    mat_slab_height_36: '36\'\'HeightMatSlabElevatorPit',
    sump_pit_width_24: '24\'\'WidthSumpPit',
    
    // Página 8: Hook for Dowel
    hook_dowel_rebar_9_sw8_24: '24\'\'HookForDowelRebar#9SW8',
    
    // Campos que parecen ser subtítulos pero podrían tener uso
    subtitle_5: 'Subtitle 5',
    subtitle_6: 'Subtitle 6',
    subtitle_7: 'Subtitle 7',
    subtitle_8: 'Subtitle 8',
    subtitle_9: 'Subtitle 9',
    subtitle_10: 'Subtitle 10',
    subtitle_11: 'Subtitle 11',
    subtitle_12: 'Subtitle 12',
    subtitle_13: 'Subtitle 13',
    subtitle_14: 'Subtitle 14',
    subtitle_15: 'Subtitle 15',
    subtitle_16: 'Subtitle 16',
    subtitle_17: 'Subtitle 17',
    subtitle_18: 'Subtitle 18',
    subtitle_19: 'Subtitle 19',
    subtitle_20: 'Subtitle 20',
  },
  
  photoButtonMappings: {
    // Nota: WorkLocationEastFoto parece ser un campo sobrante del template original
    work_location_east_foto: 'WorkLocationEastFoto',
    
    // Fotos principales del elevator pit
    foundation_mat_slab_general_view_foto: 'FoundationMatSlabForElevatorPitGeneralViewFoto',
    foundation_bottom_rebar_9_12_foto: 'FoundationBottomRebar#9@12Foto',
    bottom_rebar_9_verified_foto: 'BottomRebar#9VerifiedFoto',
    foundation_top_rebar_9_12_foto: 'FoundationTopRebar#9@12Foto',
    top_rebar_9_verified_foto: 'TopRebar#9VerifiedFoto',
    additional_rebar_9_bottom_west_east_foto: 'AdditionalRebar#9BottomWestEastFoto',
    additional_rebar_9_bottom_north_south_foto: 'AdditionalRebar#9BottomNorthSouthFoto',
    bottom_top_rebar_continue_mat1_foto: 'BottomTopRebarContinueMat1Foto',
    clearance_between_bottom_rebar_foto: 'ClearanceBetweenBottomRebarFoto',
    mat_slab_height_36_foto: '36\'\'HeightMatSlabElevatorPitFoto',
    sump_pit_width_24_foto: '24\'\'WidthSumpPitFoto',
    hook_dowel_rebar_9_sw8_24_foto: '24\'\'HookForDowelRebar#9SW8Foto',
  },
  
  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },
  
  dropdownMappings: {
    weather_conditions: 'Weather',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    department_name: 'DepartmentName',
  },
  
  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },
  
  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
    // Los campos Text8.X.X parecen ser campos de formato o metadata, los ignoramos por ahora
  ],
  
  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista general más grande
    foundation_mat_slab_general_view_foto: { maxWidth: 300, maxHeight: 220 },
    
    // FOTOS DE REBAR - Tamaño mediano para detalles de refuerzo
    foundation_bottom_rebar_9_12_foto: { maxWidth: 250, maxHeight: 180 },
    bottom_rebar_9_verified_foto: { maxWidth: 250, maxHeight: 180 },
    foundation_top_rebar_9_12_foto: { maxWidth: 250, maxHeight: 180 },
    top_rebar_9_verified_foto: { maxWidth: 250, maxHeight: 180 },
    additional_rebar_9_bottom_west_east_foto: { maxWidth: 250, maxHeight: 180 },
    additional_rebar_9_bottom_north_south_foto: { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS ESTÁNDAR - Para otros elementos estructurales
    bottom_top_rebar_continue_mat1_foto: { maxWidth: 250, maxHeight: 180 },
    clearance_between_bottom_rebar_foto: { maxWidth: 250, maxHeight: 180 },
    mat_slab_height_36_foto: { maxWidth: 250, maxHeight: 180 },
    sump_pit_width_24_foto: { maxWidth: 250, maxHeight: 180 },
    hook_dowel_rebar_9_sw8_24_foto: { maxWidth: 250, maxHeight: 180 },
    work_location_east_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

const MAT_SLAB_MAPPING: TemplateMapping = {
  templateFile: '5.1MAT SLAB.pdf',
  
  fieldMappings: {
    // Página 1: Información general
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',
    
    // Los campos que aparecen como "FoundationMatSlabForElevatorPit..." se reutilizan para Mat Slab general
    // Página 2: Foundation Mat Slab General View
    foundation_mat_slab_general: 'FoundationMatSlabGeneral',
    
    // Página 3: Bottom Rebar
    foundation_mat_slab_bottom_rebar_9_12: 'FoundationMatSlabBottomRebar#9@12',
    foundation_mat_slab_bottom_rebar_9_verified: 'FoundationMatSlabBottomRebar#9Verified',
    
    // Página 4: Top Rebar
    foundation_mat_slab_top_rebar_9_12: 'FoundationMatSlabTopRebar#9@12',
    foundation_mat_slab_top_rebar_9_verified: 'FoundationMatSlabTopRebar#9Verified',
    
    // Reutilizamos campos existentes para nuevos propósitos
    // Página 4: Additional Rebar #11 Bottom Shear Wall SW5
    additional_rebar_11_bottom_shear_wall_sw5: 'AdditionalRebar#11BottomShearWallSw5',
    
    // Página 4: Rebar Transition Between Different Elevation
    rebar_transition_between_different_elevation: 'RebarTransitionBetweenDifferentElevation',
    
    // Página 5: Additional Bottom Rebar #9 for Edge Mat Footing
    additional_bottom_rebar_9_edge_mat_footing: 'AdditionalBottomRebar#9ForEdgeMatFooting',
    
    // Página 5: Additional Top Rebar #9
    additional_top_rebar_9: '24LongBarForPile',
    
    // Página 5: Additional Bottom Rebar #9 Border Columns
    additional_bottom_rebar_9_border_columns: 'AdditionalBottomRebar#9BorderColumns',
    
    // Página 5: Reinforcement for Edge Mat Footing North & West
    reinforcement_edge_mat_footing_north_west: 'ReinforcementForEdgeMatFootingNorth',
    
    // Página 6: Foundation Mat Slab 6'9" Lap Splice Bottom Rebar #9
    foundation_mat_slab_6_9_lap_splice_bottom: 'FoundationMatSlab69LapSpliceBottom',
    
    // Página 6: Foundation Mat Slab 6'10" Lap Splice Top Rebar #9
    foundation_mat_slab_6_10_lap_splice_top: 'FoundationMatSlab69LapSpliceTop',
    
    // Página 6: 20" Top & Bottom Rebar Hook at Edge
    twenty_inch_top_bottom_rebar_hook_edge: '20TopBottomRebarHookEdgeMatSlab',
    
    // Página 6: 33" Height from Bottom to Top Rebar Mat1
    thirty_three_inch_height_bottom_top_rebar_mat1: '33HeightBootomTopRebarMat1',
    
    // Página 7: Lateral Concrete Cover
    lateral_concrete_cover: 'LateralConcreteCover',
    
    // Página 7: Bottom Concrete Cover
    bottom_concrete_cover: 'BottomConcreteCover',
    
    // Página 7: U Bars at the West Side
    u_bars_west_side: 'UBarsWestSide',
    
    // Página 7: Shear Slab and Dowels for Column N°55
    shear_slab_dowels_column_n55: 'ShearSlabDowelsColumn55',
    
    // Página 8: Stirrups #3@3" in Shear Slab
    stirrups_3_at_3_shear_slab: 'Stirrups#3@3ShearSlab',
    
    // Página 8: Dowels for Column
    dowels_for_column: 'DowelsColumn',
    
    // Página 8: Dowels #7 for Shear Wall SW5
    dowels_7_shear_wall_sw5: 'Dowels#7ShearWallSw5',
  },
  
  photoButtonMappings: {
    // WorkLocationEastFoto se mantiene aunque parece no usarse
    work_location_east_foto: 'WorkLocationEastFoto',
    
    // Fotos página 2
    foundation_mat_slab_general_foto: 'FoundationMatSlabForElevatorPitGeneralViewFoto',
    
    // Fotos página 3
    foundation_mat_slab_bottom_rebar_9_12_foto: 'FoundationMatSlabBottomRebar#9@12Foto',
    foundation_mat_slab_bottom_rebar_9_verified_foto: 'FoundationMatSlabBottomRebar#9VerifiedFoto',
    
    // Fotos página 4
    foundation_mat_slab_top_rebar_9_12_foto: 'FoundationMatSlabTopRebar#9@12Foto',
    foundation_mat_slab_top_rebar_9_verified_foto: 'FoundationMatSlabTopRebar#9VerifiedFoto',
    additional_rebar_11_bottom_shear_wall_sw5_foto: 'AdditionalRebar#11BottomShearWallSw5Foto',
    rebar_transition_between_different_elevation_foto: 'RebarTransitionBetweenDifferentElevationFoto',
    
    // Fotos página 5
    additional_bottom_rebar_9_edge_mat_footing_foto: 'AdditionalBottomRebar#9ForEdgeMatFootingFoto',
    additional_top_rebar_9_foto: '24LongBarForPileFoto',
    additional_bottom_rebar_9_border_columns_foto: 'AdditionalBottomRebar#9BorderColumnsFoto',
    reinforcement_edge_mat_footing_north_west_foto: 'ReinforcementForEdgeMatFootingNorthFoto',
    
    // Fotos página 6
    foundation_mat_slab_6_9_lap_splice_bottom_foto: 'FoundationMatSlab69LapSpliceBottomFoto',
    foundation_mat_slab_6_10_lap_splice_top_foto: 'FoundationMatSlab69LapSpliceTopFoto',
    twenty_inch_top_bottom_rebar_hook_edge_foto: '20TopBottomRebarHookEdgeMatSlabFoto',
    thirty_three_inch_height_bottom_top_rebar_mat1_foto: '33HeightBootomTopRebarMat1Foto',
    
    // Fotos página 7
    lateral_concrete_cover_foto: 'LateralConcreteCoverFoto',
    bottom_concrete_cover_foto: 'BottomConcreteCoverFoto',
    u_bars_west_side_foto: 'UBarsWestSideFoto',
    shear_slab_dowels_column_n55_foto: 'ShearSlabDowelsColumn55Foto',
    
    // Fotos página 8
    stirrups_3_at_3_shear_slab_foto: 'Stirrups#3@3ShearSlabFoto',
    dowels_for_column_foto: 'DowelsColumnFoto',
    dowels_7_shear_wall_sw5_foto: 'Dowels#7ShearWallSw5Foto',
  },
  
  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },
  
  dropdownMappings: {
    weather_conditions: 'Weather',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    department_name: 'DepartmentName',
  },
  
  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },
  
  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],
  
  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista general más grande
    foundation_mat_slab_general_foto: { maxWidth: 300, maxHeight: 220 },
    
    // FOTOS ESTÁNDAR - Para rebar y detalles estructurales
    foundation_mat_slab_bottom_rebar_9_12_foto: { maxWidth: 250, maxHeight: 180 },
    foundation_mat_slab_bottom_rebar_9_verified_foto: { maxWidth: 250, maxHeight: 180 },
    foundation_mat_slab_top_rebar_9_12_foto: { maxWidth: 250, maxHeight: 180 },
    foundation_mat_slab_top_rebar_9_verified_foto: { maxWidth: 250, maxHeight: 180 },
    additional_rebar_11_bottom_shear_wall_sw5_foto: { maxWidth: 250, maxHeight: 180 },
    rebar_transition_between_different_elevation_foto: { maxWidth: 250, maxHeight: 180 },
    additional_bottom_rebar_9_edge_mat_footing_foto: { maxWidth: 250, maxHeight: 180 },
    additional_top_rebar_9_foto: { maxWidth: 250, maxHeight: 180 },
    additional_bottom_rebar_9_border_columns_foto: { maxWidth: 250, maxHeight: 180 },
    reinforcement_edge_mat_footing_north_west_foto: { maxWidth: 250, maxHeight: 180 },
    foundation_mat_slab_6_9_lap_splice_bottom_foto: { maxWidth: 250, maxHeight: 180 },
    foundation_mat_slab_6_10_lap_splice_top_foto: { maxWidth: 250, maxHeight: 180 },
    twenty_inch_top_bottom_rebar_hook_edge_foto: { maxWidth: 250, maxHeight: 180 },
    thirty_three_inch_height_bottom_top_rebar_mat1_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_concrete_cover_foto: { maxWidth: 250, maxHeight: 180 },
    bottom_concrete_cover_foto: { maxWidth: 250, maxHeight: 180 },
    u_bars_west_side_foto: { maxWidth: 250, maxHeight: 180 },
    shear_slab_dowels_column_n55_foto: { maxWidth: 250, maxHeight: 180 },
    stirrups_3_at_3_shear_slab_foto: { maxWidth: 250, maxHeight: 180 },
    dowels_for_column_foto: { maxWidth: 250, maxHeight: 180 },
    dowels_7_shear_wall_sw5_foto: { maxWidth: 250, maxHeight: 180 },
    work_location_east_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

const WALL_STRIP_MAPPING: TemplateMapping = {
  templateFile: '13WALLSTRIP.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name:            'DepartmentName',
    inspection_report_number:  'Report#',
    project_address:           'DeptProject',
    contractor_name:           'DeptContractor',
    site_information:          'DeptInformation',
    inspection_date:           'Date',
    date_of_issuance:          'DateEmision',
    arrival_time:              'ArrivalTime',
    departure_time:            'DepartureTime',
    weather_conditions:        'Weather',
    inspector_name:            'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description:    'DescriptionInspection',
    notes_and_samples:         'Notes',

    // Page 2: Footings
    footing_foundation_col:        'FootingFoundationCol',
    footing_foundation_col_capacity: '3.0TN',
    footing_south:                 'FootingSouth',
    footing_south_capacity:        '3.5TN',

    // Page 3: Column N°22
    reinforcement_column_n22:     'ReinforcementColumnN22',
    lap_splice_to_dowels_column_n22: `4'4''LapSplice`,
    lateral_ties_4_3:             'LateralTies#4@3',
    lateral_ties_4_10:            'LateralTies#4@10',

    // Page 4: Foundation Wall BW1
    foundation_wall_bw1:          'FoundationWallBW1',
    vertical_reinforcement_5_12:  'Vertical#5@12',
    vertical_reinforcement_5_verified: 'VerticalReinf#5Verif',

    // Page 5: Horizontal Reinforcement
    horizontal_reinforcement_4_12:    'Horizontal#4@12',
    horizontal_reinforcement_4_verified: 'HorizontalReinforcement#4Verif',

    // Page 6: Lap Splices
    horizontal_lap_splice_3_1:     `3'1''HorizontalSplice`,
    lap_splice_dowels_4_3:         `4'3''LapSpliceDowels`,

    // Page 7: Footing 3WF26
    footing_3wf26_south:           'Footing3WF26South',
    transverse_5_12_footing_3wf26: 'Transverse#5@12',

    // Page 8: Footing 3F60
    footing_3f60_east:             'Footing3F60East',
    length_7_footing_3f60:         `7'LengthFooting3F60`,

    // Page 9: Footing 3F70E
    footing_3f70e_west:            'Footing3F70EWest',
    length_7_footing_3f70e:        `7'LenghtFooting3F70E`,

    // Page 10: Footing 3F100
    footing_3f100_north_side:      'Footing3F100NorthSide',
    hook_rebar_14_footing_3f100:   `14''HookRebar#8Footing3F100`,

    // Page 11: Footing 3F120
    footing_3f120_north_side:      'Footing3F120',
    hook_rebar_19_footing_3f120:   `19''HookRebar#83F120`,

    // Page 12: Clearances
    clear_soil_rebar_footing:      'ClearSoilRebarFooting',
    lateral_clear_form_rebar:      'LateralClearFormRebar',

    // Page 13: Grade Beams & Stirrups
    grade_beam_gb4:                'GradeBeamGB4',
    grade_beam_12x16:              `12''x16''GradeBeam`,
    stirrups_4_3:                  'Stirrups#4@3',
    grade_beam_gb6:                'GradeBeamGB6',
    grade_beam_gb9:                'GradeBeamGB9',
    stirrups_4_4:                  'Stirrups#4@4',
  },

  photoButtonMappings: {
    // Page 2 - FOOTINGS PRINCIPALES
    footing_foundation_col_photo:           'FootingFoundationColFoto',
    footing_foundation_col_capacity_photo:  '3.0TNFoto',
    footing_south_photo:                    'FootingSouthFoto',
    footing_south_capacity_photo:           '3.5TNFoto',
    
    // Page 3 - REINFORCEMENT COLUMN N°22
    reinforcement_column_n22_photo:         'ReinforcementColumnN22Foto',
    lap_splice_to_dowels_column_n22_photo:  `4'4''LapSpliceFoto`,
    lateral_ties_4_3_photo:                 'LateralTies#4@3Foto',
    lateral_ties_4_10_photo:                'LateralTies#4@10Foto',
    
    // Page 4 - FOUNDATION WALL BW1
    foundation_wall_bw1_photo:              'FoundationWallBW1Foto',
    vertical_reinforcement_5_12_photo:      'Vertical#5@12Foto',
    vertical_reinforcement_5_verified_photo:'VerticalReinf#5VerifFoto',
    
    // Page 5 - HORIZONTAL REINFORCEMENT
    horizontal_reinforcement_4_12_photo:    'Horizontal#4@12Foto',
    horizontal_reinforcement_4_verified_photo: 'HorizontalReinforcement#4VerifFoto',
    
    // Page 6 - LAP SPLICES
    horizontal_lap_splice_3_1_photo:        `3'1''HorizontalSpliceFoto`,
    lap_splice_dowels_4_3_photo:            `4'3''LapSpliceDowelsFoto`,
    
    // Page 7 - FOOTING 3WF26
    footing_3wf26_south_photo:              'Footing3WF26SouthFoto',
    transverse_5_12_footing_3wf26_photo:    'Transverse#5@12Foto',
    
    // Page 8 - FOOTING 3F60
    footing_3f60_east_photo:                'Footing3F60EastFoto',
    length_7_footing_3f60_photo:            `7'LengthFooting3F60Foto`,
    
    // Page 9 - FOOTING 3F70E
    footing_3f70e_west_photo:               'Footing3F70EWestFoto',
    length_7_footing_3f70e_photo:           `7'LenghtFooting3F70EFoto`,
    
    // Page 10 - FOOTING 3F100
    footing_3f100_north_side_photo:         'Footing3F100NorthSideFoto',
    hook_rebar_14_footing_3f100_photo:      `14''HookRebar#8Footing3F100Foto`,
    
    // Page 11 - FOOTING 3F120
    footing_3f120_north_side_photo:         'Footing3F120Foto',
    hook_rebar_19_footing_3f120_photo:      `19''HookRebar#83F120Foto`,
    
    // Page 12 - CLEARANCES
    clear_soil_rebar_footing_photo:         'ClearSoilRebarFootingFoto',
    lateral_clear_form_rebar_photo:         'LateralClearFormRebarFoto',
    
    // Page 13 - GRADE BEAMS & STIRRUPS
    grade_beam_gb4_photo:                   'GradeBeamGB4Foto',
    grade_beam_12x16_photo:                 `12''x16''GradeBeamFoto`,
    stirrups_4_3_photo:                     'Stirrups#4@3Foto',
    grade_beam_gb6_photo:                   'GradeBeamGB6Foto',
    grade_beam_gb9_photo:                   'GradeBeamGB9Foto',
    stirrups_4_4_photo:                     'Stirrups#4@4Foto',
  },

  checkboxMappings: {},

  dropdownMappings: {
    department_name:     'DepartmentName',
    arrival_time:        'ArrivalTime',
    departure_time:      'DepartureTime',
    weather_conditions:  'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      Sunny:  'Sunny',
      Cloudy: 'Cloudy',
      Fair:   'Fair',
      Rainy:  'Rainy',
    },
  },

  specialFields: [
    { name: 'Date',      value: (d: any) => d.inspection_date   || new Date().toLocaleDateString() },
    { name: 'DateEmision', value: (d: any) => d.date_of_issuance || new Date().toLocaleDateString() },
    { name: 'Temp',      value: (_: any) => '' },
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Footings principales más grandes
    footing_foundation_col_photo:          { maxWidth: 300, maxHeight: 220 },
    footing_foundation_col_capacity_photo: { maxWidth: 300, maxHeight: 220 },
    footing_south_photo:                   { maxWidth: 300, maxHeight: 220 },
    footing_south_capacity_photo:          { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE REFUERZO - Tamaño mediano para detalles estructurales
    reinforcement_column_n22_photo:        { maxWidth: 250, maxHeight: 180 },
    lap_splice_to_dowels_column_n22_photo: { maxWidth: 250, maxHeight: 180 },
    lateral_ties_4_3_photo:                { maxWidth: 250, maxHeight: 180 },
    lateral_ties_4_10_photo:               { maxWidth: 250, maxHeight: 180 },
    foundation_wall_bw1_photo:             { maxWidth: 250, maxHeight: 180 },
    vertical_reinforcement_5_12_photo:     { maxWidth: 250, maxHeight: 180 },
    vertical_reinforcement_5_verified_photo: { maxWidth: 250, maxHeight: 180 },
    horizontal_reinforcement_4_12_photo:   { maxWidth: 250, maxHeight: 180 },
    horizontal_reinforcement_4_verified_photo: { maxWidth: 250, maxHeight: 180 },
    horizontal_lap_splice_3_1_photo:       { maxWidth: 250, maxHeight: 180 },
    lap_splice_dowels_4_3_photo:           { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE FOOTINGS ESPECÍFICOS - Tamaño estándar
    footing_3wf26_south_photo:             { maxWidth: 250, maxHeight: 180 },
    transverse_5_12_footing_3wf26_photo:   { maxWidth: 250, maxHeight: 180 },
    footing_3f60_east_photo:               { maxWidth: 250, maxHeight: 180 },
    length_7_footing_3f60_photo:           { maxWidth: 250, maxHeight: 180 },
    footing_3f70e_west_photo:              { maxWidth: 250, maxHeight: 180 },
    length_7_footing_3f70e_photo:          { maxWidth: 250, maxHeight: 180 },
    footing_3f100_north_side_photo:        { maxWidth: 250, maxHeight: 180 },
    hook_rebar_14_footing_3f100_photo:     { maxWidth: 250, maxHeight: 180 },
    footing_3f120_north_side_photo:        { maxWidth: 250, maxHeight: 180 },
    hook_rebar_19_footing_3f120_photo:     { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE CLEARANCES - Tamaño estándar
    clear_soil_rebar_footing_photo:        { maxWidth: 250, maxHeight: 180 },
    lateral_clear_form_rebar_photo:        { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE GRADE BEAMS - Tamaño estándar
    grade_beam_gb4_photo:                  { maxWidth: 250, maxHeight: 180 },
    grade_beam_12x16_photo:                { maxWidth: 250, maxHeight: 180 },
    stirrups_4_3_photo:                    { maxWidth: 250, maxHeight: 180 },
    grade_beam_gb6_photo:                  { maxWidth: 250, maxHeight: 180 },
    grade_beam_gb9_photo:                  { maxWidth: 250, maxHeight: 180 },
    stirrups_4_4_photo:                    { maxWidth: 250, maxHeight: 180 },
  },
};

const GRADE_BEAM_MAPPING: TemplateMapping = {
  templateFile: '9GRADE BEAM.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name:            'DepartmentName',
    inspection_report_number:  'Report#',
    project_address:           'DeptProject',
    contractor_name:           'DeptContractor',
    site_information:          'DeptInformation',
    inspection_date:           'Date',
    date_of_issuance:          'DateEmision',
    arrival_time:              'ArrivalTime',
    departure_time:            'DepartureTime',
    weather_conditions:        'Weather',
    inspector_name:            'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description:    'DescriptionInspection',
    deviation_design_documents:'Check Box 1',
    significant_observations:  'Check Box 2',
    work_improperly_executed:  'Check Box 3',
    unsafe_job_conditions:     'Check Box 4',
    precautions_taken:         'Check Box 5',
    notes_and_samples:         'Notes',

    // Page 2: Footing 1.5WF26
    footing_1_5_north_side:    'Footing1.5NorthSide',
    depth_of_footing_1_5_wf26: '12DepthFooting',
    width_2_8_footing_1_5_wf26: `Width2'8''Footing`,
    footing_1_5_width_slope:   'Footing1.5wWidthSlope',

    // Page 3: Grade Beam GB4
    grade_beam_gb4_north:      'GradeBeamGB4North',
    width_1_6_grade_beam_gb4:  `Width1'6GB4`,
    depth_grade_beam_gb4:      `12''DepthGradeBeamGB4`,

    // Page 4: Concrete Placement & Vibration
    concrete_placement:        'ConcretePlacement',
    vibrator_during_placement: 'VibratorDuringPlacement',
    vibrator_used:             'VibratorUsed',

    // Page 5: Delivery
    concrete_delivered_1:      'ConcreteDelivered1',
    concrete_delivered_2:      'ConcreteDelivered2',

    // Page 6: Material Tests
    concrete_samples:          'ConcretSamples',
    slump_test:                'SlumpTest'
  },

  photoButtonMappings: {
    // Page 2 - FOOTING 1.5WF26
    footing_1_5_north_side_foto:    'Footing1.5NorthSideFoto',
    depth_of_footing_1_5_wf26_foto: '12DepthFootingFoto',
    width_2_8_footing_1_5_wf26_foto: `Width2'8''FootingFoto`,
    footing_1_5_width_slope_foto:   'Footing1.5wWidthSlopeFoto',

    // Page 3 - GRADE BEAM GB4
    grade_beam_gb4_north_foto:      'GradeBeamGB4NorthFoto',
    width_1_6_grade_beam_gb4_foto:  `Width1'6GB4Foto`,
    depth_grade_beam_gb4_foto:      `12''DepthGradeBeamGB4Foto`,

    // Page 4 - CONCRETE PLACEMENT & VIBRATION
    concrete_placement_foto:        'ConcretePlacementFoto',
    vibrator_during_placement_foto: 'VibratorDuringPlacementFoto',
    vibrator_used_foto:             'VibratorUsedFoto',

    // Page 5 - DELIVERY
    concrete_delivered_1_foto:      'ConcreteDelivered1Foto',
    concrete_delivered_2_foto:      'ConcreteDelivered2Foto',

    // Page 6 - MATERIAL TESTS
    concrete_samples_fotos:         'ConcretSamplesFotos',
    slump_test_foto:                'SlumpTestFoto'
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations:   'Check Box 2',
    work_improperly_executed:   'Check Box 3',
    unsafe_job_conditions:      'Check Box 4',
    precautions_taken:          'Check Box 5'
  },

  dropdownMappings: {
    department_name:    'DepartmentName',
    arrival_time:       'ArrivalTime',
    departure_time:     'DepartureTime',
    weather_conditions: 'Weather'
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am','9:00 am': '9:00 am','10:00 am': '10:00 am',
      '11:00 am': '11:00 am','12:00 pm': '12:00 pm','1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm','3:00 pm': '3:00 pm','4:00 pm': '4:00 pm'
    },
    departure_time: {
      '9:00 am': '9:00 am','10:00 am': '10:00 am','11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm','1:00 pm': '1:00 pm','2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm','4:00 pm': '4:00 pm','5:00 pm': '5:00 pm','6:00 pm': '6:00 pm'
    },
    weather_conditions: {
      Sunny: 'Sunny', Cloudy: 'Cloudy', Fair: 'Fair', Rainy: 'Rainy'
    }
  },

  specialFields: [
    {
      name: 'Date',
      value: (data: any) =>
        data.inspection_date || new Date().toLocaleDateString()
    },
    {
      name: 'DateEmision',
      value: (data: any) =>
        data.date_of_issuance || new Date().toLocaleDateString()
    },
    {
      name: 'Temp',
      value: (data: any) => data.temperature || ''
    }
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Footings (page 2) más grandes
    footing_1_5_north_side_foto:    { maxWidth: 300, maxHeight: 220 },
    depth_of_footing_1_5_wf26_foto: { maxWidth: 300, maxHeight: 220 },
    width_2_8_footing_1_5_wf26_foto:{ maxWidth: 300, maxHeight: 220 },
    footing_1_5_width_slope_foto:   { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE GRADE BEAM - Tamaño estándar
    grade_beam_gb4_north_foto:      { maxWidth: 250, maxHeight: 180 },
    width_1_6_grade_beam_gb4_foto:  { maxWidth: 250, maxHeight: 180 },
    depth_grade_beam_gb4_foto:      { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE PROCESO - Tamaño estándar para detalles
    concrete_placement_foto:        { maxWidth: 250, maxHeight: 180 },
    vibrator_during_placement_foto: { maxWidth: 250, maxHeight: 180 },
    vibrator_used_foto:             { maxWidth: 250, maxHeight: 180 },
    concrete_delivered_1_foto:      { maxWidth: 250, maxHeight: 180 },
    concrete_delivered_2_foto:      { maxWidth: 250, maxHeight: 180 },
    concrete_samples_fotos:         { maxWidth: 250, maxHeight: 180 },
    slump_test_foto:                { maxWidth: 250, maxHeight: 180 }
  }
};

const FOUNDATION_WALL_MAPPING: TemplateMapping = {
  templateFile: '8FOUNDATION_WALL.pdf',

  fieldMappings: {
    // Page 1: General Information
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 3: Foundation Wall Sides & Reinforcement
    foundation_west_side: 'FoundationWestSide',
    foundation_north_side: 'FoundationNorthSide',
    horizontal_rebar_5_at_12: 'Horizontal#5@12',
    vertical_rebar_5_at_12: 'Vertical#5@12',

    // Page 4: Dowels & Lap Splices
    dowel_lap_splice_5ft: '5\'DowelsLapPile',
    horizontal_lap_splice_3ft4in: '3\'4"HorizontalLapSpace',
    lap_splice_corner_36in: '36"LapSpliceCorner',
    corner_reinforcement_detail: 'CornerReinforcementDetail',

    // Page 5: Rebar Verification
    rebar_5_verified_in_field: 'Rebar#5Field',

    // Page 6: Cement, Tremie, Bar & Welder
    portland_cement_type_used: 'PortlandCementUsedFor',
    tremie_method_for_grouting: 'TremieMetodForGrouting',
    bar_in_the_center_of_pile: 'BarInTheCenterOfPile',
    certified_welder_er: 'CertifiedWelderER',

    // Page 7: Pile Grouting & Machinery
    pile_grouted_status: 'PileGrouted',
    electrode_used_in_field: 'ElectrodeUsedInField',
    grout_mixer_in_field: 'GroutMixerInField',
    rotary_machine_for_pile: 'RotaryMachineForPile',
  },

  photoButtonMappings: {
    // Page 3: Foundation Wall Sides & Reinforcement
    foundation_west_side_photo: 'FoundationWestSideFoto',
    foundation_north_side_photo: 'FoundationNorthSideFoto',
    horizontal_rebar_5_at_12_photo: 'Horizontal#5@12Foto',
    vertical_rebar_5_at_12_photo: 'Vertical#5@12Foto',

    // Page 4: Dowels & Lap Splices
    dowel_lap_splice_5ft_photo: '5\'DowelsLapFoto',
    horizontal_lap_splice_3ft4in_photo: '3\'4"HorizontalLapSpaceFoto',
    lap_splice_corner_36in_photo: '36"LapSpliceCornerFoto',
    corner_reinforcement_detail_photo: 'CornerReinforcementDetailFoto',

    // Page 5: Rebar Verification
    rebar_5_verified_in_field_photo: 'Rebar#5FieldFoto',

    // Page 6: Cement, Tremie, Bar & Welder
    portland_cement_type_used_photo: 'PortlandCementFoto',
    tremie_method_for_grouting_photo: 'TremieMetodFoto',
    bar_in_the_center_of_pile_photo: 'BarInTheCenterFoto',
    certified_welder_er_photo: 'CertifiedWelderFoto',

    // Page 7: Pile Grouting & Machinery
    pile_grouted_status_photo: 'PileGroutedFoto',
    electrode_used_in_field_photo: 'ElectrodeUsedFoto',
    grout_mixer_in_field_photo: 'GroutMixerFoto',
    rotary_machine_for_pile_photo: 'RotaryMachineFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    weather_conditions: 'Weather',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    department_name: 'DepartmentName',
  },

  dropdownValueMappings: {
    arrival_time: {
      '08:00': '8:00 am',
      '8:00': '8:00 am',
      '09:00': '9:00 am',
      '9:00': '9:00 am',
      '10:00': '10:00 am',
      '11:00': '11:00 am',
      '12:00': '12:00 pm',
      '13:00': '1:00 pm',
      '1:00': '1:00 pm',
      '14:00': '2:00 pm',
      '2:00': '2:00 pm',
      '15:00': '3:00 pm',
      '3:00': '3:00 pm',
      '16:00': '4:00 pm',
      '4:00': '4:00 pm',
    },
    departure_time: {
      '09:00': '9:00 am',
      '9:00': '9:00 am',
      '10:00': '10:00 am',
      '11:00': '11:00 am',
      '12:00': '12:00 pm',
      '13:00': '1:00 pm',
      '1:00': '1:00 pm',
      '14:00': '2:00 pm',
      '2:00': '2:00 pm',
      '15:00': '3:00 pm',
      '3:00': '3:00 pm',
      '16:00': '4:00 pm',
      '4:00': '4:00 pm',
      '16:30': '5:00 pm',
      '17:00': '5:00 pm',
      '5:00': '5:00 pm',
      '18:00': '6:00 pm',
      '6:00': '6:00 pm',
    },
    weather_conditions: {
      'sunny': 'Sunny',
      'Sunny': 'Sunny',
      'cloudy': 'Cloudy',
      'Cloudy': 'Cloudy',
      'rainy': 'Rainy',
      'Rainy': 'Rainy',
      'fair': 'Fair',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: () => new Date().toLocaleDateString() }
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Foundation Wall Sides más grandes
    foundation_west_side_photo: { maxWidth: 250, maxHeight: 180 },
    foundation_north_side_photo: { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE REBAR - Tamaño estándar para refuerzo
    horizontal_rebar_5_at_12_photo: { maxWidth: 250, maxHeight: 180 },
    vertical_rebar_5_at_12_photo: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE DOWELS & LAP SPLICES - Tamaño estándar
    dowel_lap_splice_5ft_photo: { maxWidth: 250, maxHeight: 180 },
    horizontal_lap_splice_3ft4in_photo: { maxWidth: 250, maxHeight: 180 },
    lap_splice_corner_36in_photo: { maxWidth: 250, maxHeight: 180 },
    corner_reinforcement_detail_photo: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE VERIFICACIÓN - Tamaño estándar
    rebar_5_verified_in_field_photo: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE PROCESO - Tamaño estándar para cemento, tremie, etc.
    portland_cement_type_used_photo: { maxWidth: 250, maxHeight: 180 },
    tremie_method_for_grouting_photo: { maxWidth: 250, maxHeight: 180 },
    bar_in_the_center_of_pile_photo: { maxWidth: 250, maxHeight: 180 },
    certified_welder_er_photo: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE MAQUINARIA - Tamaño estándar
    pile_grouted_status_photo: { maxWidth: 250, maxHeight: 180 },
    electrode_used_in_field_photo: { maxWidth: 250, maxHeight: 180 },
    grout_mixer_in_field_photo: { maxWidth: 250, maxHeight: 180 },
    rotary_machine_for_pile_photo: { maxWidth: 250, maxHeight: 180 },
  }
};

const SHEAR_WALL_MAPPING: TemplateMapping = {
  templateFile: '11SHEAR_WALL.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'NewAttributionInspection',
    notes_and_samples: 'Notes',

    // Page 2: U Bar Foundation Wall
    u_bar_6_12_top_foundation_wall_bw3: 'UBar#6@12',
    u_bar_6_top_foundation_wall_bw3_verified: 'Ubar#6BW3',

    // Page 2: Shear Wall SW7 Reinforcement
    shear_wall_sw7_reinforcement: 'ShearWallSW7',
    shear_wall_sw7_reinforcement_zone_61_bar_8_9: 'ShearSW7Bar8',

    // Page 3: Dowels and Longitudinal Bar
    dowels_lap_splice_shear_wall_sw7_bar_9: 'DowelsSplice#9',
    longitudinal_bar_9_shear_wall_sw7_verified: 'LongBar#9WallSW7',

    // Page 3: Lateral Ties
    lateral_ties_4_10_oc_zone_60_sw7_east_side: 'Lateral#4@10',
    lateral_cross_ties_4_10_oc_zone_60_sw7_north_side: 'LateralCross#4@10',

    // Page 4: Horizontal Reinforcement
    horizontal_reinforcement_5_10_inside_face_shear_wall_sw7_non_zone: 'Horizontal#5@10',
    horizontal_reinforcement_5_if_shear_wall_sw7_non_zone_verified: 'Horizontal#5I.F',

    // Page 4: Vertical Reinforcement
    vertical_reinforcement_5_12_inside_face_shear_wall_sw7_non_zone: 'Vertical#5@12',
    vertical_reinforcement_5_if_shear_wall_sw7_non_zone_verified: 'Vertical#5I.F',

    // Page 5: Diagonal Bar and Additional Bar
    diagonal_bar_in_opening_portland_cement: 'DiagonalOP',
    additional_bar_5_ef_top_sides_openings_tremie_method: 'Additional#5OP',
  },

  photoButtonMappings: {
    // Page 2: U Bar Foundation Wall Photos
    u_bar_6_12_top_foundation_wall_bw3_foto: 'UBar#6@12Foto',
    u_bar_6_top_foundation_wall_bw3_verified_foto: 'Ubar#6BW3Foto',

    // Page 2: Shear Wall SW7 Photos
    shear_wall_sw7_reinforcement_foto: 'ShearWallSW7Foto',
    shear_wall_sw7_reinforcement_zone_61_bar_8_9_foto: 'ShearSW7Bar8Foto',

    // Page 3: Dowels and Longitudinal Bar Photos
    dowels_lap_splice_shear_wall_sw7_bar_9_foto: 'DowelsSplice#9Foto',
    longitudinal_bar_9_shear_wall_sw7_verified_foto: 'LongBar#9WallSW7Foto',

    // Page 3: Lateral Ties Photos
    lateral_ties_4_10_oc_zone_60_sw7_east_side_foto: 'Lateral#4@10Foto',
    lateral_cross_ties_4_10_oc_zone_60_sw7_north_side_foto: 'LateralCross#4@10Foto',

    // Page 4: Horizontal Reinforcement Photos
    horizontal_reinforcement_5_10_inside_face_shear_wall_sw7_non_zone_foto: 'Horizontal#5@10Foto',
    horizontal_reinforcement_5_if_shear_wall_sw7_non_zone_verified_foto: 'Horizontal#5I.FFoto',

    // Page 4: Vertical Reinforcement Photos
    vertical_reinforcement_5_12_inside_face_shear_wall_sw7_non_zone_foto: 'Vertical#5@12Foto',
    vertical_reinforcement_5_if_shear_wall_sw7_non_zone_verified_foto: 'Vertical#5I.FFoto',

    // Page 5: Diagonal Bar and Additional Bar Photos
    diagonal_bar_in_opening_portland_cement_foto: 'DiagonalOPFoto',
    additional_bar_5_ef_top_sides_openings_tremie_method_foto: 'Additional#5OPFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Vistas generales más grandes
    u_bar_6_12_top_foundation_wall_bw3_foto: { maxWidth: 300, maxHeight: 220 },
    u_bar_6_top_foundation_wall_bw3_verified_foto: { maxWidth: 300, maxHeight: 220 },
    shear_wall_sw7_reinforcement_foto: { maxWidth: 300, maxHeight: 220 },
    shear_wall_sw7_reinforcement_zone_61_bar_8_9_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE REFUERZO - Tamaño mediano para detalles estructurales
    dowels_lap_splice_shear_wall_sw7_bar_9_foto: { maxWidth: 250, maxHeight: 180 },
    longitudinal_bar_9_shear_wall_sw7_verified_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_ties_4_10_oc_zone_60_sw7_east_side_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_cross_ties_4_10_oc_zone_60_sw7_north_side_foto: { maxWidth: 250, maxHeight: 180 },
    horizontal_reinforcement_5_10_inside_face_shear_wall_sw7_non_zone_foto: { maxWidth: 250, maxHeight: 180 },
    horizontal_reinforcement_5_if_shear_wall_sw7_non_zone_verified_foto: { maxWidth: 250, maxHeight: 180 },
    vertical_reinforcement_5_12_inside_face_shear_wall_sw7_non_zone_foto: { maxWidth: 250, maxHeight: 180 },
    vertical_reinforcement_5_if_shear_wall_sw7_non_zone_verified_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE DETALLES - Tamaño estándar
    diagonal_bar_in_opening_portland_cement_foto: { maxWidth: 250, maxHeight: 180 },
    additional_bar_5_ef_top_sides_openings_tremie_method_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

const COLUMNS_MAPPING: TemplateMapping = {
  templateFile: '10COLUMNS.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'NewAttributionInspection',
    notes_and_samples: 'Notes',

    // Page 2: Reinforcement in Columns
    reinforcement_column_12: 'ReinforcementInColumnN12',
    reinforcement_column_24a: 'ReinforcementInColumn24A',
    reinforcement_column_20: 'ReinforcementColumnN20',
    reinforcement_column_16: 'ReinforcementInColumnN16',

    // Page 3: More Column Reinforcements
    reinforcement_column_17: 'ReinforcementInColumnN17',
    reinforcement_column_21: 'ReinforcementInColumnN21',
    rebar_7_columns: 'Rebar7Columns',
    lateral_cross_ties_4: 'LateralCrossTies4',

    // Page 4: Lateral and Cross Ties
    lateral_cross_ties_4_6_lower_column_12: 'LateralCrossTies#4@6',
    lateral_cross_ties_4_10_center_column_16: 'LateralCrossTies#4@10',
    lateral_cross_ties_4_6_lower_column_22: 'LateralCrossTies#4@6Col22',
    lateral_cross_ties_4_10_center_column_24a: 'LateralCrossTies#4@10Col24A',

    // Page 5: Lap Splice in Vertical Rebar
    lap_splice_vertical_rebar_column_16_portland: 'LapSpliceVerticalRebarCol16',
    lap_splice_vertical_rebar_column_24a_tremie: 'LapSpliceVerticalRebarCol24A',
  },

  photoButtonMappings: {
    // Page 2: Column Reinforcement Photos
    reinforcement_column_12_foto: 'ReinforcementColumn12Foto',
    reinforcement_column_24a_foto: 'ReinforcementInColumn24AFoto',
    reinforcement_column_20_foto: 'ReinforcementColumnN20Foto',
    reinforcement_column_16_foto: 'ReinforcementInColumnN16Foto',

    // Page 3: More Column Photos
    reinforcement_column_17_foto: 'ReinforcementInColumnN17Foto',
    reinforcement_column_21_foto: 'ReinforcementInColumnN21Foto',
    rebar_7_columns_foto: 'Rebar7ColumnsFoto',
    lateral_cross_ties_4_foto: 'LateralCrossTies4Foto',

    // Page 4: Lateral and Cross Ties Photos
    lateral_cross_ties_4_6_lower_column_12_foto: 'LateralCrossTies#4@6Fotos',
    lateral_cross_ties_4_10_center_column_16_foto: 'LateralCrossTies#4@10Foto',
    lateral_cross_ties_4_6_lower_column_22_foto: 'LateralCrossTies#4@6Col22Foto',
    lateral_cross_ties_4_10_center_column_24a_foto: 'LateralCrossTies#4@10Col24AFoto',

    // Page 5: Lap Splice Photos
    lap_splice_vertical_rebar_column_16_foto: 'LapSpliceVerticalRebarCol16Foto',
    lap_splice_vertical_rebar_column_24a_foto: 'LapSpliceVerticalRebarCol24AFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Columnas principales más grandes
    reinforcement_column_12_foto: { maxWidth: 300, maxHeight: 220 },
    reinforcement_column_24a_foto: { maxWidth: 300, maxHeight: 220 },
    reinforcement_column_20_foto: { maxWidth: 300, maxHeight: 220 },
    reinforcement_column_16_foto: { maxWidth: 300, maxHeight: 220 },
    reinforcement_column_17_foto: { maxWidth: 300, maxHeight: 220 },
    reinforcement_column_21_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE DETALLES - Tamaño estándar para refuerzos y ties
    rebar_7_columns_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_cross_ties_4_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_cross_ties_4_6_lower_column_12_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_cross_ties_4_10_center_column_16_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_cross_ties_4_6_lower_column_22_foto: { maxWidth: 250, maxHeight: 180 },
    lateral_cross_ties_4_10_center_column_24a_foto: { maxWidth: 250, maxHeight: 180 },
    lap_splice_vertical_rebar_column_16_foto: { maxWidth: 250, maxHeight: 180 },
    lap_splice_vertical_rebar_column_24a_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

const BEAMS_MAPPING: TemplateMapping = {
  templateFile: '7BEAMS.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'NewAttributionInspection',
    notes_and_samples: 'Notes',

    // Page 2: 2 Slab Reinforcement
    slab_reinforcement_north_south_view: '2SlabNorthSouth',
    slab_reinforcement_4_12_oc_ew_bottom: 'SlabReinforcement#4@12',
    rebar_4_bottom_verified: 'Rebar#4Bottom',

    // Page 3: Slab Reinforcement Middle Strip
    slab_reinforcement_5_12_oc_middle_strip_top_bars: 'SlabReinforcement#5@12',
    rebar_5_middle_strip_bars_verified: 'Rebar#5MidleStripBars',
    additional_reinforcement_slab_6_10_oc_top: 'AdditionalReinforcement#6@10',
    rebar_6_additional_top_bars_verified: 'Rebar#6Bars',

    // Page 4: Additional Reinforcement
    additional_reinforcement_slab_7_10_oc_top: 'AdditionalReinforcementSlab#7@10',
    rebar_7_additional_top_bars_verified: 'Rebar#7TopBars',
    infill_top_bar_4_12: 'InfillBar#4@12',
    infill_top_bar_4_verified: 'InfillTopBar#4Verified',

    // Page 5: Additional Reinforcement in Slab & Girders
    additional_reinf_slab_6_12_oc_top_columns_portland: 'ReinfSlab#6@12',
    additional_reinforcement_opening_tremie: 'ReinforcementOpening',
    girder_2gt1_bar_11: 'Girder2GT1',
    girder_2gt2_cer: 'Girder2GT2',

    // Page 6: More Girders
    girder_2gt3: 'Girder2GT3',
    girder_2gt4_electrode: 'Girder2GT4',
    girder_2gt5_2gt6_grx: 'Girder2GT5&2GT6',
    longitudinal_bottom_reinforcement_11_2l_girder_2gt2_verified: 'LongitBottomReinforcement#11(2L)',

    // Page 7: Stirrups and Additional Beams
    stirrups_4_6_girder_2gt3: 'Stirrups#4@6Girder2GT3',
    longitudinal_bottom_reinforcement_10_girder_2gt5_verified: 'LongReinforcement#10Girder',
    longitudinal_bottom_reinforcement_11_girder_2gt3: 'LongReinforcement#11(2GT3)',
    beam_2460_ele_r_approved_shop_drawings_07_18_24: 'Beam2460',

    // Page 8: Added Beams
    added_beam_07_23_24_approved_shop_drawings_between_columns_28_29: 'AddedBeam28-29',
    added_beam_1260_approved_shop_drawings_between_columns_3_4: 'AddedBeam1260n3-4',
    added_beam_1260_approved_shop_drawings_between_columns_7_8: 'AddedBeam1260n7-8',
    stud_rails_above_column_6_rotary: 'StudRailsAboveCol6',

    // Page 9: Stud Rails and Space
    stud_rails_above_column_5: 'StudAboveCol5',
    space_between_stud_electrode: 'SpaceStud',
  },

  photoButtonMappings: {
    // Page 2: 2 Slab Reinforcement Photos
    slab_reinforcement_north_south_view_foto: '2SlabNorthSouthFoto',
    slab_reinforcement_4_12_oc_ew_bottom_foto: 'SlabReinforcement#4@12Foto',
    rebar_4_bottom_verified_foto: 'Rebar#4BottomFoto',

    // Page 3: Slab Reinforcement Middle Strip Photos
    slab_reinforcement_5_12_oc_middle_strip_top_bars_foto: 'SlabReinforcement#5@12Foto',
    rebar_5_middle_strip_bars_verified_foto: 'Rebar#5MidleStripBarsFoto',
    additional_reinforcement_slab_6_10_oc_top_foto: 'AdditionalReinforcement#6@10Foto',
    rebar_6_additional_top_bars_verified_foto: 'Rebar#6BarsFoto',

    // Page 4: Additional Reinforcement Photos
    additional_reinforcement_slab_7_10_oc_top_foto: 'AdditionalReinforcementSlab#7@10Foto',
    rebar_7_additional_top_bars_verified_foto: 'Rebar#7TopBarsFoto',
    infill_top_bar_4_12_foto: 'InfillBar#4@12Foto',
    infill_top_bar_4_verified_foto: 'InfillTopBar#4VerifiedFoto',

    // Page 5: Additional Reinforcement in Slab & Girders Photos
    additional_reinf_slab_6_12_oc_top_columns_portland_foto: 'ReinfSlab#6@12Foto',
    additional_reinforcement_opening_tremie_foto: 'ReinforcementOpeningFoto',
    girder_2gt1_bar_11_foto: 'Foto',
    girder_2gt2_cer_foto: 'Girder2GT2Foto',

    // Page 6: More Girders Photos
    girder_2gt3_foto: 'Girder2GT3Foto',
    girder_2gt4_electrode_foto: 'Girder2GT4Foto',
    girder_2gt5_2gt6_grx_foto: 'Girder2GT5&2GT6Foto',
    longitudinal_bottom_reinforcement_11_2l_girder_2gt2_verified_foto: 'LongitBottomReinforcement#11(2GT2Foto',

    // Page 7: Stirrups and Additional Beams Photos
    stirrups_4_6_girder_2gt3_foto: 'Stirrups#4@6Girder2GT3Foto',
    longitudinal_bottom_reinforcement_10_girder_2gt5_verified_foto: 'LongReinforcement#10GirderFoto',
    longitudinal_bottom_reinforcement_11_girder_2gt3_foto: 'LongReinforcement#11(2GT3Foto',
    beam_2460_ele_r_approved_shop_drawings_07_18_24_foto: 'Beam2460Foto',

    // Page 8: Added Beams Photos
    added_beam_07_23_24_approved_shop_drawings_between_columns_28_29_foto: 'AddedBeam28-29Foto',
    added_beam_1260_approved_shop_drawings_between_columns_3_4_foto: 'AddedBeam1260n3-4Foto',
    added_beam_1260_approved_shop_drawings_between_columns_7_8_foto: 'AddedBeam1260n7-8Foto',
    stud_rails_above_column_6_rotary_foto: 'StudRailsAboveCol6Foto',

    // Page 9: Stud Rails and Space Photos
    stud_rails_above_column_5_foto: 'StudAboveCol5Foto',
    space_between_stud_electrode_foto: 'SpaceStudFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - Vistas generales de slab más grandes
    slab_reinforcement_north_south_view_foto: { maxWidth: 350, maxHeight: 250 },
    
    // FOTOS DE SLAB - Tamaño grande para refuerzos principales
    slab_reinforcement_4_12_oc_ew_bottom_foto: { maxWidth: 300, maxHeight: 220 },
    rebar_4_bottom_verified_foto: { maxWidth: 300, maxHeight: 220 },
    slab_reinforcement_5_12_oc_middle_strip_top_bars_foto: { maxWidth: 300, maxHeight: 220 },
    rebar_5_middle_strip_bars_verified_foto: { maxWidth: 300, maxHeight: 220 },
    additional_reinforcement_slab_6_10_oc_top_foto: { maxWidth: 300, maxHeight: 220 },
    rebar_6_additional_top_bars_verified_foto: { maxWidth: 300, maxHeight: 220 },
    additional_reinforcement_slab_7_10_oc_top_foto: { maxWidth: 300, maxHeight: 220 },
    rebar_7_additional_top_bars_verified_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE DETALLES - Tamaño estándar
    infill_top_bar_4_12_foto: { maxWidth: 250, maxHeight: 180 },
    infill_top_bar_4_verified_foto: { maxWidth: 250, maxHeight: 180 },
    additional_reinf_slab_6_12_oc_top_columns_portland_foto: { maxWidth: 250, maxHeight: 180 },
    additional_reinforcement_opening_tremie_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE GIRDERS - Tamaño estándar
    girder_2gt1_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    girder_2gt2_cer_foto: { maxWidth: 250, maxHeight: 180 },
    girder_2gt3_foto: { maxWidth: 250, maxHeight: 180 },
    girder_2gt4_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    girder_2gt5_2gt6_grx_foto: { maxWidth: 250, maxHeight: 180 },
    longitudinal_bottom_reinforcement_11_2l_girder_2gt2_verified_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE STIRRUPS Y BEAMS - Tamaño estándar
    stirrups_4_6_girder_2gt3_foto: { maxWidth: 250, maxHeight: 180 },
    longitudinal_bottom_reinforcement_10_girder_2gt5_verified_foto: { maxWidth: 250, maxHeight: 180 },
    longitudinal_bottom_reinforcement_11_girder_2gt3_foto: { maxWidth: 250, maxHeight: 180 },
    beam_2460_ele_r_approved_shop_drawings_07_18_24_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE ADDED BEAMS - Tamaño estándar
    added_beam_07_23_24_approved_shop_drawings_between_columns_28_29_foto: { maxWidth: 250, maxHeight: 180 },
    added_beam_1260_approved_shop_drawings_between_columns_3_4_foto: { maxWidth: 250, maxHeight: 180 },
    added_beam_1260_approved_shop_drawings_between_columns_7_8_foto: { maxWidth: 250, maxHeight: 180 },
    stud_rails_above_column_6_rotary_foto: { maxWidth: 250, maxHeight: 180 },
    stud_rails_above_column_5_foto: { maxWidth: 250, maxHeight: 180 },
    space_between_stud_electrode_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

const STEEL_MAPPING: TemplateMapping = {
  templateFile: '12STEEL.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: Structural Steel
    structural_steel_north_side_view: 'StructuralSteelH',
    description_work_location_north: 'DescriptionWorkLocationNorth',
    column_grid_lines_h15_w10x33_side1: 'ColGridLinesH,15',
    column_grid_lines_h15_w10x33_side2: 'ColGridLinesH,15(2)',

    // Page 3: Column Grid Lines and Moment Connection
    column_grid_lines_a21_w10x112_moment_connection: 'ColGridA,21',
    column_grid_lines_a21_w10x112_1_4_flange_thickness: 'ColGridA,21Flange',
    column_grid_lines_e21_w10x77_moment_connection_east: 'ColE,21',
    column_grid_lines_e21_w10x77_moment_connection_south: 'ColE,21(2)',

    // Page 4: Column Splice Plates
    column_splice_plate_in_column_flange: 'ColSpliceCol',
    column_splice_plate_in_column_web: 'ColSplicePlate',
    space_3_between_bolts_in_column: 'Space@3Bolts',
    thick_plate_3_4_at_flange_to_splice_column_w10x33: '3/4ThickPlateW10x33',

    // Page 5: Column W10x33 and TC Bolt
    column_w10x33_5_8_thick_splice_plate_at_web_portland: 'ColW10x33',
    bolt_length_tremie: 'BoltLength',
    tc_bolt_a325_and_a490_bar_11: 'BarInTheCenter',
    tensioning_tc_bolt_a325_in_splice_column_cer: 'TensionBoltA325',

    // Page 6: Beams and Girders
    beam_w12x22_grid_lines_10_i_l: 'BeamW12x22',
    beam_w12x22_grid_lines_10_i_l_electrode: 'BeamW12x22(2)',
    girder_w24x55_grid_lines_21_a_j_grout: 'GirderW24x55',
    girder_w24x55_grid_lines_21_a_j_rotary: 'GirderW24x55(2)',

    // Page 7: More Beams and Moment Connection
    beam_w12x19_grid_lines_10_c_i: 'BeamW12x19',
    beam_w12x19_grid_lines_10_c_i_electrode: 'BeamW12x19(2)',
    moment_connection_column_21_g_and_girder_21_a_j_grx: 'MomentCol21G',
    tc_bolt_3_oc_rotary: 'TCBolt@3',

    // Page 8: Galvanized Deck and Miscellaneous
    galvanized_deck_4th_floor_galvanized: 'Galvanized4th',
    galvanized_deck_5th_floor_electrode: 'Galvanized5th',
    wwf_6x6_w2_1xw2_1_grout: 'WWF6x6',
    screw_in_deck_12_rotary: 'ScrewDeck@12',

    // Page 9: Pour Stop and Drilling
    pour_stop_height_4_3_4_portland: 'PourHeight4',
    pour_stop_146a_thick_electrode: 'Pour146A',
    drill_and_epoxy_rebar_4_18_to_existing_4th_floor_slab_grx: 'DrillRebar#4@18',
    thick_18ga_galvanized_deck_rotary: '18GAFo',

    // Page 10: Shear Stud and Additional Drilling
    shear_stud_3_4_x4_pile: '1/4Shear',
    stud_30_bend_test_electrode: 'Stud30BendTest',
    drill_and_epoxy_rebar_4_18_to_existing_4th_floor_slab_grout: 'DrillRebar#4@18Floor',
    thick_18ga_galvanized_deck_rotary_2: '18GADeck',
  },

  photoButtonMappings: {
    // Page 2: Structural Steel Photos
    structural_steel_north_side_view_foto: 'StructuralSteelFoto',
    column_grid_lines_h15_w10x33_side1_foto: 'ColGridLinesH,15Foto',
    column_grid_lines_h15_w10x33_side2_foto: 'ColGridLinesH,15(2)Foto',

    // Page 3: Column Grid Lines Photos
    column_grid_lines_a21_w10x112_moment_connection_foto: 'ColGridA,21Foto',
    column_grid_lines_a21_w10x112_1_4_flange_thickness_foto: 'ColGridA,21FlangeFoto',
    column_grid_lines_e21_w10x77_moment_connection_east_foto: 'ColE,21Foto',
    column_grid_lines_e21_w10x77_moment_connection_south_foto: 'ColE,21(2)Foto',

    // Page 4: Column Splice Plates Photos
    column_splice_plate_in_column_flange_foto: 'ColSpliceColFoto',
    column_splice_plate_in_column_web_foto: 'ColSplicePlateFoto',
    space_3_between_bolts_in_column_foto: 'Space@3BoltsFoto',
    thick_plate_3_4_at_flange_to_splice_column_w10x33_foto: '3/4ThickPlateW10x33Foto',

    // Page 5: Column W10x33 and TC Bolt Photos
    column_w10x33_5_8_thick_splice_plate_at_web_portland_foto: 'ColW10x33Foto',
    bolt_length_tremie_foto: 'BoltLenghtFoto',
    tc_bolt_a325_and_a490_bar_11_foto: 'BarInTheCenterFoto',
    tensioning_tc_bolt_a325_in_splice_column_cer_foto: 'TensionBoltA325Foto',

    // Page 6: Beams and Girders Photos
    beam_w12x22_grid_lines_10_i_l_foto: 'BeamW12x22Foto',
    beam_w12x22_grid_lines_10_i_l_electrode_foto: 'BeamW12x22(2)Foto',
    girder_w24x55_grid_lines_21_a_j_grout_foto: 'GirderW24x55Foto',
    girder_w24x55_grid_lines_21_a_j_rotary_foto: 'GirderW24x55(2)Foto',

    // Page 7: More Beams and Moment Connection Photos
    beam_w12x19_grid_lines_10_c_i_foto: 'BeamW12x19Foto',
    beam_w12x19_grid_lines_10_c_i_electrode_foto: 'BeamW12x19(2)Foto',
    moment_connection_column_21_g_and_girder_21_a_j_grx_foto: 'MomentCol21GFoto',
    tc_bolt_3_oc_rotary_foto: 'TCBolt@3Foto',

    // Page 8: Galvanized Deck and Miscellaneous Photos
    galvanized_deck_4th_floor_galvanized_foto: 'Galvanized4thFoto',
    galvanized_deck_5th_floor_electrode_foto: 'Galvanized5thFoto',
    wwf_6x6_w2_1xw2_1_grout_foto: 'WWF6x6Foto',
    screw_in_deck_12_rotary_foto: 'ScrewDeck@12Foto',

    // Page 9: Pour Stop and Drilling Photos
    pour_stop_height_4_3_4_portland_foto: 'PourHeight4Foto',
    pour_stop_146a_thick_electrode_foto: 'Pour146AFoto',
    drill_and_epoxy_rebar_4_18_to_existing_4th_floor_slab_grx_foto: 'DrillRebar#4@18Foto',
    thick_18ga_galvanized_deck_rotary_foto: '18GAFoto',

    // Page 10: Shear Stud and Additional Drilling Photos
    shear_stud_3_4_x4_pile_foto: '1/4ShearFoto',
    stud_30_bend_test_electrode_foto: 'Stud30BendTestFoto',
    drill_and_epoxy_rebar_4_18_to_existing_4th_floor_slab_grout_foto: 'DrillRebar#4@18FloorFoto',
    thick_18ga_galvanized_deck_rotary_2_foto: '18GADeckFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista estructural más grande
    structural_steel_north_side_view_foto: { maxWidth: 350, maxHeight: 250 },

    // FOTOS DE COLUMNAS - Tamaño grande
    column_grid_lines_h15_w10x33_side1_foto: { maxWidth: 300, maxHeight: 220 },
    column_grid_lines_h15_w10x33_side2_foto: { maxWidth: 300, maxHeight: 220 },
    column_grid_lines_a21_w10x112_moment_connection_foto: { maxWidth: 300, maxHeight: 220 },
    column_grid_lines_a21_w10x112_1_4_flange_thickness_foto: { maxWidth: 300, maxHeight: 220 },
    column_grid_lines_e21_w10x77_moment_connection_east_foto: { maxWidth: 300, maxHeight: 220 },
    column_grid_lines_e21_w10x77_moment_connection_south_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE SPLICE PLATES Y CONEXIONES - Tamaño estándar
    column_splice_plate_in_column_flange_foto: { maxWidth: 250, maxHeight: 180 },
    column_splice_plate_in_column_web_foto: { maxWidth: 250, maxHeight: 180 },
    space_3_between_bolts_in_column_foto: { maxWidth: 250, maxHeight: 180 },
    thick_plate_3_4_at_flange_to_splice_column_w10x33_foto: { maxWidth: 250, maxHeight: 180 },
    column_w10x33_5_8_thick_splice_plate_at_web_portland_foto: { maxWidth: 250, maxHeight: 180 },
    bolt_length_tremie_foto: { maxWidth: 250, maxHeight: 180 },
    tc_bolt_a325_and_a490_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    tensioning_tc_bolt_a325_in_splice_column_cer_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE BEAMS Y GIRDERS - Tamaño estándar
    beam_w12x22_grid_lines_10_i_l_foto: { maxWidth: 250, maxHeight: 180 },
    beam_w12x22_grid_lines_10_i_l_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    girder_w24x55_grid_lines_21_a_j_grout_foto: { maxWidth: 250, maxHeight: 180 },
    girder_w24x55_grid_lines_21_a_j_rotary_foto: { maxWidth: 250, maxHeight: 180 },
    beam_w12x19_grid_lines_10_c_i_foto: { maxWidth: 250, maxHeight: 180 },
    beam_w12x19_grid_lines_10_c_i_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    moment_connection_column_21_g_and_girder_21_a_j_grx_foto: { maxWidth: 250, maxHeight: 180 },
    tc_bolt_3_oc_rotary_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE DECK Y MISCELÁNEOS - Tamaño estándar
    galvanized_deck_4th_floor_galvanized_foto: { maxWidth: 250, maxHeight: 180 },
    galvanized_deck_5th_floor_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    wwf_6x6_w2_1xw2_1_grout_foto: { maxWidth: 250, maxHeight: 180 },
    screw_in_deck_12_rotary_foto: { maxWidth: 250, maxHeight: 180 },
    pour_stop_height_4_3_4_portland_foto: { maxWidth: 250, maxHeight: 180 },
    pour_stop_146a_thick_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    drill_and_epoxy_rebar_4_18_to_existing_4th_floor_slab_grx_foto: { maxWidth: 250, maxHeight: 180 },
    thick_18ga_galvanized_deck_rotary_foto: { maxWidth: 250, maxHeight: 180 },
    shear_stud_3_4_x4_pile_foto: { maxWidth: 250, maxHeight: 180 },
    stud_30_bend_test_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    drill_and_epoxy_rebar_4_18_to_existing_4th_floor_slab_grout_foto: { maxWidth: 250, maxHeight: 180 },
    thick_18ga_galvanized_deck_rotary_2_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

// Template Mapping para 6CFS (COLD FORMED STEEL)
const CFS_MAPPING: TemplateMapping = {
  templateFile: '6CFS.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: General Views
    general_view_inspected_work: 'GeneralViewInspectedWork',
    description_work_location_north: 'DescriptionWorkLocationNorthFoto',
    south_north_view_1st_floor: 'SouthNorthView1stFloor',
    north_south_2nd_floor: 'NorthSouth2ndFloor',
    south_north_view_3rd_floor: 'SouthNorthView3rdFloor',

    // Page 3: Stud Spacing and Dimensions
    stud_spacing_verified_16: 'StudSpacing@16',
    stud_thick_achieved: 'StudThick',
    stud_dimension_verified: 'StudDimension',
    depth_floor_blocking: 'DepthFloorBlocking',

    // Page 4: Clip Angles and Gusset Plates
    clip_angle_typical_bracing: 'ClipAngleTypicalBracing',
    clip_angle_thick_achieved: 'ClipAngleThick',
    gusset_plate_2nd_floor_bar_11: 'GussetPlate2ndFloor',
    gusset_plate_1st_floor_space_between: 'GussetPlate1StFloor',

    // Page 5: Web Stiffener and Solid Blocking
    web_stiffener_floor_joist_2nd_floor_portland: 'WebStiffenerFloorJoist2ndFloor',
    web_stiffener_thick_achieved_tremie: 'WebStiffenerThick',
    solid_blocking_bar_11: 'SolidBlocking',
    solid_blocking_thick_achieved: 'SolidBlockingThick',

    // Page 6: Braced Frame and Floor Blocking
    braced_frame_br3_2nd_floor_east_side: 'BracedFrameBr3',
    plate_brace_frame_thick_achieved_electrode: 'PlateBraceFrameThick',
    floor_blocking_like_beam: 'FloorBlockingLikeBeam',
    closure_track_for_studs_rotary: 'ClosureTrackForStuds',

    // Page 7: Leveling and Braced Frame 1st Floor
    leveling_foundation_base_grout: 'LevelingFoundationBaseGrout',
    track_foundation_concrete_anchor_1_4_x_1_7_8_16_oc: 'TrackFoundationConcreteAnchor',
    braced_frame_1st_floor_north_side: 'BracedFrame1stFloorNorthSide',
    joist_web_depth_2nd_floor_rotary: 'JoistWebDepth2ndFloor',

    // Page 8: Floor Joist Spacing and Flat Strap
    floor_joist_spacing_verified_16: 'FloorJoistSpacingVerified@16',
    flat_strap_electrode: 'FlatStrap',
    spacing_typical_bracing_4_achieved_grout: 'SpacingBracing4',
    type_screw_used_field_rotary: 'TypeScrewUsed',

    // Page 9: Holdown and Strap in Blocking
    holdown_3rd_floor: 'Holdown3rdFloor',
    connection_holdown_1st_2nd_floor_north_side_electrode: 'ConectionHoldown1st2st',
    strap_blocking_grout: 'StrapBlocking',
    strap_blocking_thick_rotary: 'StrapBlockingThick',

    // Page 10: Gusset Plate Braced Walls
    gusset_plate_braced_walls: 'GussetPlateBraced',
    anchor_foundation_concrete_track: 'AnchorFoundationConcreteTrack',
  },

  photoButtonMappings: {
    // Page 2: General Views Photos
    general_view_inspected_work_foto: 'DescriptionWorkLocationNorthFoto',
    south_north_view_1st_floor_foto: 'SouthNorthView1stFloorFoto',
    north_south_2nd_floor_foto: 'NorthSouth2ndFloorFoto',
    south_north_view_3rd_floor_foto: 'SouthNorthView3rdFloorFoto',

    // Page 3: Stud Spacing and Dimensions Photos
    stud_spacing_verified_16_foto: 'StudSpacing@16Foto',
    stud_thick_achieved_foto: 'StudThickFoto',
    stud_dimension_verified_foto: 'StudDimensionFoto',
    depth_floor_blocking_foto: 'DepthFloorBlockingFoto',

    // Page 4: Clip Angles and Gusset Plates Photos
    clip_angle_typical_bracing_foto: 'ClipAngleTypicalBracingFoto',
    clip_angle_thick_achieved_foto: 'ClipAngleThickFoto',
    gusset_plate_2nd_floor_bar_11_foto: 'GussetPlate2ndFloorFoto',
    gusset_plate_1st_floor_space_between_foto: 'GussetPlate1StFloorFoto',

    // Page 5: Web Stiffener and Solid Blocking Photos
    web_stiffener_floor_joist_2nd_floor_portland_foto: 'WebStiffenerFloorJoist2ndFloorFoto',
    web_stiffener_thick_achieved_tremie_foto: 'WebStiffenerThickFoto',
    solid_blocking_bar_11_foto: 'SolidBlockingFoto',
    solid_blocking_thick_achieved_foto: 'SolidBlockingThickFoto',

    // Page 6: Braced Frame and Floor Blocking Photos
    braced_frame_br3_2nd_floor_east_side_foto: 'BracedFrameBr3Foto',
    plate_brace_frame_thick_achieved_electrode_foto: 'PlateBraceFrameThickFoto',
    floor_blocking_like_beam_foto: 'FloorBlockingLikeBeamFoto',
    closure_track_for_studs_rotary_foto: 'ClosureTrackForStudsFoto',

    // Page 7: Leveling and Braced Frame 1st Floor Photos
    leveling_foundation_base_grout_foto: 'LevelingFoundationBaseGroutFoto',
    track_foundation_concrete_anchor_1_4_x_1_7_8_16_oc_foto: 'TrackFoundationConcreteAnchorFoto',
    braced_frame_1st_floor_north_side_foto: 'BracedFrame1stFloorNorthSideFoto',
    joist_web_depth_2nd_floor_rotary_foto: 'JoistWebDepth2ndFloorFoto',

    // Page 8: Floor Joist Spacing and Flat Strap Photos
    floor_joist_spacing_verified_16_foto: 'FloorJoistSpacingVerified@16Foto',
    flat_strap_electrode_foto: 'FlatStrapFoto',
    spacing_typical_bracing_4_achieved_grout_foto: 'SpacingBracing4Foto',
    type_screw_used_field_rotary_foto: 'TypeScrewUsedFoto',

    // Page 9: Holdown and Strap in Blocking Photos
    holdown_3rd_floor_foto: 'Holdown3rdFloorFoto',
    connection_holdown_1st_2nd_floor_north_side_electrode_foto: 'ConectionHoldown1st2stFoto',
    strap_blocking_grout_foto: 'StrapBlockingFoto',
    strap_blocking_thick_rotary_foto: 'StrapBlockingThickFoto',

    // Page 10: Gusset Plate Braced Walls Photos
    gusset_plate_braced_walls_foto: 'GussetPlateBracedFoto',
    anchor_foundation_concrete_track_foto: 'AnchorFoundationConcreteTrackFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista general más grande
    general_view_inspected_work_foto: { maxWidth: 350, maxHeight: 250 },

    // FOTOS DE VISTAS GENERALES - Tamaño grande
    south_north_view_1st_floor_foto: { maxWidth: 300, maxHeight: 220 },
    north_south_2nd_floor_foto: { maxWidth: 300, maxHeight: 220 },
    south_north_view_3rd_floor_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE STUDS Y DIMENSIONES - Tamaño estándar
    stud_spacing_verified_16_foto: { maxWidth: 250, maxHeight: 180 },
    stud_thick_achieved_foto: { maxWidth: 250, maxHeight: 180 },
    stud_dimension_verified_foto: { maxWidth: 250, maxHeight: 180 },
    depth_floor_blocking_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE CLIP ANGLES Y GUSSET PLATES - Tamaño estándar
    clip_angle_typical_bracing_foto: { maxWidth: 250, maxHeight: 180 },
    clip_angle_thick_achieved_foto: { maxWidth: 250, maxHeight: 180 },
    gusset_plate_2nd_floor_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    gusset_plate_1st_floor_space_between_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE WEB STIFFENER Y BLOCKING - Tamaño estándar
    web_stiffener_floor_joist_2nd_floor_portland_foto: { maxWidth: 250, maxHeight: 180 },
    web_stiffener_thick_achieved_tremie_foto: { maxWidth: 250, maxHeight: 180 },
    solid_blocking_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    solid_blocking_thick_achieved_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE BRACED FRAME - Tamaño estándar
    braced_frame_br3_2nd_floor_east_side_foto: { maxWidth: 250, maxHeight: 180 },
    plate_brace_frame_thick_achieved_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    floor_blocking_like_beam_foto: { maxWidth: 250, maxHeight: 180 },
    closure_track_for_studs_rotary_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE LEVELING Y FOUNDATION - Tamaño estándar
    leveling_foundation_base_grout_foto: { maxWidth: 250, maxHeight: 180 },
    track_foundation_concrete_anchor_1_4_x_1_7_8_16_oc_foto: { maxWidth: 250, maxHeight: 180 },
    braced_frame_1st_floor_north_side_foto: { maxWidth: 250, maxHeight: 180 },
    joist_web_depth_2nd_floor_rotary_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE FLOOR JOIST Y FLAT STRAP - Tamaño estándar
    floor_joist_spacing_verified_16_foto: { maxWidth: 250, maxHeight: 180 },
    flat_strap_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    spacing_typical_bracing_4_achieved_grout_foto: { maxWidth: 250, maxHeight: 180 },
    type_screw_used_field_rotary_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE HOLDOWN Y STRAP - Tamaño estándar
    holdown_3rd_floor_foto: { maxWidth: 250, maxHeight: 180 },
    connection_holdown_1st_2nd_floor_north_side_electrode_foto: { maxWidth: 250, maxHeight: 180 },
    strap_blocking_grout_foto: { maxWidth: 250, maxHeight: 180 },
    strap_blocking_thick_rotary_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE GUSSET PLATE Y ANCHOR - Tamaño estándar
    gusset_plate_braced_walls_foto: { maxWidth: 250, maxHeight: 180 },
    anchor_foundation_concrete_track_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

// Template Mapping para 4SUBGRADE
const SUBGRADE_MAPPING: TemplateMapping = {
  templateFile: '4SUBGRADE.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: Area Inspection
    area_inspection_east_side: 'AreaInspectionEastSide',
    plate_compactor_used_in_field: 'PlateCompactorUsedInField',
    subgrade_inspection_performed_using_humbolt: 'SubGradeInspectionPerformedUsingHumbolt',

    // Page 3: Tonnage Verification
    tons_2_5_ft_verified_in_field: '2.5Tons/FtVerifiedField',
  },

  photoButtonMappings: {
    // Page 2: Area Inspection Photos
    area_inspection_east_side_foto: 'AreaInspectionEastSideFoto',
    plate_compactor_used_in_field_foto: 'PlateCompactorUsedInFieldFoto',
    subgrade_inspection_performed_using_humbolt_foto: 'SubGradeInspectionPerformedUsingHumboltFoto',

    // Page 3: Tonnage Verification Photo
    tons_2_5_ft_verified_in_field_foto: '2.5Tons/FtVerifiedFieldFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista del área más grande
    area_inspection_east_side_foto: { maxWidth: 350, maxHeight: 250 },

    // FOTOS DE EQUIPO Y PROCESO - Tamaño grande
    plate_compactor_used_in_field_foto: { maxWidth: 300, maxHeight: 220 },
    subgrade_inspection_performed_using_humbolt_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTO DE VERIFICACIÓN - Tamaño estándar
    tons_2_5_ft_verified_in_field_foto: { maxWidth: 300, maxHeight: 220 },
  }
};

// Template Mapping para 14Sprinkler
const SPRINKLER_MAPPING: TemplateMapping = {
  templateFile: '14Sprinkler.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: Front View and Sprinklers
    front_view_of_the_inspected_work: 'FrontInspectedWork',
    sprinkler_at_cellar_level_north_side: 'SprinklerNorthSide',
    sprinkler_on_1st_floor_south_side: 'SprinklerSouth',
    sprinkler_and_riser_on_2nd_floor_east_side: 'SprinklerRiser',

    // Page 3: Additional Sprinklers
    sprinkler_on_3rd_floor_west_side: 'Sprinkler3rdWest',
    sprinkler_and_riser_on_the_roof_floor: 'SprinklerRoserRoof',
    concealed_pendent_sprinkler_bar_11: 'ConcealedPendient',
    pendent_window_lot_3_space_between: '3Pendient',

    // Page 4: Riser Pipe Diameter
    riser_pipe_diameter_portland_cement: 'RiserPipe',
  },

  photoButtonMappings: {
    // Page 2: Front View and Sprinklers Photos
    front_view_of_the_inspected_work_foto: 'FrontInspectedWorkFoto',
    sprinkler_at_cellar_level_north_side_foto: 'SprinklerNorthSideFoto',
    sprinkler_on_1st_floor_south_side_foto: 'SprinklerSouthFoto',
    sprinkler_and_riser_on_2nd_floor_east_side_foto: 'SprinklerRiserFoto',

    // Page 3: Additional Sprinklers Photos
    sprinkler_on_3rd_floor_west_side_foto: 'Sprinkler3rdWestFoto',
    sprinkler_and_riser_on_the_roof_floor_foto: 'SprinklerRoserRoofFoto',
    concealed_pendent_sprinkler_bar_11_foto: 'ConcealedPendientFoto',
    pendent_window_lot_3_space_between_foto: '3PendientFoto',

    // Page 4: Riser Pipe Diameter Photo
    riser_pipe_diameter_portland_cement_foto: 'RiserPipeFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista frontal más grande
    front_view_of_the_inspected_work_foto: { maxWidth: 350, maxHeight: 250 },

    // FOTOS DE SPRINKLERS POR NIVEL - Tamaño grande
    sprinkler_at_cellar_level_north_side_foto: { maxWidth: 300, maxHeight: 220 },
    sprinkler_on_1st_floor_south_side_foto: { maxWidth: 300, maxHeight: 220 },
    sprinkler_and_riser_on_2nd_floor_east_side_foto: { maxWidth: 300, maxHeight: 220 },
    sprinkler_on_3rd_floor_west_side_foto: { maxWidth: 300, maxHeight: 220 },
    sprinkler_and_riser_on_the_roof_floor_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE TIPOS ESPECIALES - Tamaño estándar
    concealed_pendent_sprinkler_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    pendent_window_lot_3_space_between_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTO DE RISER - Tamaño estándar
    riser_pipe_diameter_portland_cement_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

// Template Mapping para 15CMU
const CMU_MAPPING: TemplateMapping = {
  templateFile: '15CMU.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: CMU Inspection Items
    cmu_in_compact_room: 'CmuInCompactRoom',
    cmu_between_grids_d_1_5: 'CmuBetweenGrids',
    cmu_depth: 'CmuDepth',
    cmu_height: 'CmuHeight',

    // Page 3: CMU Specifications
    cmu_length: 'CmuLenght',
    joint_reinforcement_added_every_two_layers_cmu_in_length_direction: 'JointReinfAdded',
    type_5_cement_used_for_grouting: 'TypeCement',
    electrical_mixer_for_mortar: 'ElectricalMixer',

    // Page 4: CMU Work Progress
    cmu_wall_work_in_progress: 'CmuWallWork',
    dowels_36_provided_achieved: 'Dowels@36',
  },

  photoButtonMappings: {
    // Page 2: CMU Inspection Photos
    cmu_in_compact_room_foto: 'CmuCompactRoomFoto',
    cmu_between_grids_d_1_5_foto: 'Foto',
    cmu_depth_foto: 'CmuDepthFoto',
    cmu_height_foto: 'CmuHeightFoto',

    // Page 3: CMU Specifications Photos
    cmu_length_foto: 'CmuLenghtFoto',
    joint_reinforcement_added_every_two_layers_cmu_in_length_direction_foto: 'JointReinfAddedFoto',
    type_5_cement_used_for_grouting_foto: 'TypeCementFoto',
    electrical_mixer_for_mortar_foto: 'ElectricalMixerFoto',

    // Page 4: CMU Work Progress Photos
    cmu_wall_work_in_progress_foto: 'CmuWallWorkFoto',
    dowels_36_provided_achieved_foto: 'Dowels@36Foto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - CMU vistas generales más grandes
    cmu_in_compact_room_foto: { maxWidth: 350, maxHeight: 250 },
    cmu_between_grids_d_1_5_foto: { maxWidth: 350, maxHeight: 250 },

    // FOTOS DE DIMENSIONES - Tamaño grande para mediciones
    cmu_depth_foto: { maxWidth: 300, maxHeight: 220 },
    cmu_height_foto: { maxWidth: 300, maxHeight: 220 },
    cmu_length_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE ESPECIFICACIONES - Tamaño estándar
    joint_reinforcement_added_every_two_layers_cmu_in_length_direction_foto: { maxWidth: 250, maxHeight: 180 },
    type_5_cement_used_for_grouting_foto: { maxWidth: 250, maxHeight: 180 },
    electrical_mixer_for_mortar_foto: { maxWidth: 250, maxHeight: 180 },

    // FOTOS DE PROGRESO - Tamaño estándar
    cmu_wall_work_in_progress_foto: { maxWidth: 250, maxHeight: 180 },
    dowels_36_provided_achieved_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

// Template Mapping para 17HVACMechanicalInterior
const HVAC_MECHANICAL_INTERIOR_MAPPING: TemplateMapping = {
  templateFile: '17HVACMechanicalIndoor.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    temperature: 'Temp',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: VRF Systems and Controllers
    vrf_oa_17_north_side: 'VRF0A-17',
    vrf_branch_controller: 'VRFBranchController',
    exhaust_duct_plenum_space: 'ExhaustDuctPlenum',
    fire_damper_1st_floor: 'FireDamper1stFloor',

    // Page 3: VRF Outdoor and Indoor Units
    vrf_outdoor_air_1st_floor_depth: 'VRF1StFloor',
    vrf_outdoor_air_1st_floor_27_2: 'VRF1StFloor1StFloor',
    vrf_indoor_units_1st_floor_14_2: 'VRFIndoor1StFloor',
    vrf_indoor_units_ncr1_14_11: 'VRFIndoorNRC1',

    // Page 4: Air Curtain Fans and VRF Branch Controllers
    air_curtain_fans_1st_floor: 'AirCurtain1stFloor',
    air_curtain_fans_1st_floor_24: 'AirCurtain1StFloor2',
    vrf_branch_controllers_bar_11: 'VRFBranch1StFloor',
    vrf_branch_controllers_ncr2_space: 'VRFBranch1StFloorNRC2',
  },

  photoButtonMappings: {
    // Page 2: VRF Systems and Controllers Photos
    vrf_oa_17_north_side_foto: 'VRF0A-17Foto',
    vrf_branch_controller_foto: 'VRFBranchControllerFoto',
    exhaust_duct_plenum_space_foto: 'ExhaustDuctPlenumFoto',
    fire_damper_1st_floor_foto: 'FireDamper1stFloorFoto',

    // Page 3: VRF Outdoor and Indoor Units Photos
    vrf_outdoor_air_1st_floor_depth_foto: 'VRF1StFloorFoto',
    vrf_outdoor_air_1st_floor_27_2_foto: 'VRF1StFloor1StFloorFoto',
    vrf_indoor_units_1st_floor_14_2_foto: 'VRFIndoor1StFloorFoto',
    vrf_indoor_units_ncr1_14_11_foto: 'VRFIndoorNRC1Foto',

    // Page 4: Air Curtain Fans and VRF Branch Controllers Photos
    air_curtain_fans_1st_floor_foto: 'PileThickFoto',
    air_curtain_fans_1st_floor_24_foto: 'AirCurtain1StFloor2Foto',
    vrf_branch_controllers_bar_11_foto: 'VRFBranch1StFloorFoto',
    vrf_branch_controllers_ncr2_space_foto: 'VRFBranch1StFloorNRC2Foto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS PRINCIPALES - VRF Systems más grandes
    vrf_oa_17_north_side_foto: { maxWidth: 300, maxHeight: 220 },
    vrf_branch_controller_foto: { maxWidth: 300, maxHeight: 220 },
    
    // FOTOS DE EQUIPOS - Tamaño estándar para HVAC
    exhaust_duct_plenum_space_foto: { maxWidth: 250, maxHeight: 180 },
    fire_damper_1st_floor_foto: { maxWidth: 250, maxHeight: 180 },
    vrf_outdoor_air_1st_floor_depth_foto: { maxWidth: 250, maxHeight: 180 },
    vrf_outdoor_air_1st_floor_27_2_foto: { maxWidth: 250, maxHeight: 180 },
    vrf_indoor_units_1st_floor_14_2_foto: { maxWidth: 250, maxHeight: 180 },
    vrf_indoor_units_ncr1_14_11_foto: { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE AIR CURTAIN Y BRANCH CONTROLLERS - Tamaño estándar
    air_curtain_fans_1st_floor_foto: { maxWidth: 250, maxHeight: 180 },
    air_curtain_fans_1st_floor_24_foto: { maxWidth: 250, maxHeight: 180 },
    vrf_branch_controllers_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    vrf_branch_controllers_ncr2_space_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

// Template Mapping para 18HVACMechanicalOutdoors
const HVAC_MECHANICAL_OUTDOORS_MAPPING: TemplateMapping = {
  templateFile: '18HVACMechanicalOutdoors.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    temperature: 'Temp',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: General View Segment 1 and 2
    general_view_segment_1_2: 'GeneralView1-2',
    condenser_1_5_acuc_c_ncr1: 'Condenser1-5',
    condenser_1_5_acuc_c_ncr1_2: 'Condenser1-5(2)',

    // Page 3: Condenser 1-6/ACUC-C (NCR-1)
    condenser_1_6_acuc_c_left: 'Condenser1-6',
    condenser_1_6_acuc_c_27_2_right: 'Condenser1-6(2)',
    condenser_1_7_acuc_c_14_2_east: 'Condenser1-7',
    condenser_1_7_acuc_c_14_11_south: 'Condenser1-7(2)',

    // Page 4: Condenser 1-4 and Ventilation Systems
    condenser_1_4_acuc_c: 'Condenser1-4',
    condenser_1_4_acuc_c_24_1: 'Condenser1-4(2)',
    gravity_intake_vent_bar_11: 'GravityIntake',
    exhaust_duct_hoods_space: 'ExhaustDuct',
  },

  photoButtonMappings: {
    // Page 2: General View Segment 1 and 2 Photos
    general_view_segment_1_2_foto: 'GeneralView1-2Foto',
    condenser_1_5_acuc_c_ncr1_foto: 'Condenser1-5Foto',
    condenser_1_5_acuc_c_ncr1_2_foto: 'Condenser1-5(2)Foto',

    // Page 3: Condenser 1-6/ACUC-C (NCR-1) Photos
    condenser_1_6_acuc_c_left_foto: 'Condenser1-6Foto',
    condenser_1_6_acuc_c_27_2_right_foto: 'Condenser1-6(2)Foto',
    condenser_1_7_acuc_c_14_2_east_foto: 'Condenser1-7Foto',
    condenser_1_7_acuc_c_14_11_south_foto: 'Condenser1-7(2)Foto',

    // Page 4: Condenser 1-4 and Ventilation Systems Photos
    condenser_1_4_acuc_c_foto: 'Condenser1-4Foto',
    condenser_1_4_acuc_c_24_1_foto: 'Condenser1-4(2)Foto',
    gravity_intake_vent_bar_11_foto: 'GravityIntakeFoto',
    exhaust_duct_hoods_space_foto: 'ExhaustDuctFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTO PRINCIPAL - Vista general más grande
    general_view_segment_1_2_foto: { maxWidth: 350, maxHeight: 250 },

    // FOTOS DE CONDENSADORES - Tamaño grande para unidades principales
    condenser_1_5_acuc_c_ncr1_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_5_acuc_c_ncr1_2_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_6_acuc_c_left_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_6_acuc_c_27_2_right_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_7_acuc_c_14_2_east_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_7_acuc_c_14_11_south_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_4_acuc_c_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_4_acuc_c_24_1_foto: { maxWidth: 300, maxHeight: 220 },
    
    // FOTOS DE SISTEMAS DE VENTILACIÓN - Tamaño estándar
    gravity_intake_vent_bar_11_foto: { maxWidth: 250, maxHeight: 180 },
    exhaust_duct_hoods_space_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

// Template Mapping para 18.1HVACMechanicalOutdoors34
const HVAC_MECHANICAL_OUTDOORS_34_MAPPING: TemplateMapping = {
  templateFile: '18.1HVACMechanicalOutdoors34.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    temperature: 'Temp',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: RTU Units (Roof Top Units)
    rtu_1_north_side: 'RTU1',
    rtu_2: 'RTU2',
    rtu_3_east_side: 'RTU3',
    rtu_4: 'RTU4',

    // Page 3: Exhaust Fan SPX-1 and Condenser 1-17
    exhaust_fan_spx1_depth: 'ExhaustSPX1',
    exhaust_fan_spx1_27_2_north: 'ExhaustSPX12',
    condenser_1_17_accu_b_14_2_east: 'CondenserAccuB',
    condenser_1_17_accu_b_14_11_south: 'CondenserAccuB2',

    // Page 4: Condenser 1-11 and 1-13 ACCU-C
    condenser_1_11_accu_c: 'CondenserAccuC',
    condenser_1_11_accu_c_24_1: 'CondenserAccuC2',
    condenser_1_13_accu_c: 'CondenserAccuC1-13',
    condenser_1_13_accu_c_24: 'CondenserAccuC1-13(2)',

    // Page 5: Condenser 1-12 ACCU-C
    condenser_1_12_accu_c: 'CondenserAccuC1-12',
    condenser_1_12_accu_c_24: 'CondenserAccuC1-12(2)',
  },

  photoButtonMappings: {
    // Page 2: RTU Units Photos
    rtu_1_north_side_foto: 'RTU1Foto',
    rtu_2_foto: 'RTU2Foto',
    rtu_3_east_side_foto: 'RTU3Foto',
    rtu_4_foto: 'RTU4Foto',

    // Page 3: Exhaust Fan SPX-1 and Condenser 1-17 Photos
    exhaust_fan_spx1_depth_foto: 'ExhaustSPX1Foto',
    exhaust_fan_spx1_27_2_north_foto: 'ExhaustSPX12Foto',
    condenser_1_17_accu_b_14_2_east_foto: 'CondenserAccuBFoto',
    condenser_1_17_accu_b_14_11_south_foto: 'CondenserAccuB2Foto',

    // Page 4: Condenser 1-11 and 1-13 ACCU-C Photos
    condenser_1_11_accu_c_foto: 'CondenserAccuCFoto',
    condenser_1_11_accu_c_24_1_foto: 'CondenserAccuC2Foto',
    condenser_1_13_accu_c_foto: 'CondenserAccuC1-13Foto',
    condenser_1_13_accu_c_24_foto: 'CondenserAccuC1-13(2)Foto',

    // Page 5: Condenser 1-12 ACCU-C Photos
    condenser_1_12_accu_c_foto: 'CondenserAccuC1-12Foto',
    condenser_1_12_accu_c_24_foto: 'CondenserAccuC1-12(2)Foto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS DE RTU UNITS - Tamaño grande para unidades principales de azotea
    rtu_1_north_side_foto: { maxWidth: 300, maxHeight: 220 },
    rtu_2_foto: { maxWidth: 300, maxHeight: 220 },
    rtu_3_east_side_foto: { maxWidth: 300, maxHeight: 220 },
    rtu_4_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE EXHAUST FAN - Tamaño grande para ventiladores
    exhaust_fan_spx1_depth_foto: { maxWidth: 300, maxHeight: 220 },
    exhaust_fan_spx1_27_2_north_foto: { maxWidth: 300, maxHeight: 220 },
    
    // FOTOS DE CONDENSADORES ACCU-B - Tamaño grande para unidades principales
    condenser_1_17_accu_b_14_2_east_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_17_accu_b_14_11_south_foto: { maxWidth: 300, maxHeight: 220 },

    // FOTOS DE CONDENSADORES ACCU-C - Tamaño grande para series múltiples
    condenser_1_11_accu_c_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_11_accu_c_24_1_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_13_accu_c_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_13_accu_c_24_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_12_accu_c_foto: { maxWidth: 300, maxHeight: 220 },
    condenser_1_12_accu_c_24_foto: { maxWidth: 300, maxHeight: 220 },
  }
};

// Template Mapping para 19HVACDucts
const HVAC_DUCTS_MAPPING: TemplateMapping = {
  templateFile: '19HVACDucts.pdf',

  fieldMappings: {
    // Page 1: General Information
    department_name: 'DepartmentName',
    inspection_report_number: 'Report#',
    project_address: 'DeptProject',
    contractor_name: 'DeptContractor',
    site_information: 'DeptInformation',
    inspection_date: 'Date',
    date_of_issuance: 'DateEmision',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
    temperature: 'Temp',
    inspector_name: 'Inspector',
    structural_element_location: 'Struct/Item',
    inspection_description: 'DescriptionInspection',
    notes_and_samples: 'Notes',

    // Page 2: HVAC Ducts and Fire Safety Systems
    horizontal_toilet_exhaust: 'HorizontalToiletExhaust',
    concealed_sprinkler_head: 'ConcealedSprinklerHead',
    sprinkler_elevator_lobby: 'SprinklerElevatorLobby',
    fire_pump_cellar_level: 'FirePumpCellarLevel',

    // Page 3: Sealant Applications and Plumbing
    sealant_applied_duct_opening_connections: 'SealantAppliedDuctOpeningConnections',
    sealant_applied_27_2_north: 'SealantApplied',
    plumbing_pipe_bathroom_14: 'PlumbingPipeBathroom',
    fire_stopping_plumbing_pipe_14: 'FireStoppingPlumbingPipe',

    // Page 4: Fire-Stopping Systems
    fire_stopping_wires: 'FireStoppingWires',
    sealant_used_24_long: 'SealantUsed',
  },

  photoButtonMappings: {
    // Page 2: HVAC Ducts and Fire Safety Systems Photos
    horizontal_toilet_exhaust_foto: 'HorizontalToiletExhaustFoto',
    concealed_sprinkler_head_foto: 'ConcealedSprinklerHeadFoto',
    sprinkler_elevator_lobby_foto: 'SprinklerElevatorLobbyFoto',
    fire_pump_cellar_level_foto: 'FirePumpCellarLevelFoto',

    // Page 3: Sealant Applications and Plumbing Photos
    sealant_applied_duct_opening_connections_foto: 'SealantAppliedDuctOpeningConnectionsFoto',
    sealant_applied_27_2_north_foto: 'SealantAppliedFoto',
    plumbing_pipe_bathroom_14_foto: 'PlumbingPipeBathroomFoto',
    fire_stopping_plumbing_pipe_14_foto: 'FireStoppingPlumbingPipeFoto',

    // Page 4: Fire-Stopping Systems Photos
    fire_stopping_wires_foto: 'FireStoppingWiresFoto',
    sealant_used_24_long_foto: 'SealantUsedFoto',
  },

  checkboxMappings: {
    deviation_design_documents: 'Check Box 1',
    significant_observations: 'Check Box 2',
    work_improperly_executed: 'Check Box 3',
    unsafe_job_conditions: 'Check Box 4',
    precautions_taken: 'Check Box 5',
  },

  dropdownMappings: {
    department_name: 'DepartmentName',
    arrival_time: 'ArrivalTime',
    departure_time: 'DepartureTime',
    weather_conditions: 'Weather',
  },

  dropdownValueMappings: {
    arrival_time: {
      '8:00 am': '8:00 am',
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
    },
    departure_time: {
      '9:00 am': '9:00 am',
      '10:00 am': '10:00 am',
      '11:00 am': '11:00 am',
      '12:00 pm': '12:00 pm',
      '1:00 pm': '1:00 pm',
      '2:00 pm': '2:00 pm',
      '3:00 pm': '3:00 pm',
      '4:00 pm': '4:00 pm',
      '5:00 pm': '5:00 pm',
      '6:00 pm': '6:00 pm',
    },
    weather_conditions: {
      'Sunny': 'Sunny',
      'Cloudy': 'Cloudy',
      'Rainy': 'Rainy',
      'Fair': 'Fair',
    }
  },

  specialFields: [
    { name: 'Date', value: (data: any) => data.inspection_date || new Date().toLocaleDateString() },
    { name: 'Temp', value: (data: any) => data.temperature || '' },
    { name: 'DateEmision', value: (data: any) => data.date_of_issuance || new Date().toLocaleDateString() },
  ],

  photoSizeConstraints: {
    // FOTOS DE SISTEMAS DE DUCTOS - Tamaño grande para sistemas principales
    horizontal_toilet_exhaust_foto: { maxWidth: 300, maxHeight: 220 },
    concealed_sprinkler_head_foto: { maxWidth: 300, maxHeight: 220 },
    sprinkler_elevator_lobby_foto: { maxWidth: 300, maxHeight: 220 },
    fire_pump_cellar_level_foto: { maxWidth: 300, maxHeight: 220 },
    
    // FOTOS DE SELLADORES Y APLICACIONES - Tamaño estándar
    sealant_applied_duct_opening_connections_foto: { maxWidth: 250, maxHeight: 180 },
    sealant_applied_27_2_north_foto: { maxWidth: 250, maxHeight: 180 },
    plumbing_pipe_bathroom_14_foto: { maxWidth: 250, maxHeight: 180 },
    fire_stopping_plumbing_pipe_14_foto: { maxWidth: 250, maxHeight: 180 },
    
    // FOTOS DE FIRE-STOPPING - Tamaño estándar
    fire_stopping_wires_foto: { maxWidth: 250, maxHeight: 180 },
    sealant_used_24_long_foto: { maxWidth: 250, maxHeight: 180 },
  }
};

export const TEMPLATE_MAPPINGS: Record<string, TemplateMapping> = {
  'secant-pile-template.pdf': SECANT_PILE_MAPPING,
  '3UNDERPINNING.pdf': UNDERPINNING_MAPPING,
  '5ELEVATOR_PIT.pdf': ELEVATOR_PIT_MAPPING,
  '5.1MAT_SLAB.pdf': MAT_SLAB_MAPPING,
  '13WALLSTRIP.pdf': WALL_STRIP_MAPPING,
  '9GRADE_BEAM.pdf': GRADE_BEAM_MAPPING,
  '8FOUNDATION_WALL.pdf': FOUNDATION_WALL_MAPPING,
  '11SHEAR_WALL.pdf': SHEAR_WALL_MAPPING,
  '10COLUMNS.pdf': COLUMNS_MAPPING,
  '7BEAMS.pdf': BEAMS_MAPPING,
  '12STEEL.pdf': STEEL_MAPPING,
  '6CFS.pdf': CFS_MAPPING,
  '4SUBGRADE.pdf': SUBGRADE_MAPPING,
  '14Sprinkler.pdf': SPRINKLER_MAPPING,
  '15CMU.pdf': CMU_MAPPING,
  '17HVACMechanicalIndoor.pdf': HVAC_MECHANICAL_INTERIOR_MAPPING,
  '18HVACMechanicalOutdoors.pdf': HVAC_MECHANICAL_OUTDOORS_MAPPING,
  '18.1HVACMechanicalOutdoors34.pdf': HVAC_MECHANICAL_OUTDOORS_34_MAPPING,
  '19HVACDucts.pdf': HVAC_DUCTS_MAPPING,
};

// FUNCIÓN HELPER PARA OBTENER EL MAPPING DE UNA PLANTILLA
export function getTemplateMapping(templateFile: string): TemplateMapping | null {
  return TEMPLATE_MAPPINGS[templateFile] || null;
}

// FUNCIÓN PARA OBTENER TODOS LOS NOMBRES DE PLANTILLAS DISPONIBLES
export function getAvailableTemplates(): string[] {
  return Object.keys(TEMPLATE_MAPPINGS);
}

// FUNCIÓN PARA INSPECCIONAR PLANTILLA ESPECÍFICA
export function inspectTemplateMapping(templateFile: string): void {
  const mapping = getTemplateMapping(templateFile);
  
  if (!mapping) {
    console.log(`❌ No mapping found for template: ${templateFile}`);
    return;
  }
  
  console.log(`🔍 === TEMPLATE MAPPING INSPECTION: ${templateFile} ===`);
  console.log(`📄 Template File: ${mapping.templateFile}`);
  console.log(`📝 Field Mappings: ${Object.keys(mapping.fieldMappings).length}`);
  console.log(`📸 Photo Button Mappings: ${Object.keys(mapping.photoButtonMappings).length}`);
  console.log(`☑️ Checkbox Mappings: ${Object.keys(mapping.checkboxMappings).length}`);
  console.log(`📋 Dropdown Mappings: ${Object.keys(mapping.dropdownMappings).length}`);
  console.log(`⚙️ Special Fields: ${mapping.specialFields?.length || 0}`);
  console.log(`📐 Photo Size Constraints: ${Object.keys(mapping.photoSizeConstraints || {}).length}`);
  
  // Mostrar constraints específicos
  if (mapping.photoSizeConstraints) {
    console.log('\n📐 Photo Size Constraints:');
    Object.entries(mapping.photoSizeConstraints).forEach(([field, constraint]) => {
      console.log(`  - ${field}: ${constraint.maxWidth}x${constraint.maxHeight}`);
    });
  }
}
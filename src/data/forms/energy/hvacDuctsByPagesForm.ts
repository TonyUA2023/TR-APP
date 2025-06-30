// src/data/forms/energy/hvacDuctsByPages.ts
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const hvacDuctsByPagesForm: InspectionForm = {
  id: 'hvac-ducts-pages',
  name: 'Inspección de Ductos de HVAC',
  description: 'HVAC Ducts inspection organized by PDF template pages including fire safety systems',
  categoryId: 'energy',
  estimatedTime: 25,
  pdfTemplate: '19HVACDucts.pdf',
  
  fields: [
    // ========== PÁGINA 1: INFORMACIÓN GENERAL ==========
    {
      id: 'department_name',
      type: 'select',
      label: 'Project Location',
      section: 'Page 1: General Information',
      required: false,
      options: [
        '109 Montgomery St',
        '1140 Dekalb Av.',
        '124 9th Street',
        '150-13 89th Ave .Jamaica',
        '1668 59th St',
        '1702 Newkirk Ave',
        '255 West 34th',
        '263 W 34th Street',
        '2702 W 15th St.',
        '2813 Tilden',
        '316 Sumpter',
        '343 Ralph av.',
        '376-378 Flushing av.',
        '441 4th av.',
        '46-32 Vernon Blvd',
        '49-51 Chambers St.',
        '633 Marcy Ave',
        '714 Jefferson ave',
        '84 14 Street',
        '89 North 4th Street',
        '934 46th st'
      ],
      placeholder: 'Select project location',
      description: undefined,
      maxImages: false
    },
    {
      id: 'inspection_report_number',
      type: 'text',
      label: 'Inspection Report #',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter report number',
      description: undefined,
      maxImages: false
    },
    {
      id: 'project_address',
      type: 'textarea',
      label: 'Project Address',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter complete project address',
      description: undefined,
      maxImages: false
    },
        {
      id: 'site_information',
      type: 'textarea',
      label: 'Site Information',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter site/building information',
      description: undefined,
      maxImages: false
    },
    {
      id: 'contractor_name',
      type: 'textarea',
      label: 'Contractor Name',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter contractor company name',
      description: undefined,
      maxImages: false
    },

    {
      id: 'inspection_date',
      type: 'date',
      label: 'Date of Inspection',
      section: 'Page 1: General Information',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'date_of_issuance',
      type: 'date',
      label: 'Date of Issuance',
      section: 'Page 1: General Information',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'arrival_time',
      type: 'select',
      label: 'Time of Arrival',
      section: 'Page 1: General Information',
      options: [
        '8:00 am',
        '9:00 am',
        '10:00 am',
        '11:00 am',
        '12:00 pm',
        '1:00 pm',
        '2:00 pm',
        '3:00 pm',
        '4:00 pm'
      ],
      placeholder: 'Select arrival time',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'departure_time',
      type: 'select',
      label: 'Time of Departure',
      section: 'Page 1: General Information',
      options: [
        '9:00 am',
        '10:00 am',
        '11:00 am',
        '12:00 pm',
        '1:00 pm',
        '2:00 pm',
        '3:00 pm',
        '4:00 pm',
        '5:00 pm',
        '6:00 pm'
      ],
      placeholder: 'Select departure time',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'weather_conditions',
      type: 'select',
      label: 'Weather Conditions',
      section: 'Page 1: General Information',
      options: ['Sunny', 'Cloudy', 'Fair', 'Rainy'],
      placeholder: 'Select weather',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'temperature',
      type: 'text',
      label: 'Temperature',
      section: 'Page 1: General Information',
      placeholder: 'e.g., 72°F',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'inspector_name',
      type: 'text',
      label: 'Inspector Name',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter inspector full name',
      description: undefined,
      maxImages: false
    },
    {
      id: 'structural_element_location',
      type: 'textarea',
      label: 'Structural Element/Item Inspected & Work Location',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Describe HVAC ducts, fire safety systems and work location',
      description: undefined,
      maxImages: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the HVAC ducts and fire safety inspection performed',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'deviation_design_documents',
      type: 'boolean',
      label: 'Deviations from the design documents',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'significant_observations',
      type: 'boolean',
      label: 'Significant observations contradicting anticipated field conditions',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'work_improperly_executed',
      type: 'boolean',
      label: 'Any work improperly executed',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'unsafe_job_conditions',
      type: 'boolean',
      label: 'Any unsafe job conditions',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'precautions_taken',
      type: 'boolean',
      label: 'Any precautions taken to maintain safe conditions',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'notes_and_samples',
      type: 'textarea',
      label: 'Notes & Description of Samples Obtained if Any',
      section: 'Page 1: General Information',
      placeholder: 'Enter any additional notes or sample descriptions',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'inspector_signature',
      type: 'signature',
      label: 'Inspector Signature',
      section: 'Page 1: General Information',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 2: HVAC DUCTS AND FIRE SAFETY SYSTEMS ==========
    {
      id: 'horizontal_toilet_exhaust',
      type: 'text',
      label: 'HORIZONTAL TOILET EXHAUST - SE',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      placeholder: 'Description of horizontal toilet exhaust system',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'horizontal_toilet_exhaust_foto',
      type: 'image',
      label: 'HORIZONTAL TOILET EXHAUST - Photo',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'concealed_sprinkler_head',
      type: 'text',
      label: 'CONCEALED SPRINKLER HEAD',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      placeholder: 'Description of concealed sprinkler head installation',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'concealed_sprinkler_head_foto',
      type: 'image',
      label: 'CONCEALED SPRINKLER HEAD - Photo',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'sprinkler_elevator_lobby',
      type: 'text',
      label: 'SPRINKLER IN ELEVATOR LOBBY - SE',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      placeholder: 'Description of sprinkler system in elevator lobby',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'sprinkler_elevator_lobby_foto',
      type: 'image',
      label: 'SPRINKLER IN ELEVATOR LOBBY - Photo',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'fire_pump_cellar_level',
      type: 'text',
      label: 'FIRE-PUMP LOCATED IN CELLAR LEVER',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      placeholder: 'Description of fire pump located in cellar level',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'fire_pump_cellar_level_foto',
      type: 'image',
      label: 'FIRE-PUMP IN CELLAR LEVER - Photo',
      section: 'Page 2: HVAC Ducts and Fire Safety Systems',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 3: SEALANT APPLICATIONS AND PLUMBING ==========
    {
      id: 'sealant_applied_duct_opening_connections',
      type: 'text',
      label: 'SEALANT APPLIED IN DUCT AT THE OPENING AND CONNECTIONS',
      section: 'Page 3: Sealant Applications and Plumbing',
      placeholder: 'Description of sealant application in duct openings and connections',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'sealant_applied_duct_opening_connections_foto',
      type: 'image',
      label: 'SEALANT APPLIED IN DUCT - Photo',
      section: 'Page 3: Sealant Applications and Plumbing',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'sealant_applied_27_2_north',
      type: 'text',
      label: 'SEALANT APPLIED - 27\' 2" DEPTH ORTH SIDE',
      section: 'Page 3: Sealant Applications and Plumbing',
      placeholder: 'Description of sealant applied at 27\' 2" depth on north side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'sealant_applied_27_2_north_foto',
      type: 'image',
      label: 'SEALANT APPLIED 27\' 2" - Photo',
      section: 'Page 3: Sealant Applications and Plumbing',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'plumbing_pipe_bathroom_14',
      type: 'text',
      label: 'PLUMBING PIPE IN BATHROOM - 14\' SIDE',
      section: 'Page 3: Sealant Applications and Plumbing',
      placeholder: 'Description of plumbing pipe installation in bathroom at 14\' side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'plumbing_pipe_bathroom_14_foto',
      type: 'image',
      label: 'PLUMBING PIPE IN BATHROOM - Photo',
      section: 'Page 3: Sealant Applications and Plumbing',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'fire_stopping_plumbing_pipe_14',
      type: 'text',
      label: 'FIRE-STOPPING IN PLUMBING PIPE - 14\' SIDE',
      section: 'Page 3: Sealant Applications and Plumbing',
      placeholder: 'Description of fire-stopping application in plumbing pipe at 14\' side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'fire_stopping_plumbing_pipe_14_foto',
      type: 'image',
      label: 'FIRE-STOPPING IN PLUMBING PIPE - Photo',
      section: 'Page 3: Sealant Applications and Plumbing',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 4: FIRE-STOPPING SYSTEMS ==========
    {
      id: 'fire_stopping_wires',
      type: 'text',
      label: 'FIRE-STOPPING IN WIRES',
      section: 'Page 4: Fire-Stopping Systems',
      placeholder: 'Description of fire-stopping application in electrical wires',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'fire_stopping_wires_foto',
      type: 'image',
      label: 'FIRE-STOPPING IN WIRES - Photo',
      section: 'Page 4: Fire-Stopping Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'sealant_used_24_long',
      type: 'text',
      label: 'SEALANT USED - 24\' LONG OR PILE',
      section: 'Page 4: Fire-Stopping Systems',
      placeholder: 'Description of sealant used at 24\' long or pile location',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'sealant_used_24_long_foto',
      type: 'image',
      label: 'SEALANT USED 24\' LONG - Photo',
      section: 'Page 4: Fire-Stopping Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
  ],
};
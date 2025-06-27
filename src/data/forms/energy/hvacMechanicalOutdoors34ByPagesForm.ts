// src/data/forms/energy/hvacMechanicalOutdoors34ByPages.ts
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const hvacMechanicalOutdoors34ByPagesForm: InspectionForm = {
  id: 'hvac-mechanical-outdoors-segments-3-4-pages',
  name: 'Inspección final de las unidades exteriores mecánicas de HVAC Segmentos 3 y 4',
  description: 'HVAC Mechanical Outdoors inspection for Segments 3 and 4 organized by PDF template pages',
  categoryId: 'energy',
  estimatedTime: 35,
  pdfTemplate: '18.1HVACMechanicalOutdoors34.pdf',
  
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
      id: 'contractor_name',
      type: 'text',
      label: 'Contractor Name',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter contractor company name',
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
      placeholder: 'Describe HVAC outdoor elements and work location for Segments 3 and 4',
      description: undefined,
      maxImages: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the outdoor HVAC inspection performed for Segments 3 and 4',
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

    // ========== PÁGINA 2: RTU UNITS ==========
    {
      id: 'rtu_1_secant_pile_north',
      type: 'text',
      label: 'RTU-1 - SECANT PILE NORTH SIDE',
      section: 'Page 2: RTU Units',
      placeholder: 'Description of RTU-1 unit on north side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'rtu_1_secant_pile_north_foto',
      type: 'image',
      label: 'RTU-1 NORTH SIDE - Photo',
      section: 'Page 2: RTU Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'rtu_2',
      type: 'text',
      label: 'RTU-2',
      section: 'Page 2: RTU Units',
      placeholder: 'Description of RTU-2 unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'rtu_2_foto',
      type: 'image',
      label: 'RTU-2 - Photo',
      section: 'Page 2: RTU Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'rtu_3_secant_pile_east',
      type: 'text',
      label: 'RTU-3 - SECANT PILE EAST SIDE',
      section: 'Page 2: RTU Units',
      placeholder: 'Description of RTU-3 unit on east side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'rtu_3_secant_pile_east_foto',
      type: 'image',
      label: 'RTU-3 EAST SIDE - Photo',
      section: 'Page 2: RTU Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'rtu_4',
      type: 'text',
      label: 'RTU-4',
      section: 'Page 2: RTU Units',
      placeholder: 'Description of RTU-4 unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'rtu_4_foto',
      type: 'image',
      label: 'RTU-4 - Photo',
      section: 'Page 2: RTU Units',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 3: EXHAUST FAN SPX-1 AND CONDENSER 1-17 ==========
    {
      id: 'exhaust_fan_spx1_depth_pile',
      type: 'text',
      label: 'EXHAUST FAN SPX-1 - DEPTH PILE',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      placeholder: 'Description of exhaust fan SPX-1 depth pile',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'exhaust_fan_spx1_depth_pile_foto',
      type: 'image',
      label: 'EXHAUST FAN SPX-1 DEPTH - Photo',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'exhaust_fan_spx1_27_2_north',
      type: 'text',
      label: 'EXHAUST FAN SPX-1 - 27\' 2" DEPTH ORTH SIDE',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      placeholder: 'Description of exhaust fan SPX-1 27\' 2" north side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'exhaust_fan_spx1_27_2_north_foto',
      type: 'image',
      label: 'EXHAUST FAN SPX-1 27\' 2" - Photo',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_17_accu_b_14_2_st',
      type: 'text',
      label: 'CONDENSER 1-17/ACCU-B (NCR-1) - 14\' 2" ST SIDE',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      placeholder: 'Description of condenser 1-17 ACCU-B 14\' 2"',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_17_accu_b_14_2_st_foto',
      type: 'image',
      label: 'CONDENSER 1-17/ACCU-B 14\' 2" - Photo',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_17_accu_b_14_11_uth',
      type: 'text',
      label: 'CONDENSER 1-17/ACCU-B (NCR-1) - 14\' 11" UTH SIDE',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      placeholder: 'Description of condenser 1-17 ACCU-B 14\' 11"',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_17_accu_b_14_11_uth_foto',
      type: 'image',
      label: 'CONDENSER 1-17/ACCU-B 14\' 11" - Photo',
      section: 'Page 3: Exhaust Fan SPX-1 and Condenser 1-17',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 4: CONDENSER 1-11 AND 1-13 ==========
    {
      id: 'condenser_1_11_accu_c',
      type: 'text',
      label: 'CONDENSER 1-11/ACCU-C (NCR-1)',
      section: 'Page 4: Condenser 1-11 and 1-13',
      placeholder: 'Description of condenser 1-11 ACCU-C unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_11_accu_c_foto',
      type: 'image',
      label: 'CONDENSER 1-11/ACCU-C (NCR-1) - Photo',
      section: 'Page 4: Condenser 1-11 and 1-13',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_11_accu_c_24_1',
      type: 'text',
      label: 'CONDENSER 1-11/ACCU-C (NCR-1) - 24\' 1" PILE',
      section: 'Page 4: Condenser 1-11 and 1-13',
      placeholder: 'Description of condenser 1-11 ACCU-C 24\' 1" pile',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_11_accu_c_24_1_foto',
      type: 'image',
      label: 'CONDENSER 1-11/ACCU-C 24\' 1" - Photo',
      section: 'Page 4: Condenser 1-11 and 1-13',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_13_accu_c',
      type: 'text',
      label: 'CONDENSER 1-13/ACCU-C (NCR-1)',
      section: 'Page 4: Condenser 1-11 and 1-13',
      placeholder: 'Description of condenser 1-13 ACCU-C unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_13_accu_c_foto',
      type: 'image',
      label: 'CONDENSER 1-13/ACCU-C (NCR-1) - Photo',
      section: 'Page 4: Condenser 1-11 and 1-13',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_13_accu_c_24',
      type: 'text',
      label: 'CONDENSER 1-13/ACCU-C (NCR-1) - 24\' PILE',
      section: 'Page 4: Condenser 1-11 and 1-13',
      placeholder: 'Description of condenser 1-13 ACCU-C 24\' pile',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_13_accu_c_24_foto',
      type: 'image',
      label: 'CONDENSER 1-13/ACCU-C 24\' - Photo',
      section: 'Page 4: Condenser 1-11 and 1-13',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 5: CONDENSER 1-12 ==========
    {
      id: 'condenser_1_12_accu_c',
      type: 'text',
      label: 'CONDENSER 1-12/ACCU-C (NCR-1)',
      section: 'Page 5: Condenser 1-12',
      placeholder: 'Description of condenser 1-12 ACCU-C unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_12_accu_c_foto',
      type: 'image',
      label: 'CONDENSER 1-12/ACCU-C (NCR-1) - Photo',
      section: 'Page 5: Condenser 1-12',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_12_accu_c_24',
      type: 'text',
      label: 'CONDENSER 1-12/ACCU-C (NCR-1) - 24\' PILE',
      section: 'Page 5: Condenser 1-12',
      placeholder: 'Description of condenser 1-12 ACCU-C 24\' pile',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_12_accu_c_24_foto',
      type: 'image',
      label: 'CONDENSER 1-12/ACCU-C 24\' - Photo',
      section: 'Page 5: Condenser 1-12',
      required: false,
      description: undefined,
      maxImages: false
    },
  ],
};
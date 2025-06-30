// src/data/forms/energy/hvacMechanicalOutdoorsByPages.ts
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const hvacMechanicalOutdoorsByPagesForm: InspectionForm = {
  id: 'hvac-mechanical-outdoors-segments-1-2-pages',
  name: 'Inspección final de las unidades exteriores mecánicas de HVAC Segmentos 1 y 2',
  description: 'HVAC Mechanical Outdoors inspection for Segments 1 and 2 organized by PDF template pages',
  categoryId: 'energy',
  estimatedTime: 35,
  pdfTemplate: '18HVACMechanicalOutdoors.pdf',
  
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
      type: 'text',
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
      placeholder: 'Describe HVAC outdoor elements and work location for Segments 1 and 2',
      description: undefined,
      maxImages: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the outdoor HVAC inspection performed for Segments 1 and 2',
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

    // ========== PÁGINA 2: GENERAL VIEW SEGMENT 1 AND 2 ==========
    {
      id: 'general_view_segment_1_2',
      type: 'text',
      label: 'GENERAL VIEW SEGMENT 1 AND 2 - SECA H SIDE',
      section: 'Page 2: General View Segment 1 and 2',
      placeholder: 'Description of general view for segments 1 and 2',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'general_view_segment_1_2_foto',
      type: 'image',
      label: 'GENERAL VIEW SEGMENT 1 AND 2 - Photo',
      section: 'Page 2: General View Segment 1 and 2',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_5_acuc_c_ncr1',
      type: 'text',
      label: 'CONDENSER 1-5/ACUC-C (NCR-1) - SECA H SIDE',
      section: 'Page 2: General View Segment 1 and 2',
      placeholder: 'Description of condenser 1-5 unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_5_acuc_c_ncr1_foto',
      type: 'image',
      label: 'CONDENSER 1-5/ACUC-C (NCR-1) - Photo',
      section: 'Page 2: General View Segment 1 and 2',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_5_acuc_c_ncr1_2',
      type: 'text',
      label: 'CONDENSER 1-5/ACUC-C (NCR-1) - Unit 2',
      section: 'Page 2: General View Segment 1 and 2',
      placeholder: 'Description of condenser 1-5 second unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_5_acuc_c_ncr1_2_foto',
      type: 'image',
      label: 'CONDENSER 1-5/ACUC-C (NCR-1) Unit 2 - Photo',
      section: 'Page 2: General View Segment 1 and 2',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 3: CONDENSER 1-6/ACUC-C (NCR-1) ==========
    {
      id: 'condenser_1_6_acuc_c_left',
      type: 'text',
      label: 'CONDENSER 1-6/ACUC-C (NCR-1) - D LE',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      placeholder: 'Description of condenser 1-6 left unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_6_acuc_c_left_foto',
      type: 'image',
      label: 'CONDENSER 1-6/ACUC-C (NCR-1) Left - Photo',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_6_acuc_c_27_2_right',
      type: 'text',
      label: 'CONDENSER 1-6/ACUC-C (NCR-1) - 27\' 2" D RTH SIDE',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      placeholder: 'Description of condenser 1-6 27\' 2" right unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_6_acuc_c_27_2_right_foto',
      type: 'image',
      label: 'CONDENSER 1-6/ACUC-C 27\' 2" Right - Photo',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_7_acuc_c_14_2_east',
      type: 'text',
      label: 'CONDENSER 1-7/ACUC-C (NCR-1) - 14\' 2" D EAST SIDE',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      placeholder: 'Description of condenser 1-7 14\' 2" east unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_7_acuc_c_14_2_east_foto',
      type: 'image',
      label: 'CONDENSER 1-7/ACUC-C 14\' 2" East - Photo',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_7_acuc_c_14_11_south',
      type: 'text',
      label: 'CONDENSER 1-7/ACUC-C (NCR-1) - 14\' 11" D UTH SIDE',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      placeholder: 'Description of condenser 1-7 14\' 11" south unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_7_acuc_c_14_11_south_foto',
      type: 'image',
      label: 'CONDENSER 1-7/ACUC-C 14\' 11" South - Photo',
      section: 'Page 3: Condenser 1-6/ACUC-C Units',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 4: CONDENSER 1-4 AND VENTILATION SYSTEMS ==========
    {
      id: 'condenser_1_4_acuc_c',
      type: 'text',
      label: 'CONDENSER 1-4/ACUC-C (NCR-1)',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      placeholder: 'Description of condenser 1-4 unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_4_acuc_c_foto',
      type: 'image',
      label: 'CONDENSER 1-4/ACUC-C (NCR-1) - Photo',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'condenser_1_4_acuc_c_24_1',
      type: 'text',
      label: 'CONDENSER 1-4/ACUC-C (NCR-1) - 24\' 1" PILE',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      placeholder: 'Description of condenser 1-4 24\' 1" pile unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'condenser_1_4_acuc_c_24_1_foto',
      type: 'image',
      label: 'CONDENSER 1-4/ACUC-C 24\' 1" - Photo',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'gravity_intake_vent_bar_11',
      type: 'text',
      label: 'GRAVITY INTAKE VENT - BAR #11 PLA CENTER OF PILE',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      placeholder: 'Description of gravity intake vent with BAR #11',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'gravity_intake_vent_bar_11_foto',
      type: 'image',
      label: 'GRAVITY INTAKE VENT - Photo',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'exhaust_duct_hoods_space',
      type: 'text',
      label: 'EXHAUST DUCT HOODS - SPACE BETW NORTH SIDE',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      placeholder: 'Description of exhaust duct hoods space on north side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'exhaust_duct_hoods_space_foto',
      type: 'image',
      label: 'EXHAUST DUCT HOODS - Photo',
      section: 'Page 4: Condenser 1-4 and Ventilation Systems',
      required: false,
      description: undefined,
      maxImages: false
    },
  ],
};
// src/data/forms/structures/pileInspectionByPages.ts
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const pileInspectionByPagesForm: InspectionForm = {
  id: 'pile-inspection-pages',
  name: 'Pile Inspection (Page-Based)',
  description: 'Pile foundation inspection organized by PDF template pages',
  categoryId: 'structures',
  estimatedTime: 25,
  pdfTemplate: 'secant-pile-template.pdf',
  
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
      placeholder: 'Describe structural elements and work location',
      description: undefined,
      maxImages: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the inspection performed',
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

    // ========== PÁGINA 2: NARRATIVA DE INSPECCIÓN ==========
    // Esta página es generalmente texto narrativo generado, no campos editables
    
    // ========== PÁGINA 3: SECANT PILES LOCATIONS ==========
    {
      id: 'work_location_north',
      type: 'text',
      label: 'SECANT PILES, NORTH SIDE - Location',
      section: 'Page 3: Secant Piles Locations',
      placeholder: 'e.g., Grid A-1 to A-5',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'work_location_north_description',
      type: 'text',
      label: 'SECANT PILES, NORTH SIDE - Description',
      section: 'Page 3: Secant Piles Locations',
      placeholder: 'Description of north side work',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'work_location_north_foto',
      type: 'image',
      label: 'SECANT PILES, NORTH SIDE - Photo',
      section: 'Page 3: Secant Piles Locations',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'work_location_east',
      type: 'text',
      label: 'SECANT PILES, EAST SIDE - Location',
      section: 'Page 3: Secant Piles Locations',
      placeholder: 'e.g., Grid B-1 to B-5',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'work_location_east_description',
      type: 'text',
      label: 'SECANT PILES, EAST SIDE - Description',
      section: 'Page 3: Secant Piles Locations',
      placeholder: 'Description of east side work',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'work_location_east_foto',
      type: 'image',
      label: 'SECANT PILES, EAST SIDE - Photo',
      section: 'Page 3: Secant Piles Locations',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 4: PILE MEASUREMENTS ==========
    {
      id: 'pile_diameter',
      type: 'text',
      label: 'DIAMETER OF PILE',
      section: 'Page 4: Pile Measurements',
      placeholder: 'e.g., 24 inches',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'diameter_foto',
      type: 'image',
      label: 'DIAMETER OF PILE - Photo',
      section: 'Page 4: Pile Measurements',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'depth_pile_north',
      type: 'text',
      label: 'DEPTH OF PILE, NORTH SIDE',
      section: 'Page 4: Pile Measurements',
      placeholder: 'e.g., 25 feet',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_pile_north_foto',
      type: 'image',
      label: 'DEPTH OF PILE, NORTH SIDE - Photo',
      section: 'Page 4: Pile Measurements',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'depth_pile_east',
      type: 'text',
      label: 'DEPTH OF PILE, EAST SIDE',
      section: 'Page 4: Pile Measurements',
      placeholder: 'e.g., 25 feet',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_pile_east_foto',
      type: 'image',
      label: 'DEPTH OF PILE, EAST SIDE - Photo',
      section: 'Page 4: Pile Measurements',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'depth_pile_south',
      type: 'text',
      label: 'DEPTH OF PILE, SOUTH SIDE',
      section: 'Page 4: Pile Measurements',
      placeholder: 'e.g., 25 feet',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_pile_south_foto',
      type: 'image',
      label: 'DEPTH OF PILE, SOUTH SIDE - Photo',
      section: 'Page 4: Pile Measurements',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 5: PILE SPECIFICATIONS ==========
    {
      id: 'pile_thickness',
      type: 'text',
      label: 'PILE THICK',
      section: 'Page 5: Pile Specifications',
      placeholder: 'e.g., 12 inches',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'pile_thick_foto',
      type: 'image',
      label: 'PILE THICK - Photo',
      section: 'Page 5: Pile Specifications',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'long_bar',
      type: 'text',
      label: 'LONG BAR FOR PILE',
      section: 'Page 5: Pile Specifications',
      placeholder: 'e.g., 24" Long Bar #11',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'long_bar_foto',
      type: 'image',
      label: 'LONG BAR FOR PILE - Photo',
      section: 'Page 5: Pile Specifications',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'bar_center',
      type: 'text',
      label: 'PLACED IN THE CENTER OF PILE',
      section: 'Page 5: Pile Specifications',
      placeholder: 'e.g., Bar #11 in center',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'bar_center_foto',
      type: 'image',
      label: 'PLACED IN THE CENTER OF PILE - Photo',
      section: 'Page 5: Pile Specifications',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'space_between_piles',
      type: 'text',
      label: 'SPACE BETWEEN PILES, NORTH SIDE',
      section: 'Page 5: Pile Specifications',
      placeholder: 'e.g., 6 inches',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'space_between_piles_foto',
      type: 'image',
      label: 'SPACE BETWEEN PILES - Photo',
      section: 'Page 5: Pile Specifications',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 6: MATERIALS & METHODS (Part 1) ==========
    {
      id: 'portland_cement',
      type: 'text',
      label: 'PORTLAND CEMENT TYPE',
      section: 'Page 6: Materials & Methods 1',
      placeholder: 'e.g., Type I-II',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'portland_cement_foto',
      type: 'image',
      label: 'PORTLAND CEMENT TYPE - Photo',
      section: 'Page 6: Materials & Methods 1',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'tremie_method',
      type: 'text',
      label: 'TREMIE METHOD USED FOR GROUTING',
      section: 'Page 6: Materials & Methods 1',
      placeholder: 'Describe tremie method',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'tremie_method_foto',
      type: 'image',
      label: 'TREMIE METHOD - Photo',
      section: 'Page 6: Materials & Methods 1',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'bar_in_center',
      type: 'text',
      label: 'BAR IN THE CENTER OF PILE',
      section: 'Page 6: Materials & Methods 1',
      placeholder: 'Yes/No and details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'bar_in_the_center_foto',
      type: 'image',
      label: 'BAR IN THE CENTER - Photo',
      section: 'Page 6: Materials & Methods 1',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'certified_welder',
      type: 'text',
      label: 'CERTIFIED WELDER',
      section: 'Page 6: Materials & Methods 1',
      placeholder: 'Welder certification info',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'certified_welder_foto',
      type: 'image',
      label: 'CERTIFIED WELDER - Photo',
      section: 'Page 6: Materials & Methods 1',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 7: MATERIALS & METHODS (Part 2) ==========
    {
      id: 'pile_grouted',
      type: 'text',
      label: 'PILE GROUTED',
      section: 'Page 7: Materials & Methods 2',
      placeholder: 'Grouting details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'pile_grouted_foto',
      type: 'image',
      label: 'PILE GROUTED - Photo',
      section: 'Page 7: Materials & Methods 2',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'electrode_used',
      type: 'text',
      label: 'ELECTRODE USED IN FIELD',
      section: 'Page 7: Materials & Methods 2',
      placeholder: 'e.g., E7018',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'electrode_used_foto',
      type: 'image',
      label: 'ELECTRODE USED - Photo',
      section: 'Page 7: Materials & Methods 2',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'grout_mixer',
      type: 'text',
      label: 'GROUT MIXER IN FIELD',
      section: 'Page 7: Materials & Methods 2',
      placeholder: 'Mixer specifications',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'grout_mixer_foto',
      type: 'image',
      label: 'GROUT MIXER - Photo',
      section: 'Page 7: Materials & Methods 2',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'rotary_machine',
      type: 'text',
      label: 'ROTARY MACHINE FOR PILE',
      section: 'Page 7: Materials & Methods 2',
      placeholder: 'Machine specifications',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'rotary_machine_foto',
      type: 'image',
      label: 'ROTARY MACHINE - Photo',
      section: 'Page 7: Materials & Methods 2',
      required: false,
      description: undefined,
      maxImages: false
    },
  ],
};
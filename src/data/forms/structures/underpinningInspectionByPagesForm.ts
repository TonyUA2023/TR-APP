// src/data/forms/structures/underpinningInspectionByPagesForm.ts

import { InspectionForm } from '../../../types';

export const underpinningInspectionByPagesForm: InspectionForm = {
  id: 'underpinning-inspection-pages',
  name: 'Underpinning Inspection (Page-Based)',
  description: 'Underpinning inspection organized by PDF template pages',
  categoryId: 'structures',
  estimatedTime: 30,                // ajusta según tu flujo
  pdfTemplate: '3UNDERPINNING.pdf',

  fields: [
    // ========== PAGE 1: GENERAL INFORMATION ==========
    {
      id: 'department_name',
      type: 'select',
      label: 'Project Location',
      section: 'Page 1: General Information',
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
      maxImages: false,
      required: false
    },
    {
      id: 'inspection_report_number',
      type: 'text',
      label: 'Special Inspection Report #',
      section: 'Page 1: General Information',
      placeholder: 'Enter report number',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'contractor_name',
      type: 'text',
      label: 'Contractor',
      section: 'Page 1: General Information',
      placeholder: 'Enter contractor name',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'site_information',
      type: 'textarea',
      label: 'Site Information',
      section: 'Page 1: General Information',
      placeholder: 'Enter site/building information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'date_of_issuance',
      type: 'date',
      label: 'Date of Issuance',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'inspection_date',
      type: 'date',
      label: 'Date of Inspection',
      section: 'Page 1: General Information',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'arrival_time',
      type: 'select',
      label: 'Time of Arrival',
      section: 'Page 1: General Information',
      options: [
        '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm',
        '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'
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
        '9:00 am', '10:00 am', '11:00 am', '12:00 pm',
        '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm'
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
      id: 'structural_element_location',
      type: 'text',
      label: 'Structural Element/Item Inspected & Work Location',
      section: 'Page 1: General Information',
      placeholder: 'Describe element & location',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the inspection',
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
      placeholder: 'Additional notes or sample descriptions',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'inspector_name',
      type: 'text',
      label: 'Inspector Name',
      section: 'Page 1: General Information',
      placeholder: 'Enter inspector full name',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 2: UNDERPINNING VIEWS ==========
    {
      id: 'view_underpinning_north_side',
      type: 'text',
      label: 'View of Underpinning, North Side',
      section: 'Page 2: Underpinning Views',
      placeholder: 'Enter north side view description',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'view_underpinning_north_side_foto',
      type: 'image',
      label: 'North Side Photo',
      section: 'Page 2: Underpinning Views',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'view_underpinning_south_side',
      type: 'text',
      label: 'View of Underpinning, South Side',
      section: 'Page 2: Underpinning Views',
      placeholder: 'Enter south side view description',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'view_underpinning_south_side_foto',
      type: 'image',
      label: 'South Side Photo',
      section: 'Page 2: Underpinning Views',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 3: VERTICAL REINFORCEMENT ==========
    {
      id: 'vertical_reinforcement_underpinning_d6b',
      type: 'text',
      label: 'Vertical Reinforcement in Underpinning D6b',
      section: 'Page 3: Vertical Reinforcement',
      placeholder: 'Enter reinforcement details D6b',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vertical_reinforcement_underpinning_d6b_foto',
      type: 'image',
      label: 'Photo D6b',
      section: 'Page 3: Vertical Reinforcement',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vertical_reinforcement_underpinning_a6',
      type: 'text',
      label: 'Vertical Reinforcement in Underpinning A6',
      section: 'Page 3: Vertical Reinforcement',
      placeholder: 'Enter reinforcement details A6',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vertical_reinforcement_underpinning_a6_foto',
      type: 'image',
      label: 'Photo A6',
      section: 'Page 3: Vertical Reinforcement',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 4: SPACE & WIDTH ==========
    {
      id: 'space_vertical_reinforcement_achieved',
      type: 'text',
      label: 'Space for Vertical Reinforcement Achieved',
      section: 'Page 4: Space & Width',
      placeholder: 'Enter achieved spacing',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'space_vertical_reinforcement_achieved_foto',
      type: 'image',
      label: 'Spacing Photo',
      section: 'Page 4: Space & Width',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'width_underpinning_a6',
      type: 'text',
      label: 'Width for Underpinning A6, Achieved',
      section: 'Page 4: Space & Width',
      placeholder: 'Enter achieved width',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'width_underpinning_a6_foto',
      type: 'image',
      label: 'Width Photo',
      section: 'Page 4: Space & Width',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 5: HEIGHT MEASUREMENTS ==========
    {
      id: 'height_underpinning_d6b',
      type: 'text',
      label: 'Height for Underpinning D6b',
      section: 'Page 5: Height Measurements',
      placeholder: 'Enter height D6b',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'height_underpinning_d6b_foto',
      type: 'image',
      label: 'Height Photo D6b',
      section: 'Page 5: Height Measurements',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'height_underpinning_a6',
      type: 'text',
      label: 'Height for Underpinning A6',
      section: 'Page 5: Height Measurements',
      placeholder: 'Enter height A6',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'height_underpinning_a6_foto',
      type: 'image',
      label: 'Height Photo A6',
      section: 'Page 5: Height Measurements',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 6: DEPTH MEASUREMENTS ==========
    {
      id: 'depth_underpinning_d6b',
      type: 'text',
      label: 'Depth for Underpinning D6b',
      section: 'Page 6: Depth Measurements',
      placeholder: 'Enter depth D6b',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_underpinning_d6b_foto',
      type: 'image',
      label: 'Depth Photo D6b',
      section: 'Page 6: Depth Measurements',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_underpinning_a6',
      type: 'text',
      label: 'Depth for Underpinning A6',
      section: 'Page 6: Depth Measurements',
      placeholder: 'Enter depth A6',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_underpinning_a6_foto',
      type: 'image',
      label: 'Depth Photo A6',
      section: 'Page 6: Depth Measurements',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 7: CONCRETE & VIBRATION ==========
    {
      id: 'concrete_placement',
      type: 'text',
      label: 'Concrete Placement',
      section: 'Page 7: Concrete & Vibration',
      placeholder: 'Enter placement details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'concrete_placement_foto',
      type: 'image',
      label: 'Placement Photo',
      section: 'Page 7: Concrete & Vibration',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vibrator_used_during_concrete_placement',
      type: 'text',
      label: 'Vibrator Used During Concrete Placement',
      section: 'Page 7: Concrete & Vibration',
      placeholder: 'Enter vibrator details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vibrator_used_during_concrete_placement_foto',
      type: 'image',
      label: 'Vibrator Photo',
      section: 'Page 7: Concrete & Vibration',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 8: SAMPLING & FINISHING ==========
    {
      id: 'concrete_delivered',
      type: 'text',
      label: 'Concrete Delivered',
      section: 'Page 8: Sampling & Finishing',
      placeholder: 'Enter concrete delivery info',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'concrete_delivered_foto',
      type: 'image',
      label: 'Delivery Photo',
      section: 'Page 8: Sampling & Finishing',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'cylindrical_samples_thermocure_box',
      type: 'text',
      label: 'Cylindrical Samples in Thermocure Box',
      section: 'Page 8: Sampling & Finishing',
      placeholder: 'Enter sample details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'cylindrical_samples_thermocure_box_foto',
      type: 'image',
      label: 'Samples Photo',
      section: 'Page 8: Sampling & Finishing',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'slump_test',
      type: 'text',
      label: 'Slump Test',
      section: 'Page 8: Sampling & Finishing',
      placeholder: 'Enter slump test result',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'slump_test_foto',
      type: 'image',
      label: 'Slump Photo',
      section: 'Page 8: Sampling & Finishing',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'concrete_finishing_underpinning_space_shims_grout',
      type: 'text',
      label: 'Concrete Finishing in Underpinning (Space for Shims & Grout)',
      section: 'Page 8: Sampling & Finishing',
      placeholder: 'Enter finishing notes',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'concrete_finishing_underpinning_space_shims_grout_foto',
      type: 'image',
      label: 'Finishing Photo',
      section: 'Page 8: Sampling & Finishing',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 9: SHEAR KEY ==========
    {
      id: 'shear_key_provided',
      type: 'text',
      label: 'Shear Key Provided',
      section: 'Page 9: Shear Key',
      placeholder: 'Enter shear key info',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'shear_key_provided_foto',
      type: 'image',
      label: 'Shear Key Photo',
      section: 'Page 9: Shear Key',
      description: undefined,
      maxImages: false,
      required: false
    },
  ],
};
// src/data/forms/structures/gradeBeamInspectionForm.ts

import { InspectionForm } from '../../../types';

export const gradeBeamInspectionForm: InspectionForm = {
  id: 'grade-beam-inspection',
  name: 'Grade Beam Inspection',
  description: 'Inspection of elevator pit grade beam section, concrete placement, vibration, delivery and material tests',
  categoryId: 'structures',
  estimatedTime: 45,
  pdfTemplate: '9GRADE_BEAM.pdf',

  fields: [
    // ========== PAGE 1: GENERAL INFORMATION ==========
    {
      id: 'department_name',
      type: 'select',
      label: 'Project Location',
      section: 'Page 1: General Information',
      options: [
        '109 Montgomery St', '1140 Dekalb Av.', '124 9th Street', '150-13 89th Ave .Jamaica',
        '1668 59th St', '1702 Newkirk Ave', '255 West 34th', '263 W 34th Street', '2702 W 15th St.',
        '2813 Tilden', '316 Sumpter', '343 Ralph av.', '376-378 Flushing av.', '441 4th av.',
        '46-32 Vernon Blvd', '49-51 Chambers St.', '633 Marcy Ave', '714 Jefferson ave',
        '84 14 Street', '89 North 4th Street', '934 46th st'
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
      required: false,
      placeholder: 'Enter report number',
      description: undefined,
      maxImages: false
    },
    {
      id: 'project_address',
      type: 'textarea',
      label: 'Project Data',
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
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'arrival_time',
      type: 'select',
      label: 'Time of Arrival',
      section: 'Page 1: General Information',
      options: ['8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm'],
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
      options: ['9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm'],
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
      label: 'Inspection Item & Work Location',
      section: 'Page 1: General Information',
      placeholder: 'e.g., Secant pile, north, east and south side',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'e.g., Drilling and grouting',
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
      label: 'Any precautions taken if work was stopped for any reason',
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
      placeholder: 'Enter inspection notes, measurements, and sample descriptions',
      description: undefined,
      maxImages: false,
      required: false
    },

    // ========== PAGE 2: FOOTING 1.5WF26 ==========
    {
      id: 'footing_1_5_north_side',
      type: 'text',
      label: 'Footing 1.5WF26, North Side',
      section: 'Page 2: Footing 1.5WF26',
      placeholder: 'Enter footing details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'depth_of_footing_1_5_wf26',
      type: 'text',
      label: `12" Depth of Footing 1.5WF26`,
      section: 'Page 2: Footing 1.5WF26',
      placeholder: 'Enter depth details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'width_2_8_footing_1_5_wf26',
      type: 'text',
      label: `Width 2'8", Footing 1.5WF26`,
      section: 'Page 2: Footing 1.5WF26',
      placeholder: 'Enter width details',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'footing_1_5_width_slope',
      type: 'text',
      label: 'Footing 1.5WF26 with Slope',
      section: 'Page 2: Footing 1.5WF26',
      placeholder: 'Enter slope details',
    },
    {
      id: 'footing_1_5_north_side_foto',
      type: 'image',
      label: 'Footing 1.5WF26 North Side Photo',
      section: 'Page 2: Footing 1.5WF26',
      required: false,
    },
    {
      id: 'depth_of_footing_1_5_wf26_foto',
      type: 'image',
      label: `12" Depth of Footing 1.5WF26 Photo`,
      section: 'Page 2: Footing 1.5WF26',
      required: false,
    },
    {
      id: 'width_2_8_footing_1_5_wf26_foto',
      type: 'image',
      label: `Width 2'8" Footing Photo`,
      section: 'Page 2: Footing 1.5WF26',
      required: false,
    },
    {
      id: 'footing_1_5_width_slope_foto',
      type: 'image',
      label: 'Footing 1.5WF26 with Slope Photo',
      section: 'Page 2: Footing 1.5WF26',
      required: false,
    },

    // ========== PAGE 3: GRADE BEAM GB4 ==========
    {
      id: 'grade_beam_gb4_north',
      type: 'text',
      label: 'Grade Beam GB4, North Side',
      section: 'Page 3: Grade Beam GB4',
      placeholder: 'Enter grade beam details',
    },
    {
      id: 'width_1_6_grade_beam_gb4',
      type: 'text',
      label: `Width 1'6", Grade Beam GB4`,
      section: 'Page 3: Grade Beam GB4',
      placeholder: 'Enter width details',
    },
    {
      id: 'depth_grade_beam_gb4',
      type: 'text',
      label: `12" Depth of Grade Beam GB4`,
      section: 'Page 3: Grade Beam GB4',
      placeholder: 'Enter depth details',
    },
    {
      id: 'grade_beam_gb4_north_foto',
      type: 'image',
      label: 'Grade Beam GB4 North Side Photo',
      section: 'Page 3: Grade Beam GB4',
      required: false,
    },
    {
      id: 'width_1_6_grade_beam_gb4_foto',
      type: 'image',
      label: `Width 1'6" Grade Beam GB4 Photo`,
      section: 'Page 3: Grade Beam GB4',
      required: false,
    },
    {
      id: 'depth_grade_beam_gb4_foto',
      type: 'image',
      label: `12" Depth Grade Beam GB4 Photo`,
      section: 'Page 3: Grade Beam GB4',
      required: false,
    },

    // ========== PAGE 4: CONCRETE PLACEMENT & TESTS ==========
    {
      id: 'concrete_placement',
      type: 'text',
      label: 'Concrete Placement',
      section: 'Page 4: Concrete Placement & Tests',
      placeholder: 'Enter placement details',
    },
    {
      id: 'concrete_placement_foto',
      type: 'image',
      label: 'Concrete Placement Photo',
      section: 'Page 4: Concrete Placement & Tests',
      required: false,
    },
    {
      id: 'vibrator_during_placement',
      type: 'text',
      label: 'Vibrator was used during placement',
      section: 'Page 4: Concrete Placement & Tests',
      placeholder: 'Enter notes',
    },
    {
      id: 'vibrator_during_placement_foto',
      type: 'image',
      label: 'Vibrator During Placement Photo',
      section: 'Page 4: Concrete Placement & Tests',
      required: false,
    },
    {
      id: 'vibrator_used',
      type: 'text',
      label: 'Vibrator was used',
      section: 'Page 4: Concrete Placement & Tests',
      placeholder: 'Enter notes',
    },
    {
      id: 'vibrator_used_foto',
      type: 'image',
      label: 'Vibrator Used Photo',
      section: 'Page 4: Concrete Placement & Tests',
      required: false,
    },

    // ========== PAGE 5: DELIVERY ==========
    {
      id: 'concrete_delivered_1',
      type: 'text',
      label: 'Concrete Delivered',
      section: 'Page 5: Delivery',
      placeholder: 'Enter delivery #1',
    },
    {
      id: 'concrete_delivered_1_foto',
      type: 'image',
      label: 'Concrete Delivered #1 Photo',
      section: 'Page 5: Delivery',
      required: false,
    },
    {
      id: 'concrete_delivered_2',
      type: 'text',
      label: 'Concrete Delivered',
      section: 'Page 5: Delivery',
      placeholder: 'Enter delivery #2',
    },
    {
      id: 'concrete_delivered_2_foto',
      type: 'image',
      label: 'Concrete Delivered #2 Photo',
      section: 'Page 5: Delivery',
      required: false,
    },

    // ========== PAGE 6: MATERIAL TESTS ==========
    {
      id: 'concrete_samples',
      type: 'text',
      label: 'Concrete Samples',
      section: 'Page 6: Material Tests',
      placeholder: 'Enter sample notes',
    },
    {
      id: 'concrete_samples_fotos',
      type: 'image',
      label: 'Concrete Samples Photo',
      section: 'Page 6: Material Tests',
      required: false,
    },
    {
      id: 'slump_test',
      type: 'text',
      label: 'Slump Test',
      section: 'Page 6: Material Tests',
      placeholder: 'Enter slump test results',
    },
    {
      id: 'slump_test_foto',
      type: 'image',
      label: 'Slump Test Photo',
      section: 'Page 6: Material Tests',
      required: false,
    },
  ],
};

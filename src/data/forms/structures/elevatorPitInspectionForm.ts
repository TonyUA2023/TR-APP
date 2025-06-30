// src/data/forms/structures/elevatorPitInspectionForm.ts

import { InspectionForm } from '../../../types';

export const elevatorPitInspectionForm: InspectionForm = {
  id: 'elevator-pit-inspection',
  name: 'Elevator Pit Inspection',
  description: 'Foundation mat slab inspection for elevator pit construction',
  categoryId: 'structures',
  estimatedTime: 45,
  pdfTemplate: '5ELEVATOR_PIT.pdf',

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
      required: false,
      placeholder: 'Enter report number',
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
      required: true,
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
    },
    {
      id: 'date_of_issuance',
      type: 'date',
      label: 'Date of Issuance',
      section: 'Page 1: General Information',
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
    },
    {
      id: 'weather_conditions',
      type: 'select',
      label: 'Weather Conditions',
      section: 'Page 1: General Information',
      options: ['Sunny', 'Cloudy', 'Fair', 'Rainy'],
      placeholder: 'Select weather',
    },
    {
      id: 'temperature',
      type: 'text',
      label: 'Temperature',
      section: 'Page 1: General Information',
      placeholder: 'e.g., 72°F',
    },
    {
      id: 'inspector_name',
      type: 'text',
      label: 'Inspector Name',
      section: 'Page 1: General Information',
      required: false,
      placeholder: 'Enter inspector full name',
    },
    {
      id: 'structural_element_location',
      type: 'textarea',
      label: 'Structural Element/Item Inspected & Work Location',
      section: 'Page 1: General Information',
      placeholder: 'Describe structural elements and work location',
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the inspection performed',
    },
    {
      id: 'deviation_design_documents',
      type: 'boolean',
      label: 'Deviations from the design documents',
      section: 'Page 1: General Information',
    },
    {
      id: 'significant_observations',
      type: 'boolean',
      label: 'Significant observations contradicting anticipated field conditions',
      section: 'Page 1: General Information',
    },
    {
      id: 'work_improperly_executed',
      type: 'boolean',
      label: 'Any work improperly executed',
      section: 'Page 1: General Information',
    },
    {
      id: 'unsafe_job_conditions',
      type: 'boolean',
      label: 'Any unsafe job conditions',
      section: 'Page 1: General Information',
    },
    {
      id: 'precautions_taken',
      type: 'boolean',
      label: 'Any precautions taken to maintain safe conditions',
      section: 'Page 1: General Information',
    },
    {
      id: 'notes_and_samples',
      type: 'textarea',
      label: 'Notes & Description of Samples Obtained if Any',
      section: 'Page 1: General Information',
      placeholder: 'Enter any additional notes or sample descriptions',
    },

    // ========== PAGE 2: FOUNDATION MAT SLAB GENERAL VIEW ==========
    {
      id: 'foundation_mat_slab_general_view',
      type: 'textarea',
      label: 'Foundation Mat Slab for Elevator Pit - General View',
      section: 'Page 2: Foundation Mat Slab',
      placeholder: 'Describe the general view of foundation mat slab',
    },
    {
      id: 'foundation_mat_slab_general_view_foto',
      type: 'image',
      label: 'General View Photo',
      section: 'Page 2: Foundation Mat Slab',
      required: false,
    },

    // ========== PAGE 3: BOTTOM REBAR ==========
    {
      id: 'foundation_bottom_rebar_9_12',
      type: 'text',
      label: 'Foundation Mat Slab - Bottom Rebar #9@12" O.C.E.W.',
      section: 'Page 3: Bottom Rebar',
      placeholder: 'Enter bottom rebar specifications',
    },
    {
      id: 'foundation_bottom_rebar_9_12_foto',
      type: 'image',
      label: 'Bottom Rebar #9@12" Photo',
      section: 'Page 3: Bottom Rebar',
      required: false,
    },
    {
      id: 'bottom_rebar_9_verified',
      type: 'text',
      label: 'Bottom Rebar #9 - Verified',
      section: 'Page 3: Bottom Rebar',
      placeholder: 'Verification notes for bottom rebar',
    },
    {
      id: 'bottom_rebar_9_verified_foto',
      type: 'image',
      label: 'Bottom Rebar Verified Photo',
      section: 'Page 3: Bottom Rebar',
      required: false,
    },

    // ========== PAGE 4: TOP REBAR ==========
    {
      id: 'foundation_top_rebar_9_12',
      type: 'text',
      label: 'Foundation Mat Slab - Top Rebar #9@12" O.C.E.W.',
      section: 'Page 4: Top Rebar',
      placeholder: 'Enter top rebar specifications',
    },
    {
      id: 'foundation_top_rebar_9_12_foto',
      type: 'image',
      label: 'Top Rebar #9@12" Photo',
      section: 'Page 4: Top Rebar',
      required: false,
    },
    {
      id: 'top_rebar_9_verified',
      type: 'text',
      label: 'Top Rebar #9 - Verified',
      section: 'Page 4: Top Rebar',
      placeholder: 'Verification notes for top rebar',
    },
    {
      id: 'top_rebar_9_verified_foto',
      type: 'image',
      label: 'Top Rebar Verified Photo',
      section: 'Page 4: Top Rebar',
      required: false,
    },

    // ========== PAGE 5: ADDITIONAL REBAR ==========
    {
      id: 'additional_rebar_9_bottom_west_east',
      type: 'text',
      label: 'Additional Rebar #9 Bottom - West-East Directions',
      section: 'Page 5: Additional Rebar',
      placeholder: 'Enter additional rebar West-East specifications',
    },
    {
      id: 'additional_rebar_9_bottom_west_east_foto',
      type: 'image',
      label: 'Additional Rebar West-East Photo',
      section: 'Page 5: Additional Rebar',
      required: false,
    },
    {
      id: 'additional_rebar_9_bottom_north_south',
      type: 'text',
      label: 'Additional Rebar #9 Bottom - North-South Directions',
      section: 'Page 5: Additional Rebar',
      placeholder: 'Enter additional rebar North-South specifications',
    },
    {
      id: 'additional_rebar_9_bottom_north_south_foto',
      type: 'image',
      label: 'Additional Rebar North-South Photo',
      section: 'Page 5: Additional Rebar',
      required: false,
    },

    // ========== PAGE 6: REBAR CONTINUITY & CLEARANCE ==========
    {
      id: 'bottom_top_rebar_continue_mat1',
      type: 'text',
      label: 'Bottom and Top Rebar Continue in Mat Slab Mat1',
      section: 'Page 6: Rebar Continuity',
      placeholder: 'Describe rebar continuity in mat slab',
    },
    {
      id: 'bottom_top_rebar_continue_mat1_foto',
      type: 'image',
      label: 'Rebar Continuity Photo',
      section: 'Page 6: Rebar Continuity',
      required: false,
    },
    {
      id: 'clearance_between_bottom_rebar',
      type: 'text',
      label: 'Clearance Between Bottom and Rebar',
      section: 'Page 6: Rebar Continuity',
      placeholder: 'Enter clearance measurements',
    },
    {
      id: 'clearance_between_bottom_rebar_foto',
      type: 'image',
      label: 'Clearance Photo',
      section: 'Page 6: Rebar Continuity',
      required: false,
    },

    // ========== PAGE 7: MAT SLAB HEIGHT & SUMP PIT ==========
    {
      id: 'mat_slab_height_36',
      type: 'text',
      label: '36" Height - Mat Slab for Elevator Pit',
      section: 'Page 7: Dimensions',
      placeholder: 'Verify 36" height specification',
    },
    {
      id: 'mat_slab_height_36_foto',
      type: 'image',
      label: '36" Height Photo',
      section: 'Page 7: Dimensions',
      required: false,
    },
    {
      id: 'sump_pit_width_24',
      type: 'text',
      label: '24" Width - Sump Pit',
      section: 'Page 7: Dimensions',
      placeholder: 'Verify 24" width for sump pit',
    },
    {
      id: 'sump_pit_width_24_foto',
      type: 'image',
      label: 'Sump Pit Width Photo',
      section: 'Page 7: Dimensions',
      required: false,
    },

    // ========== PAGE 8: HOOK FOR DOWEL ==========
    {
      id: 'hook_dowel_rebar_9_sw8_24',
      type: 'text',
      label: '24" Hook for Dowel Rebar #9 SW8',
      section: 'Page 8: Dowel Details',
      placeholder: 'Enter hook specifications for dowel rebar',
    },
    {
      id: 'hook_dowel_rebar_9_sw8_24_foto',
      type: 'image',
      label: 'Hook for Dowel Photo',
      section: 'Page 8: Dowel Details',
      required: false,
    },

    // ========== CAMPOS ADICIONALES (SUBTITLES) ==========
    // Estos campos aparecen en el PDF pero parecen ser para notas adicionales
    {
      id: 'subtitle_5',
      type: 'text',
      label: 'Additional Notes 1',
      section: 'Additional Information',
      placeholder: 'Enter additional information if needed',
      required: false,
    },
    {
      id: 'subtitle_6',
      type: 'text',
      label: 'Additional Notes 2',
      section: 'Additional Information',
      placeholder: 'Enter additional information if needed',
      required: false,
    },
  ],
};
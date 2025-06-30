// src/data/forms/energy/hvacMechanicalInteriorByPages.ts
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const hvacMechanicalInteriorByPagesForm: InspectionForm = {
  id: 'hvac-mechanical-interior-pages',
  name: 'HVAC Mechanical Interior Inspection (Page-Based)',
  description: 'HVAC Mechanical Interior inspection organized by PDF template pages',
  categoryId: 'energy',
  estimatedTime: 30,
  pdfTemplate: '17HVACMechanicalIndoor.pdf',
  
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
      placeholder: 'Describe HVAC elements and work location',
      description: undefined,
      maxImages: false
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the HVAC inspection performed',
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

    // ========== PÁGINA 2: VRF SYSTEMS AND CONTROLLERS ==========
    {
      id: 'vrf_oa_17_north_side',
      type: 'text',
      label: 'VRF OA-17, OA-18 AND LOUVER - SECANT VRF0A-17 NORTH SIDE',
      section: 'Page 2: VRF Systems and Controllers',
      placeholder: 'Description of VRF OA-17 north side installation',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_oa_17_north_side_foto',
      type: 'image',
      label: 'VRF OA-17 NORTH SIDE - Photo',
      section: 'Page 2: VRF Systems and Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vrf_branch_controller',
      type: 'text',
      label: 'VRF BRANCH CONTROLLER',
      section: 'Page 2: VRF Systems and Controllers',
      placeholder: 'Description of VRF branch controller',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_branch_controller_foto',
      type: 'image',
      label: 'VRF BRANCH CONTROLLER - Photo',
      section: 'Page 2: VRF Systems and Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'exhaust_duct_plenum_space',
      type: 'text',
      label: 'EXHAUST DUCT PLENUM - SPACE TH SIDE',
      section: 'Page 2: VRF Systems and Controllers',
      placeholder: 'Description of exhaust duct plenum space',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'exhaust_duct_plenum_space_foto',
      type: 'image',
      label: 'EXHAUST DUCT PLENUM - Photo',
      section: 'Page 2: VRF Systems and Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'fire_damper_1st_floor',
      type: 'text',
      label: 'FIRE DAMPER, 1ST FLOOR',
      section: 'Page 2: VRF Systems and Controllers',
      placeholder: 'Description of fire damper on 1st floor',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'fire_damper_1st_floor_foto',
      type: 'image',
      label: 'FIRE DAMPER, 1ST FLOOR - Photo',
      section: 'Page 2: VRF Systems and Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 3: VRF OUTDOOR AND INDOOR UNITS ==========
    {
      id: 'vrf_outdoor_air_1st_floor_depth',
      type: 'text',
      label: 'VRF OUTDOOR AIR, 1ST FLOOR - DEPTH',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      placeholder: 'Description of VRF outdoor air unit depth',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_outdoor_air_1st_floor_depth_foto',
      type: 'image',
      label: 'VRF OUTDOOR AIR, 1ST FLOOR DEPTH - Photo',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vrf_outdoor_air_1st_floor_27_2',
      type: 'text',
      label: 'VRF OUTDOOR AIR, 1ST FLOOR - 27" 2" TH SIDE',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      placeholder: 'Description of 27" 2" VRF outdoor air unit',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_outdoor_air_1st_floor_27_2_foto',
      type: 'image',
      label: 'VRF OUTDOOR AIR 27" 2" - Photo',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vrf_indoor_units_1st_floor_14_2',
      type: 'text',
      label: 'VRF INDOOR UNITS, 1ST FLOOR - 14" 2" ST SIDE',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      placeholder: 'Description of 14" 2" VRF indoor units',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_indoor_units_1st_floor_14_2_foto',
      type: 'image',
      label: 'VRF INDOOR UNITS 14" 2" - Photo',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vrf_indoor_units_ncr1_14_11',
      type: 'text',
      label: 'VRF INDOOR UNITS (NCR-1) - 14" 11" UTH SIDE',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      placeholder: 'Description of NCR-1 VRF indoor units',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_indoor_units_ncr1_14_11_foto',
      type: 'image',
      label: 'VRF INDOOR UNITS NCR-1 - Photo',
      section: 'Page 3: VRF Outdoor and Indoor Units',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 4: AIR CURTAIN FANS AND VRF BRANCH CONTROLLERS ==========
    {
      id: 'air_curtain_fans_1st_floor',
      type: 'text',
      label: 'AIR CURTAIN FANS, 1ST FLOOR',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      placeholder: 'Description of air curtain fans on 1st floor',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'air_curtain_fans_1st_floor_foto',
      type: 'image',
      label: 'AIR CURTAIN FANS, 1ST FLOOR - Photo',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'air_curtain_fans_1st_floor_24',
      type: 'text',
      label: 'AIR CURTAIN FANS, 1ST FLOOR - 24" TH E',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      placeholder: 'Description of 24" air curtain fans',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'air_curtain_fans_1st_floor_24_foto',
      type: 'image',
      label: 'AIR CURTAIN FANS 24" - Photo',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vrf_branch_controllers_bar_11',
      type: 'text',
      label: 'VRF BRANCH CONTROLLERS, 1ST FLOOR - BAR #11',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      placeholder: 'Description of VRF branch controllers with BAR #11',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_branch_controllers_bar_11_foto',
      type: 'image',
      label: 'VRF BRANCH CONTROLLERS BAR #11 - Photo',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vrf_branch_controllers_ncr2_space',
      type: 'text',
      label: 'VRF BRANCH CONTROLLERS (NCR-2) - SPACE TH SIDE',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      placeholder: 'Description of NCR-2 VRF branch controllers space',
      description: undefined,
      maxImages: false,
      required: false
    },
    {
      id: 'vrf_branch_controllers_ncr2_space_foto',
      type: 'image',
      label: 'VRF BRANCH CONTROLLERS NCR-2 - Photo',
      section: 'Page 4: Air Curtain Fans and VRF Branch Controllers',
      required: false,
      description: undefined,
      maxImages: false
    },
  ],
};
// src/data/forms/structures/cfsInspectionByPages.ts
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const cfsInspectionByPagesForm: InspectionForm = {
  id: 'cfs-inspection-pages',
  name: 'Cold Formed Steel (CFS) Inspection (Page-Based)',
  description: 'Cold formed steel and braced frames inspection organized by PDF template pages',
  categoryId: 'structures',
  estimatedTime: 30,
  pdfTemplate: '6CFS.pdf',
  
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
    },
    {
      id: 'inspection_report_number',
      type: 'text',
      label: 'Inspection Report #',
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
      required: false,
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
      required: false,
    },
    {
      id: 'weather_conditions',
      type: 'select',
      label: 'Weather Conditions',
      section: 'Page 1: General Information',
      options: ['Sunny', 'Cloudy', 'Fair', 'Rainy'],
      placeholder: 'Select weather',
      required: false,
    },
    {
      id: 'temperature',
      type: 'text',
      label: 'Temperature',
      section: 'Page 1: General Information',
      placeholder: 'e.g., 72°F',
      required: false,
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
      required: false,
      placeholder: 'Describe structural elements and work location',
    },
    {
      id: 'inspection_description',
      type: 'textarea',
      label: 'Description of Inspection',
      section: 'Page 1: General Information',
      placeholder: 'Detailed description of the inspection performed',
      required: false,
    },
    {
      id: 'deviation_design_documents',
      type: 'boolean',
      label: 'Deviations from the design documents',
      section: 'Page 1: General Information',
      required: false,
    },
    {
      id: 'significant_observations',
      type: 'boolean',
      label: 'Significant observations contradicting anticipated field conditions',
      section: 'Page 1: General Information',
      required: false,
    },
    {
      id: 'work_improperly_executed',
      type: 'boolean',
      label: 'Any work improperly executed',
      section: 'Page 1: General Information',
      required: false,
    },
    {
      id: 'unsafe_job_conditions',
      type: 'boolean',
      label: 'Any unsafe job conditions',
      section: 'Page 1: General Information',
      required: false,
    },
    {
      id: 'precautions_taken',
      type: 'boolean',
      label: 'Any precautions taken to maintain safe conditions',
      section: 'Page 1: General Information',
      required: false,
    },
    {
      id: 'notes_and_samples',
      type: 'textarea',
      label: 'Notes & Description of Samples Obtained if Any',
      section: 'Page 1: General Information',
      placeholder: 'Enter any additional notes or sample descriptions',
      required: false,
    },
    {
      id: 'inspector_signature',
      type: 'signature',
      label: 'Inspector Signature',
      section: 'Page 1: General Information',
      required: false,
    },

    // ========== PÁGINA 2: GENERAL VIEWS ==========
    {
      id: 'general_view_inspected_work',
      type: 'text',
      label: 'GENERAL VIEW OF INSPECTED WORK',
      section: 'Page 2: General Views',
      placeholder: 'Enter general view description',
      required: false,
    },
    {
      id: 'general_view_inspected_work_foto',
      type: 'image',
      label: 'GENERAL VIEW OF INSPECTED WORK - Photo',
      section: 'Page 2: General Views',
      required: false,
    },
    {
      id: 'description_work_location_north',
      type: 'text',
      label: 'Description/Work Location North',
      section: 'Page 2: General Views',
      placeholder: 'Enter work location description',
      required: false,
    },
    {
      id: 'south_north_view_1st_floor',
      type: 'text',
      label: 'SOUTH-NORTH VIEW 1ST FLOOR',
      section: 'Page 2: General Views',
      placeholder: 'Enter south-north view details',
      required: false,
    },
    {
      id: 'south_north_view_1st_floor_foto',
      type: 'image',
      label: 'SOUTH-NORTH VIEW 1ST FLOOR - Photo',
      section: 'Page 2: General Views',
      required: false,
    },
    {
      id: 'north_south_2nd_floor',
      type: 'text',
      label: 'NORTH-SOUTH, 2ND FLOOR',
      section: 'Page 2: General Views',
      placeholder: 'Enter north-south 2nd floor details',
      required: false,
    },
    {
      id: 'north_south_2nd_floor_foto',
      type: 'image',
      label: 'NORTH-SOUTH, 2ND FLOOR - Photo',
      section: 'Page 2: General Views',
      required: false,
    },
    {
      id: 'south_north_view_3rd_floor',
      type: 'text',
      label: 'SOUTH-NORTH VIEW, 3RD FLOOR',
      section: 'Page 2: General Views',
      placeholder: 'Enter south-north view 3rd floor details',
      required: false,
    },
    {
      id: 'south_north_view_3rd_floor_foto',
      type: 'image',
      label: 'SOUTH-NORTH VIEW, 3RD FLOOR - Photo',
      section: 'Page 2: General Views',
      required: false,
    },

    // ========== PÁGINA 3: STUD SPACING AND DIMENSIONS ==========
    {
      id: 'stud_spacing_verified_16',
      type: 'text',
      label: 'STUD SPACING VERIFIED @16"',
      section: 'Page 3: Stud Spacing and Dimensions',
      placeholder: 'Enter stud spacing verification',
      required: false,
    },
    {
      id: 'stud_spacing_verified_16_foto',
      type: 'image',
      label: 'STUD SPACING VERIFIED @16" - Photo',
      section: 'Page 3: Stud Spacing and Dimensions',
      required: false,
    },
    {
      id: 'stud_thick_achieved',
      type: 'text',
      label: 'STUD THICK, ACHIEVED',
      section: 'Page 3: Stud Spacing and Dimensions',
      placeholder: 'Enter stud thickness achieved',
      required: false,
    },
    {
      id: 'stud_thick_achieved_foto',
      type: 'image',
      label: 'STUD THICK, ACHIEVED - Photo',
      section: 'Page 3: Stud Spacing and Dimensions',
      required: false,
    },
    {
      id: 'stud_dimension_verified',
      type: 'text',
      label: 'STUD DIMENSION, VERIFIED',
      section: 'Page 3: Stud Spacing and Dimensions',
      placeholder: 'Enter stud dimension verification',
      required: false,
    },
    {
      id: 'stud_dimension_verified_foto',
      type: 'image',
      label: 'STUD DIMENSION, VERIFIED - Photo',
      section: 'Page 3: Stud Spacing and Dimensions',
      required: false,
    },
    {
      id: 'depth_floor_blocking',
      type: 'text',
      label: 'DEPTH OF FLOOR BLOCKING',
      section: 'Page 3: Stud Spacing and Dimensions',
      placeholder: 'Enter depth of floor blocking',
      required: false,
    },
    {
      id: 'depth_floor_blocking_foto',
      type: 'image',
      label: 'DEPTH OF FLOOR BLOCKING - Photo',
      section: 'Page 3: Stud Spacing and Dimensions',
      required: false,
    },

    // ========== PÁGINA 4: CLIP ANGLES AND GUSSET PLATES ==========
    {
      id: 'clip_angle_typical_bracing',
      type: 'text',
      label: 'CLIP ANGLE IN TYPICAL BRACING',
      section: 'Page 4: Clip Angles and Gusset Plates',
      placeholder: 'Enter clip angle details',
      required: false,
    },
    {
      id: 'clip_angle_typical_bracing_foto',
      type: 'image',
      label: 'CLIP ANGLE IN TYPICAL BRACING - Photo',
      section: 'Page 4: Clip Angles and Gusset Plates',
      required: false,
    },
    {
      id: 'clip_angle_thick_achieved',
      type: 'text',
      label: 'CLIP ANGLE THICK, ACHIEVED',
      section: 'Page 4: Clip Angles and Gusset Plates',
      placeholder: 'Enter clip angle thickness achieved',
      required: false,
    },
    {
      id: 'clip_angle_thick_achieved_foto',
      type: 'image',
      label: 'CLIP ANGLE THICK, ACHIEVED - Photo',
      section: 'Page 4: Clip Angles and Gusset Plates',
      required: false,
    },
    {
      id: 'gusset_plate_2nd_floor_bar_11',
      type: 'text',
      label: 'GUSSET PLATE 2ND FLOOR - BAR #11 PLACED IN CENTER OF PILE',
      section: 'Page 4: Clip Angles and Gusset Plates',
      placeholder: 'Enter gusset plate 2nd floor details',
      required: false,
    },
    {
      id: 'gusset_plate_2nd_floor_bar_11_foto',
      type: 'image',
      label: 'GUSSET PLATE 2ND FLOOR - Photo',
      section: 'Page 4: Clip Angles and Gusset Plates',
      required: false,
    },
    {
      id: 'gusset_plate_1st_floor_space_between',
      type: 'text',
      label: 'GUSSET PLATE 1St floor - SPACE BETWEEN GUSSET PLATE NORTH SIDE',
      section: 'Page 4: Clip Angles and Gusset Plates',
      placeholder: 'Enter gusset plate 1st floor details',
      required: false,
    },
    {
      id: 'gusset_plate_1st_floor_space_between_foto',
      type: 'image',
      label: 'GUSSET PLATE 1St floor - Photo',
      section: 'Page 4: Clip Angles and Gusset Plates',
      required: false,
    },

    // ========== PÁGINA 5: WEB STIFFENER AND SOLID BLOCKING ==========
    {
      id: 'web_stiffener_floor_joist_2nd_floor_portland',
      type: 'text',
      label: 'WEB STIFFENER IN FLOOR JOIST, 2ND FLOOR - PORTLAND CEMENT USED FOR',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      placeholder: 'Enter web stiffener details',
      required: false,
    },
    {
      id: 'web_stiffener_floor_joist_2nd_floor_portland_foto',
      type: 'image',
      label: 'WEB STIFFENER IN FLOOR JOIST, 2ND FLOOR - Photo',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      required: false,
    },
    {
      id: 'web_stiffener_thick_achieved_tremie',
      type: 'text',
      label: 'WEB STIFFENER THICK, ACHIEVED - TREMIE METHOD FOR GROUTING',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      placeholder: 'Enter web stiffener thickness achieved',
      required: false,
    },
    {
      id: 'web_stiffener_thick_achieved_tremie_foto',
      type: 'image',
      label: 'WEB STIFFENER THICK, ACHIEVED - Photo',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      required: false,
    },
    {
      id: 'solid_blocking_bar_11',
      type: 'text',
      label: 'SOLID BLOCKING - BAR #11 PLACED IN CENTER OF PILE',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      placeholder: 'Enter solid blocking details',
      required: false,
    },
    {
      id: 'solid_blocking_bar_11_foto',
      type: 'image',
      label: 'SOLID BLOCKING - Photo',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      required: false,
    },
    {
      id: 'solid_blocking_thick_achieved',
      type: 'text',
      label: 'SOLID BLOCKING THICK, ACHIEVED - CERTIFIED WELDER',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      placeholder: 'Enter solid blocking thickness achieved',
      required: false,
    },
    {
      id: 'solid_blocking_thick_achieved_foto',
      type: 'image',
      label: 'SOLID BLOCKING THICK, ACHIEVED - Photo',
      section: 'Page 5: Web Stiffener and Solid Blocking',
      required: false,
    },

    // ========== PÁGINA 6: BRACED FRAME AND FLOOR BLOCKING ==========
    {
      id: 'braced_frame_br3_2nd_floor_east_side',
      type: 'text',
      label: 'BRACED FRAME BR-3, 2ND FLOOR, EAST SIDE',
      section: 'Page 6: Braced Frame and Floor Blocking',
      placeholder: 'Enter braced frame BR-3 details',
      required: false,
    },
    {
      id: 'braced_frame_br3_2nd_floor_east_side_foto',
      type: 'image',
      label: 'BRACED FRAME BR-3, 2ND FLOOR - Photo',
      section: 'Page 6: Braced Frame and Floor Blocking',
      required: false,
    },
    {
      id: 'plate_brace_frame_thick_achieved_electrode',
      type: 'text',
      label: 'PLATE BRACE FRAME THICK, ACHIEVED - ELECTRODE USED IN FIELD',
      section: 'Page 6: Braced Frame and Floor Blocking',
      placeholder: 'Enter plate brace frame thickness',
      required: false,
    },
    {
      id: 'plate_brace_frame_thick_achieved_electrode_foto',
      type: 'image',
      label: 'PLATE BRACE FRAME THICK, ACHIEVED - Photo',
      section: 'Page 6: Braced Frame and Floor Blocking',
      required: false,
    },
    {
      id: 'floor_blocking_like_beam',
      type: 'text',
      label: 'FLOOR BLOCKING LIKE BEAM',
      section: 'Page 6: Braced Frame and Floor Blocking',
      placeholder: 'Enter floor blocking details',
      required: false,
    },
    {
      id: 'floor_blocking_like_beam_foto',
      type: 'image',
      label: 'FLOOR BLOCKING LIKE BEAM - Photo',
      section: 'Page 6: Braced Frame and Floor Blocking',
      required: false,
    },
    {
      id: 'closure_track_for_studs_rotary',
      type: 'text',
      label: 'CLOSURE TRACK FOR STUDS - ROTARY MACHINE FOR PILE',
      section: 'Page 6: Braced Frame and Floor Blocking',
      placeholder: 'Enter closure track details',
      required: false,
    },
    {
      id: 'closure_track_for_studs_rotary_foto',
      type: 'image',
      label: 'CLOSURE TRACK FOR STUDS - Photo',
      section: 'Page 6: Braced Frame and Floor Blocking',
      required: false,
    },

    // ========== PÁGINA 7: LEVELING AND BRACED FRAME 1ST FLOOR ==========
    {
      id: 'leveling_foundation_base_grout',
      type: 'text',
      label: 'LEVELING THE FOUNDATION BASE WITH GROUT',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      placeholder: 'Enter leveling foundation details',
      required: false,
    },
    {
      id: 'leveling_foundation_base_grout_foto',
      type: 'image',
      label: 'LEVELING THE FOUNDATION BASE WITH GROUT - Photo',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      required: false,
    },
    {
      id: 'track_foundation_concrete_anchor_1_4_x_1_7_8_16_oc',
      type: 'text',
      label: 'TRACK TO THE FOUNDATION CONCRETE ANCHOR 1/4"x 1-7/8" @16" O.C.',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      placeholder: 'Enter track foundation anchor details',
      required: false,
    },
    {
      id: 'track_foundation_concrete_anchor_1_4_x_1_7_8_16_oc_foto',
      type: 'image',
      label: 'TRACK TO THE FOUNDATION CONCRETE ANCHOR - Photo',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      required: false,
    },
    {
      id: 'braced_frame_1st_floor_north_side',
      type: 'text',
      label: 'BRACED FRAME 1ST FLOOR, NORTH SIDE',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      placeholder: 'Enter braced frame 1st floor details',
      required: false,
    },
    {
      id: 'braced_frame_1st_floor_north_side_foto',
      type: 'image',
      label: 'BRACED FRAME 1ST FLOOR, NORTH SIDE - Photo',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      required: false,
    },
    {
      id: 'joist_web_depth_2nd_floor_rotary',
      type: 'text',
      label: 'JOIST WEB DEPTH 2ND FLOOR - ROTARY MACHINE FOR PILE',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      placeholder: 'Enter joist web depth details',
      required: false,
    },
    {
      id: 'joist_web_depth_2nd_floor_rotary_foto',
      type: 'image',
      label: 'JOIST WEB DEPTH 2ND FLOOR - Photo',
      section: 'Page 7: Leveling and Braced Frame 1st Floor',
      required: false,
    },

    // ========== PÁGINA 8: FLOOR JOIST SPACING AND FLAT STRAP ==========
    {
      id: 'floor_joist_spacing_verified_16',
      type: 'text',
      label: 'FLOOR JOIST SPACING VERIFIED @16"',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      placeholder: 'Enter floor joist spacing verification',
      required: false,
    },
    {
      id: 'floor_joist_spacing_verified_16_foto',
      type: 'image',
      label: 'FLOOR JOIST SPACING VERIFIED @16" - Photo',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      required: false,
    },
    {
      id: 'flat_strap_electrode',
      type: 'text',
      label: 'FLAT STRAP - ELECTRODE USED IN FIELD',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      placeholder: 'Enter flat strap details',
      required: false,
    },
    {
      id: 'flat_strap_electrode_foto',
      type: 'image',
      label: 'FLAT STRAP - Photo',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      required: false,
    },
    {
      id: 'spacing_typical_bracing_4_achieved_grout',
      type: 'text',
      label: 'SPACING IN TYPICAL BRACING 4\', ACHIEVED - GROUT MIXER IN FIELD',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      placeholder: 'Enter spacing in typical bracing details',
      required: false,
    },
    {
      id: 'spacing_typical_bracing_4_achieved_grout_foto',
      type: 'image',
      label: 'SPACING IN TYPICAL BRACING 4\', ACHIEVED - Photo',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      required: false,
    },
    {
      id: 'type_screw_used_field_rotary',
      type: 'text',
      label: 'TYPE OF SCREW USED IN FIELD - ROTARY MACHINE FOR PILE',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      placeholder: 'Enter type of screw used',
      required: false,
    },
    {
      id: 'type_screw_used_field_rotary_foto',
      type: 'image',
      label: 'TYPE OF SCREW USED IN FIELD - Photo',
      section: 'Page 8: Floor Joist Spacing and Flat Strap',
      required: false,
    },

    // ========== PÁGINA 9: HOLDOWN AND STRAP IN BLOCKING ==========
    {
      id: 'holdown_3rd_floor',
      type: 'text',
      label: 'HOLDOWN 3RD FLOOR',
      section: 'Page 9: Holdown and Strap in Blocking',
      placeholder: 'Enter holdown 3rd floor details',
      required: false,
    },
    {
      id: 'holdown_3rd_floor_foto',
      type: 'image',
      label: 'HOLDOWN 3RD FLOOR - Photo',
      section: 'Page 9: Holdown and Strap in Blocking',
      required: false,
    },
    {
      id: 'connection_holdown_1st_2nd_floor_north_side_electrode',
      type: 'text',
      label: 'CONNECTION HOLDOWN 1ST TO 2ND FLOOR, NORTH SIDE - ELECTRODE USED IN FIELD',
      section: 'Page 9: Holdown and Strap in Blocking',
      placeholder: 'Enter connection holdown details',
      required: false,
    },
    {
      id: 'connection_holdown_1st_2nd_floor_north_side_electrode_foto',
      type: 'image',
      label: 'CONNECTION HOLDOWN 1ST TO 2ND FLOOR - Photo',
      section: 'Page 9: Holdown and Strap in Blocking',
      required: false,
    },
    {
      id: 'strap_blocking_grout',
      type: 'text',
      label: 'STRAP IN BLOCKING - GROUT MIXER IN FIELD',
      section: 'Page 9: Holdown and Strap in Blocking',
      placeholder: 'Enter strap in blocking details',
      required: false,
    },
    {
      id: 'strap_blocking_grout_foto',
      type: 'image',
      label: 'STRAP IN BLOCKING - Photo',
      section: 'Page 9: Holdown and Strap in Blocking',
      required: false,
    },
    {
      id: 'strap_blocking_thick_rotary',
      type: 'text',
      label: 'STRAP IN BLOCKING THICK - ROTARY MACHINE FOR PILE',
      section: 'Page 9: Holdown and Strap in Blocking',
      placeholder: 'Enter strap in blocking thickness',
      required: false,
    },
    {
      id: 'strap_blocking_thick_rotary_foto',
      type: 'image',
      label: 'STRAP IN BLOCKING THICK - Photo',
      section: 'Page 9: Holdown and Strap in Blocking',
      required: false,
    },

    // ========== PÁGINA 10: GUSSET PLATE BRACED WALLS ==========
    {
      id: 'gusset_plate_braced_walls',
      type: 'text',
      label: 'GUSSET PLATE IN BRACED WALLS. IN THE FIELD THERE ANCHOR FOR FOUNDATION CONCRETE AND ARE TWO PIECE INSTEAD OF ONE PIECE.',
      section: 'Page 10: Gusset Plate Braced Walls',
      placeholder: 'Enter gusset plate braced walls details',
      required: false,
    },
    {
      id: 'gusset_plate_braced_walls_foto',
      type: 'image',
      label: 'GUSSET PLATE IN BRACED WALLS - Photo',
      section: 'Page 10: Gusset Plate Braced Walls',
      required: false,
    },
    {
      id: 'anchor_foundation_concrete_track',
      type: 'text',
      label: 'ANCHOR FOUNDATION CONCRETE TRACK',
      section: 'Page 10: Gusset Plate Braced Walls',
      placeholder: 'Enter anchor foundation concrete track details',
      required: false,
    },
    {
      id: 'anchor_foundation_concrete_track_foto',
      type: 'image',
      label: 'ANCHOR FOUNDATION CONCRETE TRACK - Photo',
      section: 'Page 10: Gusset Plate Braced Walls',
      required: false,
    },
  ],
};
// FORMULARIO ORGANIZADO POR PÁGINAS DEL PDF

import { InspectionForm } from '../../../types';

export const foundationWallInspectionByPagesForm: InspectionForm = {
  id: 'foundation-wall-inspection-pages', // Changed ID to reflect update
  name: 'Foundation Wall Inspection', // Changed name
  description: 'Foundation wall inspection organized by PDF template pages with updated field order',
  categoryId: 'structures',
  estimatedTime: 25, // Keeping the estimated time as an example
  pdfTemplate: '8FOUNDATION_WALL.pdf', // Updated PDF template name

  fields: [
    // ========== PÁGINA 1: INFORMACIÓN GENERAL (Repetida de tu ejemplo inicial) ==========
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

    // ========== PÁGINA 2: NARRATIVA DE INSPECCIÓN (Generalmente texto, no campos editables) ==========
    // Si tu PDF tiene campos en esta página, deberías añadirlos aquí.
    // Por ahora, se asume que sigue siendo narrativa o no editable.

    // ========== PÁGINA 3: FOUNDATION WALL SIDES & REINFORCEMENT (De la Imagen 1 de tu nueva secuencia) ==========
    {
      id: 'foundation_west_side',
      type: 'text',
      label: 'FOUNDATION WALL, WEST SIDE',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      placeholder: 'Enter status for west side',
      description: undefined,
      maxImages: false
    },
    {
      id: 'foundation_west_side_photo',
      type: 'image',
      label: 'FOUNDATION WALL, WEST SIDE - Photo',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'foundation_north_side',
      type: 'text',
      label: 'FOUNDATION WALL, NORTH SIDE',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      placeholder: 'Enter status for north side',
      description: undefined,
      maxImages: false
    },
    {
      id: 'foundation_north_side_photo',
      type: 'image',
      label: 'FOUNDATION WALL, NORTH SIDE - Photo',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'horizontal_rebar_5_at_12',
      type: 'text',
      label: 'HORIZONTAL REINFORCEMENT #5@12"',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      placeholder: 'Enter details for horizontal reinforcement',
      description: undefined,
      maxImages: false
    },
    {
      id: 'horizontal_rebar_5_at_12_photo',
      type: 'image',
      label: 'HORIZONTAL REINFORCEMENT #5@12" - Photo',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'vertical_rebar_5_at_12',
      type: 'text',
      label: 'VERTICAL REINFORCEMENT #5@12"',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      placeholder: 'Enter details for vertical reinforcement',
      description: undefined,
      maxImages: false
    },
    {
      id: 'vertical_rebar_5_at_12_photo',
      type: 'image',
      label: 'VERTICAL REINFORCEMENT #5@12" - Photo',
      section: 'Page 3: Foundation Wall Sides & Reinforcement',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 4: DOWELS & LAP SPLICES (De la Imagen 2 de tu nueva secuencia) ==========
    {
      id: 'dowel_lap_splice_5ft',
      type: 'text',
      label: '5\' LENGTH DOWELS LAP SPLICE, FOUNDATION WALL',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      placeholder: 'Enter 5ft dowel lap splice details',
      description: undefined,
      maxImages: false
    },
    {
      id: 'dowel_lap_splice_5ft_photo',
      type: 'image',
      label: '5\' LENGTH DOWELS LAP SPLICE - Photo',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'horizontal_lap_splice_3ft4in',
      type: 'text',
      label: '3\' 4" HORIZONTAL LAP SPLICE',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      placeholder: 'Enter 3\' 4" horizontal lap splice details',
      description: undefined,
      maxImages: false
    },
    {
      id: 'horizontal_lap_splice_3ft4in_photo',
      type: 'image',
      label: '3\' 4" HORIZONTAL LAP SPLICE - Photo',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'lap_splice_corner_36in',
      type: 'text',
      label: '36" LAP SPLICE IN CORNER',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      placeholder: 'Enter 36" lap splice corner details',
      description: undefined,
      maxImages: false
    },
    {
      id: 'lap_splice_corner_36in_photo',
      type: 'image',
      label: '36" LAP SPLICE IN CORNER - Photo',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'corner_reinforcement_detail',
      type: 'text',
      label: 'CORNER REINFORCEMENT DETAIL',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      placeholder: 'Enter corner reinforcement detail',
      description: undefined,
      maxImages: false
    },
    {
      id: 'corner_reinforcement_detail_photo',
      type: 'image',
      label: 'CORNER REINFORCEMENT DETAIL - Photo',
      section: 'Page 4: Dowels & Lap Splices',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 5: REBAR VERIFICATION (De la Imagen 3 de tu nueva secuencia) ==========
    {
      id: 'rebar_5_verified_in_field',
      type: 'text',
      label: 'REBAR #5, VERIFIED IN FIELD',
      section: 'Page 5: Rebar Verification',
      required: false,
      placeholder: 'Enter rebar verification status',
      description: undefined,
      maxImages: false
    },
    {
      id: 'rebar_5_verified_in_field_photo',
      type: 'image',
      label: 'REBAR #5, VERIFIED IN FIELD - Photo',
      section: 'Page 5: Rebar Verification',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 6: CEMENT, TREMIE, BAR & WELDER (De la Imagen 4 de tu nueva secuencia) ==========
    {
      id: 'portland_cement_type_used',
      type: 'text',
      label: 'PORTLAND CEMENT TYPE',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      placeholder: 'Enter portland cement type',
      description: undefined,
      maxImages: false
    },
    {
      id: 'portland_cement_type_used_photo',
      type: 'image',
      label: 'PORTLAND CEMENT TYPE - Photo',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'tremie_method_for_grouting',
      type: 'text',
      label: 'TREMIE METOD USED FOR GROUTING',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      placeholder: 'Describe tremie method for grouting',
      description: undefined,
      maxImages: false
    },
    {
      id: 'tremie_method_for_grouting_photo',
      type: 'image',
      label: 'TREMIE METOD USED FOR GROUTING - Photo',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'bar_in_the_center_of_pile',
      type: 'text',
      label: 'BAR IN THE CENTER OF PILE',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      placeholder: 'Enter bar details for center of pile',
      description: undefined,
      maxImages: false
    },
    {
      id: 'bar_in_the_center_of_pile_photo',
      type: 'image',
      label: 'BAR IN THE CENTER OF PILE - Photo',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'certified_welder_er',
      type: 'text',
      label: 'CERTIFIED WELDER',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      placeholder: 'Enter certified welder info',
      description: undefined,
      maxImages: false
    },
    {
      id: 'certified_welder_er_photo',
      type: 'image',
      label: 'CERTIFIED WELDER - Photo',
      section: 'Page 6: Cement, Tremie, Bar & Welder',
      required: false,
      description: undefined,
      maxImages: false
    },

    // ========== PÁGINA 7: PILE GROUTING & MACHINERY (De la Imagen 5 de tu nueva secuencia) ==========
    {
      id: 'pile_grouted_status',
      type: 'text',
      label: 'PILE GROUTED',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      placeholder: 'Enter pile grouted status',
      description: undefined,
      maxImages: false
    },
    {
      id: 'pile_grouted_status_photo',
      type: 'image',
      label: 'PILE GROUTED - Photo',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'electrode_used_in_field',
      type: 'text',
      label: 'ELECTRODE USED IN FIELD',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      placeholder: 'Enter electrode used in field',
      description: undefined,
      maxImages: false
    },
    {
      id: 'electrode_used_in_field_photo',
      type: 'image',
      label: 'ELECTRODE USED IN FIELD - Photo',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'grout_mixer_in_field',
      type: 'text',
      label: 'GROUT MIXER IN FIELD',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      placeholder: 'Enter grout mixer details',
      description: undefined,
      maxImages: false
    },
    {
      id: 'grout_mixer_in_field_photo',
      type: 'image',
      label: 'GROUT MIXER IN FIELD - Photo',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      description: undefined,
      maxImages: false
    },
    {
      id: 'rotary_machine_for_pile',
      type: 'text',
      label: 'ROTARY MACHINE FOR PILE',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      placeholder: 'Enter rotary machine details',
      description: undefined,
      maxImages: false
    },
    {
      id: 'rotary_machine_for_pile_photo',
      type: 'image',
      label: 'ROTARY MACHINE FOR PILE - Photo',
      section: 'Page 7: Pile Grouting & Machinery',
      required: false,
      description: undefined,
      maxImages: false
    },
  ],
};
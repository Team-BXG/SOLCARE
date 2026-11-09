export const equipmentCatalog = [
  // Lighting
  { category: 'Lighting', name: 'LED Tube / Bulb (Indoor)', defaultWatts: 15, typicalHours: 12, priority: 'Essential' },
  { category: 'Lighting', name: 'Medical Examination Light', defaultWatts: 50, typicalHours: 6, priority: 'Critical' },
  { category: 'Lighting', name: 'Surgical Operating Theatre Lamp', defaultWatts: 120, typicalHours: 8, priority: 'Critical' },
  { category: 'Lighting', name: 'Security Perimeter Floodlight', defaultWatts: 80, typicalHours: 12, priority: 'Non-essential' },

  // Medical Cold Chain
  { category: 'Medical Cold Chain', name: 'Solar Direct Drive (SDD) Vaccine Refrigerator', defaultWatts: 120, typicalHours: 24, priority: 'Critical' },
  { category: 'Medical Cold Chain', name: 'Standard Vaccine Refrigerator / Freezer (ILR)', defaultWatts: 240, typicalHours: 24, priority: 'Critical' },
  { category: 'Medical Cold Chain', name: 'Blood Bank Storage Refrigerator', defaultWatts: 350, typicalHours: 24, priority: 'Critical' },
  { category: 'Medical Cold Chain', name: 'Laboratory Plasma Freezer (-20°C / -40°C)', defaultWatts: 450, typicalHours: 24, priority: 'Critical' },

  // Laboratory
  { category: 'Laboratory', name: 'Binocular LED Microscope', defaultWatts: 30, typicalHours: 6, priority: 'Essential' },
  { category: 'Laboratory', name: 'Clinical Centrifuge', defaultWatts: 150, typicalHours: 4, priority: 'Essential' },
  { category: 'Laboratory', name: 'Hematology / Chemistry Analyzer', defaultWatts: 300, typicalHours: 6, priority: 'Essential' },
  { category: 'Laboratory', name: 'Electric Benchtop Autoclave / Sterilizer', defaultWatts: 1500, typicalHours: 3, priority: 'Essential' },
  { category: 'Laboratory', name: 'Microbiology Incubator', defaultWatts: 250, typicalHours: 24, priority: 'Critical' },
  { category: 'Laboratory', name: 'Water Distillation Unit', defaultWatts: 1200, typicalHours: 2, priority: 'Non-essential' },

  // Maternity and Emergency
  { category: 'Maternity and Emergency', name: 'Medical Oxygen Concentrator (10L/min)', defaultWatts: 600, typicalHours: 18, priority: 'Critical' },
  { category: 'Maternity and Emergency', name: 'Electric Suction Machine', defaultWatts: 120, typicalHours: 4, priority: 'Critical' },
  { category: 'Maternity and Emergency', name: 'Infant Radiant Warmer', defaultWatts: 400, typicalHours: 12, priority: 'Critical' },
  { category: 'Maternity and Emergency', name: 'Neonatal Phototherapy Unit', defaultWatts: 100, typicalHours: 14, priority: 'Critical' },
  { category: 'Maternity and Emergency', name: 'Vital Signs / Multi-Parameter Patient Monitor', defaultWatts: 70, typicalHours: 24, priority: 'Critical' },
  { category: 'Maternity and Emergency', name: 'Ultrasound Scanner Machine', defaultWatts: 200, typicalHours: 5, priority: 'Essential' },

  // Water and Sanitation
  { category: 'Water and Sanitation', name: 'Solar / Electric Submersible Water Pump', defaultWatts: 1100, typicalHours: 5, priority: 'Critical' },
  { category: 'Water and Sanitation', name: 'Surface Booster Water Pump', defaultWatts: 750, typicalHours: 4, priority: 'Essential' },
  { category: 'Water and Sanitation', name: 'UV Water Purifier System', defaultWatts: 45, typicalHours: 8, priority: 'Essential' },

  // ICT & Administration
  { category: 'ICT', name: 'Desktop Computer & Workstation', defaultWatts: 180, typicalHours: 8, priority: 'Non-essential' },
  { category: 'ICT', name: 'Laptop Computer', defaultWatts: 65, typicalHours: 8, priority: 'Essential' },
  { category: 'ICT', name: 'Office Printer / Scanner Multi-function', defaultWatts: 250, typicalHours: 2, priority: 'Non-essential' },
  { category: 'ICT', name: 'Network Router / VSAT Satellite Terminal', defaultWatts: 40, typicalHours: 24, priority: 'Essential' },
  { category: 'ICT', name: 'VHF Emergency Two-Way Radio Base', defaultWatts: 35, typicalHours: 24, priority: 'Critical' },

  // Other
  { category: 'Other', name: 'Ceiling Fan / Ventilation Fan', defaultWatts: 75, typicalHours: 10, priority: 'Non-essential' },
  { category: 'Other', name: 'Small Refrigerator (Staff/Pharmacy)', defaultWatts: 150, typicalHours: 24, priority: 'Essential' },
];

export const equipmentCategories = [
  'Lighting',
  'Medical Cold Chain',
  'Laboratory',
  'Maternity and Emergency',
  'Water and Sanitation',
  'ICT',
  'Other',
];

export const ethFacilityLevels = [
  'Health Post',
  'Primary Health Center',
  'General Hospital',
  'Specialized Hospital',
  'Rural Emergency Center',
  'Other',
];

export const ethRegions = [
  'Sidama',
  'Oromia',
  'Amhara',
  'Tigray',
  'Dire Dawa',
  'Addis Ababa',
  'Afar',
  'Somali',
  'Benishangul-Gumuz',
  'Gambela',
  'South Ethiopia Regional State',
  'Central Ethiopia Regional State',
  'South West Ethiopia Peoples\' Region',
  'Harari',
];


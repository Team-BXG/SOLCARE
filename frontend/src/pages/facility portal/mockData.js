export const initialProfileData = {
  facilityName: 'Hawassa General Hospital',
  facilityType: 'General Hospital',
  region: 'Sidama',
  zone: 'Hawassa',
  contactPerson: 'Dr. Alem Tesfaye',
  phone: '+251911223344',
  email: 'hawassa@hospital.et',
  bedCapacity: '280',
  energyInfrastructure: 'Utility grid connection with diesel generator backup for critical departments.',
  criticalDepartments: 'ICU, Operating Room, Laboratory, Emergency, Cold Chain',
};

export const horizontalStats = [
  { label: 'ACTIVE REQUESTS', value: '03', sub: 'Two under technical review' },
  { label: 'APPROVED CAPACITY', value: '35kWp', sub: 'Ready for supplier release' },
  { label: 'DOCUMENTS', value: '12', sub: 'Four uploaded this month' },
  { label: 'CRITICAL LOAD', value: '25kW', sub: 'ICU, OR, laboratory protected' },
];

export const activities = [
  {
    date: 'JAN 22',
    title: '35kWp system technically assessed',
    desc: 'Supplier release is the next workflow milestone for REQ-2025-001.',
  },
  {
    date: 'JAN 18',
    title: 'Supporting documents reviewed',
    desc: 'Load calculation and site plan were verified by the assessment team.',
  },
  {
    date: 'JAN 10',
    title: 'New demand submitted',
    desc: 'Solar demand for ICU, OR, laboratory, and emergency loads entered review.',
  },
];

export const submittedRequests = [
  {
    id: 'REQ-2025-001',
    summary: '35kWp Solar System',
    submittedDate: 'Jan-10-2025',
    status: 'Technically Assessed',
    statusClass: 'assessed',
    lastUpdated: 'Jan-22-2025',
    departments: 'ICU, Operating Room, Laboratory, Emergency',
    capacity: '35 kWp',
  },
  {
    id: 'REQ-2025-006',
    summary: '5kWp Water Pump',
    submittedDate: 'Feb-12-2025',
    status: 'Technical Assessment',
    statusClass: 'pending',
    lastUpdated: 'Feb-15-2025',
    departments: 'Water borehole & sanitation storage',
    capacity: '5 kWp',
  },
  {
    id: 'REQ-2025-009',
    summary: 'Operating Theatre Backup',
    submittedDate: 'Mar-04-2025',
    status: 'Draft',
    statusClass: 'open',
    lastUpdated: 'Mar-04-2025',
    departments: 'Operating Room 1 & 2 surgical units',
    capacity: '20 kWp',
  },
  {
    id: 'REQ-2024-089',
    summary: '10kWp Solar System',
    submittedDate: 'Nov-01-2024',
    status: 'Completed',
    statusClass: 'completed',
    lastUpdated: 'Jan-30-2025',
    departments: 'Maternity & Pediatric clinics',
    capacity: '10 kWp',
  },
];

export const documentsList = [
  { title: 'Load Calculation Sheet', category: 'Energy Assessment', date: 'JAN-09-2025', status: 'Verified', statusClass: 'verified' },
  { title: 'Rooftop Site Plan', category: 'Site Survey', date: 'JAN-09-2025', status: 'Verified', statusClass: 'verified' },
  { title: 'Facility Layout', category: 'Facility Record', date: 'JAN-10-2025', status: 'Under Review', statusClass: 'open' },
  { title: 'Authorization Letter', category: 'Administration', date: 'JAN-10-2025', status: 'Verified', statusClass: 'verified' },
];

export const notificationsList = [
  {
    id: 1,
    title: 'Technical assessment completed',
    text: 'REQ-2025-001 has been technically assessed and is ready for supplier release.',
    time: 'TODAY, 09:40',
    color: 'teal',
  },
  {
    id: 2,
    title: 'Facility layout is under review',
    text: 'The engineering team is confirming cable routing for the laboratory block.',
    time: 'YESTERDAY, 16:10',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Draft request needs submission',
    text: 'Operating theatre backup demand is saved as a draft and has not entered review.',
    time: 'MAR-04, 11:25',
    color: 'amber',
  },
];


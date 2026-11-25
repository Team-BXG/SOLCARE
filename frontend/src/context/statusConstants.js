export const STATUS_MAP = {
  'Draft': { label: 'Draft', class: 'open', stage: 'registration' },
  'Under Verification': { label: 'Under Verification', class: 'verification', stage: 'registration' },
  'Verified': { label: 'Verified', class: 'verified', stage: 'assessment' },
  'Under Technical Assessment': { label: 'Under Technical Assessment', class: 'progress', stage: 'assessment' },
  'Technically Assessed': { label: 'Technically Assessed', class: 'assessed', stage: 'assessment' },
  'Released to Supplier': { label: 'Released to Supplier', class: 'released', stage: 'supply' },
  'Supplier Accepted': { label: 'Supplier Accepted', class: 'assessed', stage: 'supply' },
  'Procurement': { label: 'Procurement', class: 'progress', stage: 'supply' },
  'Dispatched': { label: 'Dispatched', class: 'progress', stage: 'supply' },
  'Delivered': { label: 'Delivered', class: 'assessed', stage: 'supply' },
  'Installation In Progress': { label: 'Installation In Progress', class: 'progress', stage: 'installation' },
  'In Progress': { label: 'In Progress', class: 'progress', stage: 'supply' },
  'Completed': { label: 'Completed', class: 'completed', stage: 'completion' },
  'Returned': { label: 'Returned', class: 'progress', stage: 'assessment' },
  'Rejected': { label: 'Rejected', class: 'revision', stage: 'assessment' },
};


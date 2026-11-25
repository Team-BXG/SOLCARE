import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialDemands,
  initialFacilities,
  initialSuppliers,
} from '../pages/admin/mockData';
import { STATUS_MAP } from './statusConstants';

const SolcareContext = createContext(null);

const STORAGE_KEYS = {
  DEMANDS: 'solcare_demands',
  FACILITIES: 'solcare_facilities',
  SUPPLIERS: 'solcare_suppliers',
  NOTIFICATIONS: 'solcare_notifications',
};

export function SolcareProvider({ children }) {
  // 1. Demands / Requests State
  const [demands, setDemands] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEMANDS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading demands from localStorage:', e);
    }
    return initialDemands.map((d) => ({
      ...d,
      urgency: d.urgency || 'High',
      severity: d.severity || 'Critical',
      supplyStage: d.supplyStage || (d.status === 'Completed' ? 'Installation Completed' : d.status === 'In Progress' ? 'Dispatched' : 'Pending Claim'),
      installedCapacity: d.installedCapacity || d.requirement || '35 kWp solar PV',
      assessmentNotes: d.assessmentNotes || (d.techAssessment === 'Complete' ? 'Technically assessed and sizing approved by Regional Engineering Desk.' : ''),
      recommendations: d.recommendations || 'Recommended hybrid system with Lithium-ion battery bank for continuous critical ward coverage.',
      decision: d.decision || (d.techAssessment === 'Complete' ? 'Approved' : 'Pending'),
      assessmentDate: d.assessmentDate || d.date,
    }));
  });

  // 2. Facilities
  const [facilities, setFacilities] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialFacilities;
  });

  // 3. Suppliers
  const [suppliers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUPPLIERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialSuppliers;
  });

  // 4. Notifications Feed
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 'notif-1',
        title: 'Technical assessment completed',
        text: 'REQ-2025-001 (Hawassa General Hospital) has been technically assessed and is ready for supplier release.',
        time: 'TODAY, 09:40',
        color: 'teal',
      },
      {
        id: 'notif-2',
        title: 'Solar supply dispatched',
        text: 'Bright Solar PLC dispatched 350kWp equipment for Gondar University Hospital.',
        time: 'YESTERDAY, 16:10',
        color: 'blue',
      },
      {
        id: 'notif-3',
        title: 'New demand submitted',
        text: 'Adama Medical Center demand entered technical assessment queue.',
        time: 'MAR-04, 11:25',
        color: 'amber',
      },
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEMANDS, JSON.stringify(demands));
    } catch (e) {
      console.error('Failed saving demands to localStorage:', e);
    }
  }, [demands]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    } catch (e) {
      console.error(e);
    }
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
    } catch (e) {
      console.error(e);
    }
  }, [suppliers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Helper: Add Notification
  const addNotification = (title, text, color = 'teal') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      text,
      time: 'JUST NOW',
      color,
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);
  };

  // -------------------------------------------------------------
  // ACTION: Register New Energy Request (Facility or Admin Portal)
  // -------------------------------------------------------------
  const registerDemand = (demandData) => {
    const nextSeq = demands.length + 1;
    const reqYear = new Date().getFullYear();
    const generatedId = `REQ-${reqYear}-${String(nextSeq).padStart(3, '0')}`;

    const newDemand = {
      id: generatedId,
      facility: demandData.facility || demandData.facilityInfo?.name || 'Hawassa General Hospital',
      type: demandData.type || demandData.facilityInfo?.level || 'General Hospital',
      region: demandData.region || demandData.facilityInfo?.region || 'Sidama',
      regionZone: demandData.regionZone || `${demandData.region || 'Sidama'} ${demandData.zone || 'Hawassa'}`,
      woreda: demandData.woreda || demandData.facilityInfo?.woreda || 'Hawassa City',
      requirement: demandData.requirement || `${demandData.calculated?.suggestedKwp || 35} kWp Solar PV + Battery`,
      status: 'Under Verification',
      statusClass: 'verification',
      techAssessment: 'Not Started',
      techClass: 'not-started',
      supplier: '—',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      updatedDate: `Updated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      urgency: demandData.urgency || 'High',
      severity: demandData.severity || 'Critical',
      criticalDepartments: demandData.criticalDepartments || 'ICU, Operating Room, Laboratory, Emergency',
      summary: demandData.requirement || `${demandData.calculated?.suggestedKwp || 35} kWp Solar System`,
      submittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      capacity: `${demandData.calculated?.suggestedKwp || 35} kWp`,
      departments: demandData.criticalDepartments || 'ICU, Operating Room, Laboratory, Emergency',
      calculated: demandData.calculated || null,
      existingEquipment: demandData.existingEquipment || [],
      additionalEquipment: demandData.additionalEquipment || [],
      supplyStage: 'Pending Verification',
      decision: 'Pending',
    };

    setDemands((prev) => [newDemand, ...prev]);

    // Check if facility exists in directory, add if not
    setFacilities((prev) => {
      const exists = prev.some((f) => f.name.toLowerCase() === newDemand.facility.toLowerCase());
      if (exists) return prev;
      return [
        ...prev,
        {
          name: newDemand.facility,
          type: newDemand.type,
          region: newDemand.region,
          zone: demandData.zone || newDemand.region,
          woreda: newDemand.woreda,
        },
      ];
    });

    addNotification(
      'New demand request registered',
      `${newDemand.id} submitted for ${newDemand.facility} (${newDemand.requirement}).`,
      'amber'
    );

    return newDemand;
  };

  // -------------------------------------------------------------
  // ACTION: Update an existing demand (general edit)
  // -------------------------------------------------------------
  const updateDemand = (id, updates) => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const statusMeta = STATUS_MAP[updates.status] || { class: d.statusClass || 'progress' };
        return {
          ...d,
          ...updates,
          statusClass: updates.status ? statusMeta.class : d.statusClass,
          updatedDate: `Updated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
          lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
      })
    );
  };

  // -------------------------------------------------------------
  // ACTION: Delete a demand
  // -------------------------------------------------------------
  const deleteDemand = (id) => {
    setDemands((prev) => prev.filter((d) => d.id !== id));
    addNotification('Demand request deleted', `Request ${id} was removed from the registry.`, 'amber');
  };

  // -------------------------------------------------------------
  // ACTION: Complete Technical Assessment (Engineer Desk)
  // -------------------------------------------------------------
  const completeAssessment = (id, assessmentData) => {
    const {
      severity = 'Critical',
      urgency = 'High',
      findings = '',
      recommendations = '',
      decision = 'Approved',
      recommendedKwp = 35,
      batteryKwh = 70,
    } = assessmentData;

    let newStatus = 'Technically Assessed';
    let newStatusClass = 'assessed';
    let newTechStatus = 'Complete';
    let newTechClass = 'complete';

    if (decision === 'Returned') {
      newStatus = 'Returned';
      newStatusClass = 'progress';
      newTechStatus = 'Requires Revision';
      newTechClass = 'revision';
    } else if (decision === 'Rejected') {
      newStatus = 'Returned';
      newStatusClass = 'revision';
      newTechStatus = 'Requires Revision';
      newTechClass = 'revision';
    } else if (decision === 'Approved') {
      newStatus = 'Technically Assessed';
      newStatusClass = 'assessed';
      newTechStatus = 'Complete';
      newTechClass = 'complete';
    }

    setDemands((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          severity,
          urgency,
          assessmentNotes: findings,
          recommendations,
          decision,
          status: newStatus,
          statusClass: newStatusClass,
          techAssessment: newTechStatus,
          techClass: newTechClass,
          requirement: recommendedKwp ? `${recommendedKwp} kWp solar PV + ${batteryKwh} kWh battery` : d.requirement,
          capacity: recommendedKwp ? `${recommendedKwp} kWp` : d.capacity,
          updatedDate: `Updated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
          lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          supplyStage: decision === 'Approved' ? 'Ready for Supplier Release' : d.supplyStage,
        };
      })
    );

    addNotification(
      `Assessment ${decision}: ${id}`,
      `Technical assessment completed for ${id}. Status updated to "${newStatus}".`,
      decision === 'Approved' ? 'teal' : 'amber'
    );
  };

  // -------------------------------------------------------------
  // ACTION: Release / Assign Demand to Supplier
  // -------------------------------------------------------------
  const assignSupplier = (id, supplierName) => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          supplier: supplierName,
          status: 'Released to Supplier',
          statusClass: 'released',
          supplyStage: 'Supplier Claimed',
          updatedDate: `Updated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
        };
      })
    );

    addNotification(
      'Demand released to supplier',
      `${id} assigned to ${supplierName} for fulfillment.`,
      'blue'
    );
  };

  // -------------------------------------------------------------
  // ACTION: Update Supply Tracking Stages
  // -------------------------------------------------------------
  const updateSupplyStage = (id, stage, notes = '') => {
    let newStatus = 'In Progress';
    let newStatusClass = 'progress';

    if (stage === 'Supplier Accepted') {
      newStatus = 'Supplier Accepted';
      newStatusClass = 'assessed';
    } else if (stage === 'Completed' || stage === 'Installation Completed') {
      newStatus = 'Completed';
      newStatusClass = 'completed';
    } else {
      newStatus = 'In Progress';
      newStatusClass = 'progress';
    }

    setDemands((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          status: newStatus,
          statusClass: newStatusClass,
          supplyStage: stage,
          supplyNotes: notes || d.supplyNotes,
          updatedDate: `Updated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
          lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
      })
    );

    addNotification(
      `Supply Stage: ${stage}`,
      `${id} advanced to "${stage}". Overall status: "${newStatus}".`,
      stage.includes('Completed') ? 'teal' : 'blue'
    );
  };

  // -------------------------------------------------------------
  // Calculated Statistics for Admin, Engineer & Supplier Dashboards
  // -------------------------------------------------------------
  const stats = [
    {
      label: 'Total Facilities',
      value: String(facilities.length),
      trend: '↑ Synchronized live',
      up: true,
      icon: 'Building2',
      color: 'blue',
    },
    {
      label: 'Total Demands',
      value: String(demands.length),
      trend: `↑ ${demands.length} records active`,
      up: true,
      icon: 'FileText',
      color: 'blue',
    },
    {
      label: 'Pending Verification',
      value: String(demands.filter((d) => d.status === 'Under Verification' || d.status === 'Draft').length),
      trend: 'Queue awaiting review',
      up: false,
      icon: 'ShieldAlert',
      color: 'amber',
    },
    {
      label: 'Under Technical Assessment',
      value: String(demands.filter((d) => d.techAssessment === 'In Review' || d.status === 'Under Technical Assessment').length),
      trend: 'Field desk reviews',
      up: true,
      icon: 'Gauge',
      color: 'amber',
    },
    {
      label: 'Technically Assessed',
      value: String(demands.filter((d) => d.status === 'Technically Assessed' || d.techAssessment === 'Complete').length),
      trend: 'Ready for release',
      up: true,
      icon: 'ClipboardCheck',
      color: 'teal',
    },
    {
      label: 'Sent to Suppliers',
      value: String(demands.filter((d) => d.status === 'Released to Supplier' || d.status === 'Supplier Accepted').length),
      trend: 'Active bidding',
      up: true,
      icon: 'ArrowRight',
      color: 'teal',
    },
    {
      label: 'Accepted by Suppliers',
      value: String(demands.filter((d) => d.status === 'Supplier Accepted' || (d.supplier && d.supplier !== '—')).length),
      trend: 'Contracted jobs',
      up: true,
      icon: 'CheckCircle2',
      color: 'teal',
    },
    {
      label: 'In Progress',
      value: String(demands.filter((d) => d.status === 'In Progress' || d.supplyStage?.includes('Progress') || d.supplyStage === 'Dispatched').length),
      trend: 'Procurement & delivery',
      up: false,
      icon: 'Activity',
      color: 'blue',
    },
    {
      label: 'Completed',
      value: String(demands.filter((d) => d.status === 'Completed').length),
      trend: 'Installed & commissioned',
      up: true,
      icon: 'Check',
      color: 'green',
    },
  ];

  return (
    <SolcareContext.Provider
      value={{
        demands,
        facilities,
        suppliers,
        notifications,
        stats,
        registerDemand,
        updateDemand,
        deleteDemand,
        completeAssessment,
        assignSupplier,
        updateSupplyStage,
        addNotification,
      }}
    >
      {children}
    </SolcareContext.Provider>
  );
}

export function useSolcare() {
  const context = useContext(SolcareContext);
  if (!context) {
    throw new Error('useSolcare must be used within a SolcareProvider');
  }
  return context;
}

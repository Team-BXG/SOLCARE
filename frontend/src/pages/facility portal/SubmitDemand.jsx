import { useState } from 'react';
import FacilityHeader from './FacilityHeader';
import {
  equipmentCatalog,
  equipmentCategories,
  ethFacilityLevels,
  ethRegions,
} from './demandFormCatalog';
import { calculateEnergyDemand } from './demandCalculations';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Zap,
  Battery,
  Shield,
  UploadCloud,
  FileCheck2,
} from 'lucide-react';

export default function SubmitDemand({ onNavigate, onDemandSubmitted }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draftSavedMessage, setDraftSavedMessage] = useState(false);

  // ==========================================
  // STEP 1: Facility Information & Operating Schedule
  // ==========================================
  const [facilityInfo, setFacilityInfo] = useState({
    name: 'Hawassa General Hospital',
    level: 'General Hospital',
    region: 'Sidama',
    zone: 'Hawassa',
    woreda: 'Hawassa City',
    kebele: 'Kebele 04, Tabor Sub-city',
    address: 'Near Referral Hospital Road, Hawassa, Sidama',
    headName: 'Dr. Alem Tesfaye',
    phone: '+251 91 122 3344',
    gpsLocation: '7.0504° N, 38.4955° E (Auto-detected)',
    openTime: '08:00',
    closeTime: '17:30',
    is24Hours: 'Yes',
    nightServices: ['Emergency services', 'Maternity and delivery', 'Inpatient services', 'Laboratory', 'Vaccine storage'],
    operatingDaysPerWeek: '7',
    hasNightEmergency: 'Yes',
    hasNightMaternity: 'Yes',
    isStaffQuartersConnected: 'Yes',
  });

  // ==========================================
  // STEP 2: Current Electricity Situation
  // ==========================================
  const [electricitySituation, setElectricitySituation] = useState({
    sources: ['National electricity grid', 'Diesel generator', 'Existing solar system'],
    reliability: 'Frequently interrupted',
    hoursAvailable: '14',
    hasSolar: 'Yes',
    existingSolarCapacity: '10',
    existingBatteryCapacity: '20',
    batteryType: 'Lead-acid',
    isSolarWorking: 'Partially',
    solarProblems: 'Old lead-acid batteries have lost capacity. Cannot sustain refrigerator during nighttime power cuts.',
    challenges: [
      'Frequent power outages',
      'Insufficient electricity for medical equipment',
      'Lack of electricity at night',
      'High diesel fuel costs',
      'Unreliable vaccine refrigeration',
      'Lack of backup power',
    ],
    additionalProblems: 'Grid transformer frequently trips during thunderstorms in rainy season.',
  });

  // ==========================================
  // STEP 3: Register Existing Equipment
  // ==========================================
  const [existingEquipment, setExistingEquipment] = useState([
    {
      id: 'eq-1',
      category: 'Medical Cold Chain',
      name: 'Vaccine Refrigerator (ILR)',
      quantity: 2,
      watts: 240,
      hoursPerDay: 24,
      isWorking: 'Yes',
      isCareImportant: 'Yes',
      usageTime: 'Day and Night',
      modelNumber: 'B-Medical Systems TCW40',
      priority: 'Critical',
      photoName: 'vaccine_refrig_label.jpg',
    },
    {
      id: 'eq-2',
      category: 'Lighting',
      name: 'LED Tube / Bulb (Indoor)',
      quantity: 10,
      watts: 15,
      hoursPerDay: 12,
      isWorking: 'Yes',
      isCareImportant: 'Yes',
      usageTime: 'Day and Night',
      modelNumber: '',
      priority: 'Essential',
      photoName: '',
    },
    {
      id: 'eq-3',
      category: 'Laboratory',
      name: 'Binocular LED Microscope',
      quantity: 1,
      watts: 100,
      hoursPerDay: 6,
      isWorking: 'Yes',
      isCareImportant: 'Yes',
      usageTime: 'Day only',
      modelNumber: 'Olympus CX23',
      priority: 'Essential',
      photoName: '',
    },
    {
      id: 'eq-4',
      category: 'ICT',
      name: 'Desktop Computer & Workstation',
      quantity: 3,
      watts: 200,
      hoursPerDay: 8,
      isWorking: 'Yes',
      isCareImportant: 'No',
      usageTime: 'Day only',
      modelNumber: 'Dell OptiPlex',
      priority: 'Non-essential',
      photoName: '',
    },
  ]);

  // Modal / form state for adding/editing existing equipment
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [editingEquipId, setEditingEquipId] = useState(null);
  const [equipForm, setEquipForm] = useState({
    category: 'Medical Cold Chain',
    name: 'Vaccine Refrigerator (ILR)',
    quantity: 1,
    watts: 240,
    wattsUnknown: false,
    hoursPerDay: 24,
    isWorking: 'Yes',
    isCareImportant: 'Yes',
    usageTime: 'Day and Night',
    modelNumber: '',
    priority: 'Critical',
    photoName: '',
  });

  // ==========================================
  // STEP 4: Additional Equipment Needed
  // ==========================================
  const [hasAdditionalNeeded, setHasAdditionalNeeded] = useState('Yes');
  const [additionalEquipment, setAdditionalEquipment] = useState([
    {
      id: 'add-1',
      name: 'Medical Oxygen Concentrator (10L/min)',
      quantity: 2,
      watts: 600,
      reason: 'New medical service',
      isEssential: 'Yes',
      timeframe: 'Immediate (Within 1-3 months)',
      explanation: 'Currently transferring hypoxemic neonatal and maternal patients due to lack of onsite oxygen production.',
    },
    {
      id: 'add-2',
      name: 'Electric Suction Machine',
      quantity: 1,
      watts: 120,
      reason: 'Existing equipment is damaged',
      isEssential: 'Yes',
      timeframe: 'Immediate (Within 1-3 months)',
      explanation: 'Emergency delivery room requires reliable surgical suction.',
    },
  ]);

  const [hasReplacementNeeded, setHasReplacementNeeded] = useState('Yes');
  const [replacementList, setReplacementList] = useState([
    {
      id: 'rep-1',
      name: 'Solar Inverter 5kW',
      quantity: 1,
      condition: 'Failing / frequent inverter error codes',
      reason: 'Existing equipment needs replacement',
      isWorking: 'Partially',
    },
  ]);

  // Modal state for adding needed equipment
  const [showNeededModal, setShowNeededModal] = useState(false);
  const [neededForm, setNeededForm] = useState({
    name: '',
    quantity: 1,
    watts: 200,
    wattsUnknown: false,
    reason: 'New medical service',
    isEssential: 'Yes',
    timeframe: 'Immediate (Within 1-3 months)',
    explanation: '',
  });

  // ==========================================
  // STEP 5: Energy Requirements & Reliability
  // ==========================================
  const [reliabilityData, setReliabilityData] = useState({
    daysWithoutSunlight: '2 days',
    alwaysPowered: ['Vaccine Refrigerator (ILR)', 'Medical Oxygen Concentrator', 'Emergency Lighting'],
    canSwitchOff: ['Administrative Computers', 'Perimeter Floodlights', 'Water Heater'],
    needsNightElectricity: 'Yes',
    isGeneratorAvailable: 'Yes',
    isBatteryRequired: 'Yes',
  });

  // ==========================================
  // STEP 6: Installation Site & Future Requirements
  // ==========================================
  const [installationData, setInstallationData] = useState({
    preferredSite: 'Rooftop',
    spaceAvailable: 'Yes',
    roofCondition: 'Yes',
    areaShaded: 'No',
    hasExistingStructure: 'Yes',
    sitePhotoUploaded: 'hawassa_main_roof_aerial.png',
    hasExpansionPlan: 'Yes',
    plannedServices: 'Opening a dedicated 12-bed Maternal Intensive Care Unit and expanded vaccine storage depot.',
    needMoreEquipment: 'Yes',
    futureEquipment: 'Commercial autoclave, 2 additional phototherapy lamps, blood bank freezer.',
    expectedGrowth: '20%–30%',
    expansionTimeframe: '1–2 years',
    additionalNotes: 'Facility is designated as regional emergency backup hub for Sidama zone. 24/7 reliability is top priority.',
  });

  // ==========================================
  // STEP 7: Review & Confirmation
  // ==========================================
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Real-time Automated Calculations
  const calculated = calculateEnergyDemand({
    existingEquipment,
    additionalEquipment: hasAdditionalNeeded === 'Yes' ? additionalEquipment : [],
  });

  // Handlers for equipment registration
  const handleOpenAddEquip = () => {
    setEditingEquipId(null);
    setEquipForm({
      category: 'Medical Cold Chain',
      name: 'Vaccine Refrigerator (ILR)',
      quantity: 1,
      watts: 240,
      wattsUnknown: false,
      hoursPerDay: 24,
      isWorking: 'Yes',
      isCareImportant: 'Yes',
      usageTime: 'Day and Night',
      modelNumber: '',
      priority: 'Critical',
      photoName: '',
    });
    setShowEquipModal(true);
  };

  const handleEditEquip = (item) => {
    setEditingEquipId(item.id);
    setEquipForm({ ...item, wattsUnknown: false });
    setShowEquipModal(true);
  };

  const handleDeleteEquip = (id) => {
    setExistingEquipment((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveEquip = () => {
    const finalWatts = equipForm.wattsUnknown ? 100 : Number(equipForm.watts) || 100;
    const finalItem = {
      ...equipForm,
      watts: finalWatts,
      quantity: Number(equipForm.quantity) || 1,
      hoursPerDay: Number(equipForm.hoursPerDay) || 1,
    };

    if (editingEquipId) {
      setExistingEquipment((prev) =>
        prev.map((it) => (it.id === editingEquipId ? { ...finalItem, id: editingEquipId } : it))
      );
    } else {
      setExistingEquipment((prev) => [
        ...prev,
        { ...finalItem, id: `eq-${Date.now()}` },
      ]);
    }
    setShowEquipModal(false);
  };

  // Handlers for additional needed equipment
  const handleSaveNeeded = () => {
    if (!neededForm.name.trim()) return;
    const finalWatts = neededForm.wattsUnknown ? 150 : Number(neededForm.watts) || 150;
    setAdditionalEquipment((prev) => [
      ...prev,
      {
        ...neededForm,
        id: `add-${Date.now()}`,
        watts: finalWatts,
        quantity: Number(neededForm.quantity) || 1,
      },
    ]);
    setShowNeededModal(false);
    setNeededForm({
      name: '',
      quantity: 1,
      watts: 200,
      wattsUnknown: false,
      reason: 'New medical service',
      isEssential: 'Yes',
      timeframe: 'Immediate (Within 1-3 months)',
      explanation: '',
    });
  };

  const handleDeleteNeeded = (id) => {
    setAdditionalEquipment((prev) => prev.filter((it) => it.id !== id));
  };

  const handleSaveDraft = () => {
    setDraftSavedMessage(true);
    setTimeout(() => setDraftSavedMessage(false), 3500);
  };

  const handleSubmitFinal = () => {
    if (!isConfirmed) {
      alert('Please confirm that the information provided is correct before submitting.');
      return;
    }
    setIsSubmitted(true);
    if (onDemandSubmitted) {
      onDemandSubmitted({
        facilityInfo,
        calculated,
        submittedAt: new Date().toISOString(),
      });
    }
  };

  const stepsList = [
    { num: 1, title: 'Facility Info' },
    { num: 2, title: 'Current Electricity' },
    { num: 3, title: 'Existing Equipment' },
    { num: 4, title: 'Equipment Needed' },
    { num: 5, title: 'Energy & Reliability' },
    { num: 6, title: 'Installation Site' },
    { num: 7, title: 'Review & Submit' },
  ];

  // If submitted successfully, show confirmation screen matching prompt
  if (isSubmitted) {
    return (
      <>
        <FacilityHeader />
        <section className="portal-panel-card" style={{ marginTop: 24, textAlign: 'center', padding: '50px 24px' }}>
          <div style={{ display: 'inline-flex', padding: 20, borderRadius: '50%', background: '#ecfdf5', color: '#059669', marginBottom: 20 }}>
            <FileCheck2 size={48} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
            Your solar energy demand request has been submitted successfully.
          </h2>
          <p style={{ color: '#475569', fontSize: 15, maxWidth: 580, margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Your request (Demand Ref: <strong>REQ-2025-012</strong>) has been queued for technical assessment.
            The regional solar engineering desk will review your registered equipment, verify sizing estimates,
            and inspect supporting documentation.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate && onNavigate('requests')}
            >
              Track Progress Under My Requests
            </button>
            <button
              type="button"
              className="btn-export"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
            >
              Submit Another Request
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <FacilityHeader />

      {/* Progress Indicator */}
      <section className="portal-panel-card" style={{ marginTop: 20, padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              DEMAND SUBMISSION WIZARD
            </span>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-dark)', marginTop: 2 }}>
              Step {currentStep} of 7: {stepsList[currentStep - 1].title}
            </h2>
          </div>
          <button
            type="button"
            className="btn-export"
            onClick={handleSaveDraft}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Save size={14} />
            <span>Save as Draft</span>
          </button>
        </div>

        {draftSavedMessage && (
          <div style={{ padding: '8px 14px', background: '#ecfdf5', color: '#065f46', borderRadius: 8, fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
            ✓ Draft saved locally. You can resume this form anytime.
          </div>
        )}

        {/* 7-Step Horizontal Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
          {stepsList.map((step) => {
            const isDone = step.num < currentStep;
            const isCurrent = step.num === currentStep;
            return (
              <div
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  opacity: isCurrent ? 1 : isDone ? 0.9 : 0.45,
                  minWidth: 'fit-content',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: isCurrent
                      ? 'var(--brand-primary, #00a884)'
                      : isDone
                      ? '#065f46'
                      : '#e2e8f0',
                    color: isCurrent || isDone ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {isDone ? <Check size={14} /> : step.num}
                </div>
                <span style={{ fontSize: 12, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#0f172a' : '#64748b' }}>
                  {step.title}
                </span>
                {step.num < 7 && <ChevronRight size={14} color="#cbd5e1" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 1: FACILITY PROFILE & OPERATING SCHEDULE                             */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 1 OF 7</div>
          <h2 className="panel-main-title">Facility Information & Schedule</h2>
          <p className="panel-description">
            Identify the healthcare facility requesting solar energy support. Details are pre-filled from your registered facility profile.
          </p>

          <div className="form-section-header" style={{ margin: '20px 0 14px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Facility Profile
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Core administrative and geographic identification</span>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Facility Name (Auto-filled) *</label>
              <input
                className="form-input"
                type="text"
                value={facilityInfo.name}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Facility Level *</label>
              <select
                className="form-input"
                value={facilityInfo.level}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, level: e.target.value })}
              >
                {ethFacilityLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Region *</label>
              <select
                className="form-input"
                value={facilityInfo.region}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, region: e.target.value })}
              >
                {ethRegions.map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Zone *</label>
              <input
                className="form-input"
                type="text"
                value={facilityInfo.zone}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, zone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Woreda *</label>
              <input
                className="form-input"
                type="text"
                value={facilityInfo.woreda}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, woreda: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kebele *</label>
              <input
                className="form-input"
                type="text"
                value={facilityInfo.kebele}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, kebele: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Facility Head&apos;s Name *</label>
              <input
                className="form-input"
                type="text"
                value={facilityInfo.headName}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, headName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone Number *</label>
              <input
                className="form-input"
                type="text"
                value={facilityInfo.phone}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Facility Address *</label>
            <input
              className="form-input"
              type="text"
              value={facilityInfo.address}
              onChange={(e) => setFacilityInfo({ ...facilityInfo, address: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 24 }}>
            <label className="form-label">GPS Location (Coordinates)</label>
            <input
              className="form-input"
              type="text"
              value={facilityInfo.gpsLocation}
              onChange={(e) => setFacilityInfo({ ...facilityInfo, gpsLocation: e.target.value })}
            />
          </div>

          <div className="form-section-header" style={{ margin: '28px 0 14px 0', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Operating Schedule & Clinical Services
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Daily operating window and nocturnal service provision</span>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">What time does your facility usually open?</label>
              <input
                className="form-input"
                type="time"
                value={facilityInfo.openTime}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, openTime: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">What time does your facility usually close?</label>
              <input
                className="form-input"
                type="time"
                value={facilityInfo.closeTime}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, closeTime: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Does your facility provide services 24 hours a day?</label>
              <div style={{ display: 'flex', gap: 20, marginTop: 6 }}>
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13 }}>
                    <input
                      type="radio"
                      name="is24Hours"
                      checked={facilityInfo.is24Hours === opt}
                      onChange={() => setFacilityInfo({ ...facilityInfo, is24Hours: opt })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">How many days per week does your facility operate?</label>
              <input
                className="form-input"
                type="number"
                min="1"
                max="7"
                value={facilityInfo.operatingDaysPerWeek}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, operatingDaysPerWeek: e.target.value })}
              />
            </div>
          </div>

          {facilityInfo.is24Hours === 'Yes' && (
            <div className="form-group" style={{ marginBottom: 20, background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <label className="form-label" style={{ marginBottom: 10 }}>Which services operate at night? (Multi-select)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {[
                  'Emergency services',
                  'Maternity and delivery',
                  'Inpatient services',
                  'Laboratory',
                  'Vaccine storage',
                  'Operating Theatre',
                  'Other',
                ].map((srv) => {
                  const checked = facilityInfo.nightServices.includes(srv);
                  return (
                    <label key={srv} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...facilityInfo.nightServices, srv]
                            : facilityInfo.nightServices.filter((s) => s !== srv);
                          setFacilityInfo({ ...facilityInfo, nightServices: updated });
                        }}
                      />
                      <span>{srv}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Are emergency services available at night?</label>
              <select
                className="form-input"
                value={facilityInfo.hasNightEmergency}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, hasNightEmergency: e.target.value })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Are maternity and delivery services available at night?</label>
              <select
                className="form-input"
                value={facilityInfo.hasNightMaternity}
                onChange={(e) => setFacilityInfo({ ...facilityInfo, hasNightMaternity: e.target.value })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Are staff quarters connected to the facility&apos;s electrical system?</label>
            <select
              className="form-input"
              value={facilityInfo.isStaffQuartersConnected}
              onChange={(e) => setFacilityInfo({ ...facilityInfo, isStaffQuartersConnected: e.target.value })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep(2)}
            >
              <span>Next: Electricity Information</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: CURRENT ELECTRICITY SITUATION                                     */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 2 OF 7</div>
          <h2 className="panel-main-title">Current Electricity Situation</h2>
          <p className="panel-description">
            Understand the facility&apos;s existing electricity supply and the everyday problems it faces.
          </p>

          <div className="form-section-header" style={{ margin: '20px 0 14px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Primary & Backup Electricity Sources
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Existing energy supply infrastructure and reliability status</span>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Current Electricity Sources (Multi-select)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, marginTop: 8 }}>
              {[
                'National electricity grid',
                'Diesel generator',
                'Existing solar system',
                'Battery storage',
                'No electricity supply',
                'Other',
              ].map((src) => {
                const checked = electricitySituation.sources.includes(src);
                return (
                  <label key={src} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...electricitySituation.sources, src]
                          : electricitySituation.sources.filter((s) => s !== src);
                        setElectricitySituation({ ...electricitySituation, sources: next });
                      }}
                    />
                    <span>{src}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Supply Reliability Assessment</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                {[
                  'Very reliable',
                  'Sometimes interrupted',
                  'Frequently interrupted',
                  'Almost always unavailable',
                ].map((rel) => (
                  <label key={rel} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="reliability"
                      checked={electricitySituation.reliability === rel}
                      onChange={() => setElectricitySituation({ ...electricitySituation, reliability: rel })}
                    />
                    <span>{rel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Daily Available Supply Duration (Hours/Day)</label>
              <input
                className="form-input"
                type="number"
                min="0"
                max="24"
                value={electricitySituation.hoursAvailable}
                onChange={(e) => setElectricitySituation({ ...electricitySituation, hoursAvailable: e.target.value })}
              />
              <span style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                Average operating hours with stable electrical power per 24-hour cycle.
              </span>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">Existing Solar Installation on Site</label>
            <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
              {['Yes', 'No'].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="hasSolar"
                    checked={electricitySituation.hasSolar === opt}
                    onChange={() => setElectricitySituation({ ...electricitySituation, hasSolar: opt })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {electricitySituation.hasSolar === 'Yes' && (
            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', marginTop: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>
                Existing Solar System Specifications
              </div>
              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">What is the existing solar system capacity? (kWp)</label>
                  <input
                    className="form-input"
                    type="number"
                    value={electricitySituation.existingSolarCapacity}
                    onChange={(e) => setElectricitySituation({ ...electricitySituation, existingSolarCapacity: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">What is the battery storage capacity? (kWh)</label>
                  <input
                    className="form-input"
                    type="number"
                    value={electricitySituation.existingBatteryCapacity}
                    onChange={(e) => setElectricitySituation({ ...electricitySituation, existingBatteryCapacity: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">What type of battery do you use?</label>
                  <select
                    className="form-input"
                    value={electricitySituation.batteryType}
                    onChange={(e) => setElectricitySituation({ ...electricitySituation, batteryType: e.target.value })}
                  >
                    <option value="Lithium-ion">Lithium-ion</option>
                    <option value="Lead-acid">Lead-acid</option>
                    <option value="Other">Other</option>
                    <option value="I don't know">I don&apos;t know</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Is the existing solar system working properly?</label>
                  <select
                    className="form-input"
                    value={electricitySituation.isSolarWorking}
                    onChange={(e) => setElectricitySituation({ ...electricitySituation, isSolarWorking: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="Partially">Partially</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">What problems do you experience with the existing solar system?</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  value={electricitySituation.solarProblems}
                  onChange={(e) => setElectricitySituation({ ...electricitySituation, solarProblems: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="form-section-header" style={{ margin: '28px 0 14px 0', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Operational Constraints & Power Deficits
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Primary electricity challenges affecting patient care delivery</span>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Key Electrical Challenges (Multi-select)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10, marginTop: 8 }}>
              {[
                'Frequent power outages',
                'Insufficient electricity for medical equipment',
                'Lack of electricity at night',
                'High diesel fuel costs',
                'No electricity in some rooms',
                'Unreliable vaccine refrigeration',
                'Lack of backup power',
                'Other',
              ].map((ch) => {
                const checked = electricitySituation.challenges.includes(ch);
                return (
                  <label key={ch} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...electricitySituation.challenges, ch]
                          : electricitySituation.challenges.filter((c) => c !== ch);
                        setElectricitySituation({ ...electricitySituation, challenges: next });
                      }}
                    />
                    <span>{ch}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Power Deficit Narrative (Optional)</label>
            <textarea
              className="form-input form-textarea"
              rows={3}
              placeholder="e.g. Voltage fluctuations damage centrifuge boards, generator runs out of diesel..."
              value={electricitySituation.additionalProblems}
              onChange={(e) => setElectricitySituation({ ...electricitySituation, additionalProblems: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              type="button"
              className="btn-export"
              onClick={() => setCurrentStep(1)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep(3)}
            >
              <span>Next: Existing Equipment</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: REGISTER EXISTING EQUIPMENT                                       */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 3 OF 7 · MOST IMPORTANT</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="panel-main-title">Register Existing Equipment</h2>
              <p className="panel-description">
                Add each type of electrical equipment currently available in your facility. You do not need to calculate consumption—SOLCARE estimates it automatically.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={handleOpenAddEquip}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Plus size={16} />
              <span>Add Equipment</span>
            </button>
          </div>

          {/* Quick Metrics Bar from existing inventory */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, margin: '20px 0' }}>
            <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>REGISTERED UNITS</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{calculated.totalExistingCount}</div>
            </div>
            <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>ESTIMATED DAILY CONSUMPTION</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--brand-primary, #00a884)' }}>
                {calculated.dailyKWh} kWh/day
              </div>
            </div>
            <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>ESTIMATED PEAK LOAD</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#d97706' }}>
                {calculated.peakLoadKW} kW
              </div>
            </div>
          </div>

          {/* Equipment Inventory Summary Table (Matching Step 3.C) */}
          <div className="portal-table-container">
            <table className="portal-data-table">
              <thead>
                <tr>
                  <th>EQUIPMENT NAME</th>
                  <th>CATEGORY</th>
                  <th>QUANTITY</th>
                  <th>POWER RATING</th>
                  <th>DAILY USAGE</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {existingEquipment.map((eq) => (
                  <tr key={eq.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{eq.name}</div>
                      {eq.modelNumber && (
                        <div style={{ fontSize: 11, color: '#64748b' }}>Model: {eq.modelNumber}</div>
                      )}
                    </td>
                    <td>{eq.category}</td>
                    <td style={{ fontWeight: 600 }}>{eq.quantity}</td>
                    <td>{eq.watts} W</td>
                    <td>{eq.hoursPerDay} hrs ({eq.usageTime})</td>
                    <td>
                      <span className={`badge-status ${eq.priority === 'Critical' ? 'verified' : eq.priority === 'Essential' ? 'assessed' : 'open'}`}>
                        {eq.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${eq.isWorking === 'Yes' ? 'completed' : 'progress'}`}>
                        {eq.isWorking === 'Yes' ? 'Working' : 'Needs Repair'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          type="button"
                          className="table-action-btn"
                          title="Edit Equipment"
                          onClick={() => handleEditEquip(eq)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="table-action-btn"
                          title="Delete Equipment"
                          onClick={() => handleDeleteEquip(eq.id)}
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              type="button"
              className="btn-export"
              onClick={() => setCurrentStep(2)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep(4)}
            >
              <span>Next: Equipment Needed</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: REGISTER ADDITIONAL EQUIPMENT NEEDED                              */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 4 OF 7</div>
          <h2 className="panel-main-title">Register Additional Equipment Needed</h2>
          <p className="panel-description">
            Identify equipment that the facility needs but does not currently have, or equipment that needs replacement.
          </p>

          <div className="form-section-header" style={{ margin: '20px 0 14px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              New Equipment Procurement Needs
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Apparatus required for clinical service expansion or capacity enhancement</span>
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Additional Electrical Equipment Requirement</label>
            <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
              {['Yes', 'No'].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="hasAdditionalNeeded"
                    checked={hasAdditionalNeeded === opt}
                    onChange={() => setHasAdditionalNeeded(opt)}
                  />
                  <span>{opt === 'Yes' ? 'Facility requires additional equipment' : 'No additional equipment needed'}</span>
                </label>
              ))}
            </div>
          </div>

          {hasAdditionalNeeded === 'Yes' && (
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 14, border: '1px solid #e2e8f0', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>
                  Requested Additional Equipment List ({additionalEquipment.length})
                </span>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowNeededModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '6px 12px' }}
                >
                  <Plus size={14} />
                  <span>Request Item</span>
                </button>
              </div>

              <div className="portal-table-container">
                <table className="portal-data-table">
                  <thead>
                    <tr>
                      <th>EQUIPMENT NEEDED</th>
                      <th>QTY</th>
                      <th>EXPECTED POWER</th>
                      <th>REASON</th>
                      <th>ESSENTIAL FOR CARE?</th>
                      <th>TIMEFRAME</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalEquipment.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                          {item.explanation && (
                            <div style={{ fontSize: 11, color: '#64748b' }}>{item.explanation}</div>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{item.quantity}</td>
                        <td>{item.watts} W</td>
                        <td>{item.reason}</td>
                        <td>
                          <span className={`badge-status ${item.isEssential === 'Yes' ? 'verified' : 'open'}`}>
                            {item.isEssential}
                          </span>
                        </td>
                        <td>{item.timeframe}</td>
                        <td>
                          <button
                            type="button"
                            className="table-action-btn"
                            title="Remove item"
                            onClick={() => handleDeleteNeeded(item.id)}
                            style={{ color: '#ef4444' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="form-section-header" style={{ margin: '28px 0 14px 0', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Obsolete & Damaged Equipment Replacement
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Electrical assets requiring decommissioning or modern replacement</span>
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Equipment Replacement Requirement</label>
            <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
              {['Yes', 'No'].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="hasReplacementNeeded"
                    checked={hasReplacementNeeded === opt}
                    onChange={() => setHasReplacementNeeded(opt)}
                  />
                  <span>{opt === 'Yes' ? 'Facility has equipment needing replacement' : 'No replacement required'}</span>
                </label>
              ))}
            </div>
          </div>

          {hasReplacementNeeded === 'Yes' && (
            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0' }}>
              {replacementList.map((rep) => (
                <div key={rep.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{rep.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Condition: {rep.condition}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#475569' }}>Reason: {rep.reason}</div>
                  <div>
                    <span className="badge-status progress">Status: {rep.isWorking}</span>
                  </div>
                  <button
                    type="button"
                    className="table-action-btn"
                    onClick={() => setReplacementList((prev) => prev.filter((r) => r.id !== rep.id))}
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              type="button"
              className="btn-export"
              onClick={() => setCurrentStep(3)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep(5)}
            >
              <span>Next: Energy Requirements</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: ENERGY REQUIREMENTS AND RELIABILITY                               */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 5 OF 7</div>
          <h2 className="panel-main-title">Energy Requirements & Reliability</h2>
          <p className="panel-description">
            Understand how much electricity the facility needs and which equipment must receive priority power.
          </p>

          {/* Section A: Energy Demand Summary (Matching Step 5.A Card in prompt) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #093b3b 0%, #0d5c4e 100%)',
              color: '#ffffff',
              borderRadius: 16,
              padding: 24,
              margin: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 700, color: '#5eead4' }}>
              ESTIMATED ENERGY DEMAND
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>
              {calculated.dailyKWh} <span style={{ fontSize: 20, fontWeight: 600 }}>kWh/day</span>
            </div>
            <p style={{ fontSize: 12, color: '#ccfbf1', margin: 0, maxWidth: 600 }}>
              Calculated automatically from your registered equipment and daily hours. The energy assessment expert will verify these values before final solar system sizing.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, paddingTop: 14, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div>
                <div style={{ fontSize: 11, color: '#a7f3d0' }}>Existing Units</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{calculated.totalExistingCount}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#a7f3d0' }}>Peak Load</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{calculated.peakLoadKW} kW</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#a7f3d0' }}>Critical Load</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{calculated.criticalKWh} kWh/day</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#a7f3d0' }}>Suggested PV Size</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>~{calculated.suggestedKwp} kWp</div>
              </div>
            </div>
          </div>

          <div className="form-section-header" style={{ margin: '24px 0 14px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              System Autonomy & Backup Requirements
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Reserve duration, battery storage specifications, and generator readiness</span>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">How many days should the solar system operate without sunlight? (Autonomy)</label>
              <select
                className="form-input"
                value={reliabilityData.daysWithoutSunlight}
                onChange={(e) => setReliabilityData({ ...reliabilityData, daysWithoutSunlight: e.target.value })}
              >
                <option value="1 day">1 day</option>
                <option value="2 days">2 days (Recommended for Hospitals)</option>
                <option value="3 days">3 days</option>
                <option value="4 days">4 days</option>
                <option value="More than 4 days">More than 4 days</option>
                <option value="I don't know">I don&apos;t know</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Is battery storage required?</label>
              <select
                className="form-input"
                value={reliabilityData.isBatteryRequired}
                onChange={(e) => setReliabilityData({ ...reliabilityData, isBatteryRequired: e.target.value })}
              >
                <option value="Yes">Yes (Required for 24-hr operations)</option>
                <option value="No">No</option>
                <option value="I don't know">I don&apos;t know</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Does the facility need electricity during nighttime?</label>
              <select
                className="form-input"
                value={reliabilityData.needsNightElectricity}
                onChange={(e) => setReliabilityData({ ...reliabilityData, needsNightElectricity: e.target.value })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Is a backup generator available?</label>
              <select
                className="form-input"
                value={reliabilityData.isGeneratorAvailable}
                onChange={(e) => setReliabilityData({ ...reliabilityData, isGeneratorAvailable: e.target.value })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="form-section-header" style={{ margin: '28px 0 14px 0', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Automated Load Prioritization
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Clinical tier allocation derived from registered electrical loads</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <div style={{ padding: 16, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#166534', fontSize: 13, marginBottom: 8 }}>
                <Shield size={16} />
                <span>Critical Priority (Never Cut)</span>
              </div>
              <ul style={{ paddingLeft: 18, fontSize: 12, color: '#14532d', margin: 0 }}>
                <li>Vaccine Refrigerators & Blood Bank</li>
                <li>Oxygen Concentrators & Suction</li>
                <li>Emergency / Maternity Lighting</li>
              </ul>
            </div>

            <div style={{ padding: 16, background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#1e40af', fontSize: 13, marginBottom: 8 }}>
                <Zap size={16} />
                <span>Essential Priority</span>
              </div>
              <ul style={{ paddingLeft: 18, fontSize: 12, color: '#1e3a8a', margin: 0 }}>
                <li>Clinical Laboratory Analyzers & Microscope</li>
                <li>General Ward Lighting</li>
                <li>Clinical Laptops & Data Systems</li>
              </ul>
            </div>

            <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#475569', fontSize: 13, marginBottom: 8 }}>
                <Battery size={16} />
                <span>Non-essential (Shed When Low)</span>
              </div>
              <ul style={{ paddingLeft: 18, fontSize: 12, color: '#334155', margin: 0 }}>
                <li>Administrative Workstations & Printers</li>
                <li>Perimeter Outdoor Floodlights</li>
                <li>Comfort Ceiling Fans</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              type="button"
              className="btn-export"
              onClick={() => setCurrentStep(4)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep(6)}
            >
              <span>Next: Installation Site</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: INSTALLATION SITE & FUTURE REQUIREMENTS                           */}
      {/* ========================================================================= */}
      {currentStep === 6 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 6 OF 7</div>
          <h2 className="panel-main-title">Installation Site & Future Expansion</h2>
          <p className="panel-description">
            Collect information about where the solar system could be physically installed and whether your facility plans to grow.
          </p>

          <div className="form-section-header" style={{ margin: '20px 0 14px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Physical Site & Structural Conditions
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Mounting location, structural soundness, and solar exposure</span>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Where would you prefer the solar system to be installed?</label>
              <select
                className="form-input"
                value={installationData.preferredSite}
                onChange={(e) => setInstallationData({ ...installationData, preferredSite: e.target.value })}
              >
                <option value="Rooftop">Rooftop</option>
                <option value="Ground-mounted">Ground-mounted</option>
                <option value="Existing solar structure">Existing solar structure</option>
                <option value="Other">Other</option>
                <option value="I don't know">I don&apos;t know</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Is there enough space for solar panels?</label>
              <select
                className="form-input"
                value={installationData.spaceAvailable}
                onChange={(e) => setInstallationData({ ...installationData, spaceAvailable: e.target.value })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="I don't know">I don&apos;t know</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Is the roof in good condition?</label>
              <select
                className="form-input"
                value={installationData.roofCondition}
                onChange={(e) => setInstallationData({ ...installationData, roofCondition: e.target.value })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="I don't know">I don&apos;t know</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Is the installation area shaded by trees or buildings?</label>
              <select
                className="form-input"
                value={installationData.areaShaded}
                onChange={(e) => setInstallationData({ ...installationData, areaShaded: e.target.value })}
              >
                <option value="No">No (Full sunlight exposure)</option>
                <option value="Yes">Yes (Partial or heavy shading)</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Is there an existing solar installation structure?</label>
            <select
              className="form-input"
              value={installationData.hasExistingStructure}
              onChange={(e) => setInstallationData({ ...installationData, hasExistingStructure: e.target.value })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 24 }}>
            <label className="form-label">Upload a photo of the installation area (Roof / Ground)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: '#f8fafc', borderRadius: 10, border: '1px dashed #cbd5e1' }}>
              <UploadCloud size={24} color="#00a884" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                  {installationData.sitePhotoUploaded || 'Select JPG, PNG, or PDF file to upload'}
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>A wide-angle photo of the proposed rooftop or compound area.</div>
              </div>
              <button
                type="button"
                className="btn-export"
                onClick={() => setInstallationData({ ...installationData, sitePhotoUploaded: 'facility_rooftop_survey.jpg' })}
              >
                Browse Photo
              </button>
            </div>
          </div>

          <div className="form-section-header" style={{ margin: '28px 0 14px 0', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Five-Year Growth & Expansion Forecast
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Planned health service expansions and anticipated electrical demand scaling</span>
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Five-Year Facility Expansion Horizon</label>
            <div style={{ display: 'flex', gap: 24, marginTop: 6 }}>
              {['Yes', 'No'].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="hasExpansionPlan"
                    checked={installationData.hasExpansionPlan === opt}
                    onChange={() => setInstallationData({ ...installationData, hasExpansionPlan: opt })}
                  />
                  <span>{opt === 'Yes' ? 'Expansion planned within 5 years' : 'No expansion planned'}</span>
                </label>
              ))}
            </div>
          </div>

          {installationData.hasExpansionPlan === 'Yes' && (
            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}>
              <div className="form-group" style={{ marginBottom: 14 }}>
                <label className="form-label">What additional services are planned?</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  value={installationData.plannedServices}
                  onChange={(e) => setInstallationData({ ...installationData, plannedServices: e.target.value })}
                />
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">How much do you expect your energy demand to increase?</label>
                  <select
                    className="form-input"
                    value={installationData.expectedGrowth}
                    onChange={(e) => setInstallationData({ ...installationData, expectedGrowth: e.target.value })}
                  >
                    <option value="Less than 10%">Less than 10%</option>
                    <option value="10%–20%">10%–20%</option>
                    <option value="20%–30%">20%–30%</option>
                    <option value="More than 30%">More than 30%</option>
                    <option value="I don't know">I don&apos;t know</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">When is the expansion expected?</label>
                  <select
                    className="form-input"
                    value={installationData.expansionTimeframe}
                    onChange={(e) => setInstallationData({ ...installationData, expansionTimeframe: e.target.value })}
                  >
                    <option value="Within 6 months">Within 6 months</option>
                    <option value="1–2 years">1–2 years</option>
                    <option value="3–5 years">3–5 years</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">What additional equipment may be added?</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  value={installationData.futureEquipment}
                  onChange={(e) => setInstallationData({ ...installationData, futureEquipment: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="form-section-header" style={{ margin: '28px 0 14px 0', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Special Engineering Considerations
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>Supplementary operational context for the solar engineering evaluation team</span>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Engineering Notes (Optional)</label>
            <textarea
              className="form-input form-textarea"
              rows={3}
              value={installationData.additionalNotes}
              onChange={(e) => setInstallationData({ ...installationData, additionalNotes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              type="button"
              className="btn-export"
              onClick={() => setCurrentStep(5)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCurrentStep(7)}
            >
              <span>Next: Review Request</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 7: REVIEW AND SUBMIT DEMAND                                          */}
      {/* ========================================================================= */}
      {currentStep === 7 && (
        <section className="portal-panel-card" style={{ marginTop: 20 }}>
          <div className="panel-sub-label">STEP 7 OF 7 · FINAL VERIFICATION</div>
          <h2 className="panel-main-title">Demand Request Summary</h2>
          <p className="panel-description">
            Ready for Review. Inspect the collected details before official submission. You can return to any step to revise.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 20 }}>
            {/* Review Block 1: Facility Info */}
            <div style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Facility Profile & Operating Schedule</span>
                <button type="button" className="table-action-btn" onClick={() => setCurrentStep(1)}>
                  <Edit2 size={14} />
                </button>
              </div>
              <div style={{ fontSize: 13, color: '#334155' }}>
                <strong>{facilityInfo.name}</strong> · {facilityInfo.level} · {facilityInfo.region}, {facilityInfo.zone}, {facilityInfo.woreda}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                Contact: {facilityInfo.headName} ({facilityInfo.phone}) · 24-hr services: {facilityInfo.is24Hours} ({facilityInfo.nightServices.join(', ')})
              </div>
            </div>

            {/* Review Block 2: Existing Equipment */}
            <div style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Registered Existing Equipment ({existingEquipment.length} types registered)</span>
                <button type="button" className="table-action-btn" onClick={() => setCurrentStep(3)}>
                  <Edit2 size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {existingEquipment.map((eq) => (
                  <span key={eq.id} className="badge-status open" style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}>
                    {eq.quantity}x {eq.name} ({eq.watts}W)
                  </span>
                ))}
              </div>
            </div>

            {/* Review Block 3: Additional Equipment */}
            <div style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Additional & Replacement Equipment Requested</span>
                <button type="button" className="table-action-btn" onClick={() => setCurrentStep(4)}>
                  <Edit2 size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {additionalEquipment.map((ad) => (
                  <span key={ad.id} className="badge-status verified" style={{ background: '#ecfdf5' }}>
                    +{ad.quantity}x {ad.name} ({ad.watts}W)
                  </span>
                ))}
              </div>
            </div>

            {/* Review Block 4: Estimated Energy Demand */}
            <div style={{ padding: 20, background: '#f0fdf4', borderRadius: 14, border: '1px solid #86efac' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: '#166534' }}>
                  Automated Energy Demand Sizing
                </span>
                <button type="button" className="table-action-btn" onClick={() => setCurrentStep(5)}>
                  <Edit2 size={14} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#15803d' }}>Total Daily Consumption</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#14532d' }}>{calculated.dailyKWh} kWh/day</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#15803d' }}>Estimated Peak Load</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#14532d' }}>{calculated.peakLoadKW} kW</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#15803d' }}>Critical Energy Demand</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#14532d' }}>{calculated.criticalKWh} kWh/day</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#15803d' }}>Suggested PV Size</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#14532d' }}>~{calculated.suggestedKwp} kWp</div>
                </div>
              </div>
            </div>

            {/* Review Block 5: Installation & Expansion */}
            <div style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Site Readiness & Expansion Horizon</span>
                <button type="button" className="table-action-btn" onClick={() => setCurrentStep(6)}>
                  <Edit2 size={14} />
                </button>
              </div>
              <div style={{ fontSize: 13, color: '#334155' }}>
                Preferred site: <strong>{installationData.preferredSite}</strong> (Adequate space: {installationData.spaceAvailable}, Roof sound: {installationData.roofCondition})
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                5-year expansion: {installationData.hasExpansionPlan} · Expected demand increase: {installationData.expectedGrowth}
              </div>
            </div>
          </div>

          {/* Section B: Confirmation Checkbox */}
          <div style={{ margin: '28px 0 20px 0', padding: 18, background: '#fffbeb', borderRadius: 12, border: '1px solid #fef3c7' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#92400e' }}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--brand-primary, #00a884)' }}
              />
              <span>I confirm that the information provided is correct to the best of my knowledge.</span>
            </label>
          </div>

          {/* Section C: Final Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <button
              type="button"
              className="btn-export"
              onClick={() => setCurrentStep(6)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                className="btn-export"
                onClick={handleSaveDraft}
              >
                <Save size={14} />
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleSubmitFinal}
                disabled={!isConfirmed}
                style={{ opacity: isConfirmed ? 1 : 0.6 }}
              >
                <CheckCircle2 size={16} />
                <span>Submit Demand Request</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REGISTER / EDIT EXISTING EQUIPMENT                                 */}
      {/* ========================================================================= */}
      {showEquipModal && (
        <div className="portal-modal-overlay" onClick={() => setShowEquipModal(false)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 620 }}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)' }}>
                  EQUIPMENT INTAKE
                </span>
                <h3 style={{ margin: '2px 0 0 0' }}>
                  {editingEquipId ? 'Edit Equipment' : 'Add Existing Equipment'}
                </h3>
              </div>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Equipment Category *</label>
                  <select
                    className="form-input"
                    value={equipForm.category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      const matched = equipmentCatalog.find((item) => item.category === newCat);
                      setEquipForm({
                        ...equipForm,
                        category: newCat,
                        name: matched ? matched.name : '',
                        watts: matched ? matched.defaultWatts : 100,
                        priority: matched ? matched.priority : 'Essential',
                      });
                    }}
                  >
                    {equipmentCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Equipment Name *</label>
                  <input
                    className="form-input"
                    type="text"
                    value={equipForm.name}
                    onChange={(e) => setEquipForm({ ...equipForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Total Units Available *</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    value={equipForm.quantity}
                    onChange={(e) => setEquipForm({ ...equipForm, quantity: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rated Power per Unit (Watts) *</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      className="form-input"
                      type="number"
                      disabled={equipForm.wattsUnknown}
                      value={equipForm.wattsUnknown ? '' : equipForm.watts}
                      placeholder={equipForm.wattsUnknown ? "Catalog estimate (100W)" : "Watts (W)"}
                      onChange={(e) => setEquipForm({ ...equipForm, watts: e.target.value })}
                    />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', marginTop: 4, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={equipForm.wattsUnknown}
                      onChange={(e) => setEquipForm({ ...equipForm, wattsUnknown: e.target.checked })}
                    />
                    <span>Unspecified wattage (Apply standard catalog estimate)</span>
                  </label>
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Average Daily Operating Hours *</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    max="24"
                    value={equipForm.hoursPerDay}
                    onChange={(e) => setEquipForm({ ...equipForm, hoursPerDay: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Operational Condition *</label>
                  <select
                    className="form-input"
                    value={equipForm.isWorking}
                    onChange={(e) => setEquipForm({ ...equipForm, isWorking: e.target.value })}
                  >
                    <option value="Yes">Operational (Working)</option>
                    <option value="Partially">Partially Functional</option>
                    <option value="No">Non-functional (Needs Repair)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Critical for Direct Patient Care? *</label>
                  <select
                    className="form-input"
                    value={equipForm.isCareImportant}
                    onChange={(e) => setEquipForm({ ...equipForm, isCareImportant: e.target.value })}
                  >
                    <option value="Yes">Yes (Direct clinical impact)</option>
                    <option value="No">No (Auxiliary / Administrative)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Usage Period *</label>
                  <select
                    className="form-input"
                    value={equipForm.usageTime}
                    onChange={(e) => setEquipForm({ ...equipForm, usageTime: e.target.value })}
                  >
                    <option value="Day and Night">Continuous (Day and Night)</option>
                    <option value="Day only">Daytime Only (08:00 - 18:00)</option>
                    <option value="Night only">Nighttime Only (18:00 - 08:00)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Equipment Model / Serial (Optional)</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="e.g. TCW-40"
                    value={equipForm.modelNumber}
                    onChange={(e) => setEquipForm({ ...equipForm, modelNumber: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Load Priority Tier</label>
                  <select
                    className="form-input"
                    value={equipForm.priority}
                    onChange={(e) => setEquipForm({ ...equipForm, priority: e.target.value })}
                  >
                    <option value="Critical">Critical (ICU / Cold Chain / Maternity)</option>
                    <option value="Essential">Essential (Lab / General lighting)</option>
                    <option value="Non-essential">Non-essential (Admin / Fans)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Equipment Nameplate / Rating Label Photo (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: '#f8fafc', borderRadius: 8, border: '1px dashed #cbd5e1' }}>
                  <UploadCloud size={20} color="#00a884" />
                  <span style={{ fontSize: 12, color: '#64748b', flex: 1 }}>
                    {equipForm.photoName || 'JPG, PNG, or PDF'}
                  </span>
                  <button
                    type="button"
                    className="btn-export"
                    style={{ padding: '4px 10px', fontSize: 11 }}
                    onClick={() => setEquipForm({ ...equipForm, photoName: `${equipForm.name.toLowerCase().replace(/\s+/g, '_')}_label.jpg` })}
                  >
                    Attach Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-export" onClick={() => setShowEquipModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleSaveEquip}>
                Save Equipment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REQUEST ADDITIONAL NEEDED EQUIPMENT                                 */}
      {/* ========================================================================= */}
      {showNeededModal && (
        <div className="portal-modal-overlay" onClick={() => setShowNeededModal(false)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)' }}>
                  ADDITIONAL DEMAND
                </span>
                <h3 style={{ margin: '2px 0 0 0' }}>Request Additional Equipment</h3>
              </div>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">What equipment do you need? *</label>
                <select
                  className="form-input"
                  value={neededForm.name}
                  onChange={(e) => {
                    const match = equipmentCatalog.find((x) => x.name === e.target.value);
                    setNeededForm({
                      ...neededForm,
                      name: e.target.value,
                      watts: match ? match.defaultWatts : 200,
                    });
                  }}
                >
                  <option value="">Select equipment from catalog...</option>
                  {equipmentCatalog.map((catItem) => (
                    <option key={catItem.name} value={catItem.name}>
                      {catItem.name} ({catItem.category} ~{catItem.defaultWatts}W)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">How many units do you need? *</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    value={neededForm.quantity}
                    onChange={(e) => setNeededForm({ ...neededForm, quantity: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Expected power rating (Watts)</label>
                  <input
                    className="form-input"
                    type="number"
                    disabled={neededForm.wattsUnknown}
                    value={neededForm.wattsUnknown ? '' : neededForm.watts}
                    placeholder={neededForm.wattsUnknown ? "I don't know" : "Watts"}
                    onChange={(e) => setNeededForm({ ...neededForm, watts: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Why do you need this equipment?</label>
                  <select
                    className="form-input"
                    value={neededForm.reason}
                    onChange={(e) => setNeededForm({ ...neededForm, reason: e.target.value })}
                  >
                    <option value="New medical service">New medical service</option>
                    <option value="Existing equipment is insufficient">Existing equipment is insufficient</option>
                    <option value="Existing equipment is damaged">Existing equipment is damaged</option>
                    <option value="Existing equipment needs replacement">Existing equipment needs replacement</option>
                    <option value="Facility expansion">Facility expansion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">When do you need this equipment?</label>
                  <select
                    className="form-input"
                    value={neededForm.timeframe}
                    onChange={(e) => setNeededForm({ ...neededForm, timeframe: e.target.value })}
                  >
                    <option value="Immediate (Within 1-3 months)">Immediate (Within 1-3 months)</option>
                    <option value="Medium-term (3-6 months)">Medium-term (3-6 months)</option>
                    <option value="Future project (>6 months)">Future project (&gt;6 months)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional explanation</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  placeholder="Clinical justification, departmental location..."
                  value={neededForm.explanation}
                  onChange={(e) => setNeededForm({ ...neededForm, explanation: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-export" onClick={() => setShowNeededModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleSaveNeeded}>
                Add to Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

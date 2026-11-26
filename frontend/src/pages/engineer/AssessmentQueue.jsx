import { useState } from 'react';
import { Clock, PlayCircle, AlertTriangle, X, FileText, MapPin, User, Zap, CheckCircle, ChevronRight, ChevronLeft, Loader } from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';

const queueItems = [
  {
    id: 'ASQ-001',
    priority: 'Critical',
    priorityColor: '#ef4444',
    priorityBg: '#fee2e2',
    kw: '35 kWp',
    title: 'ICU backup solar package',
    facility: 'Hawassa General Hospital',
    contact: 'Dr. Alem Tesfaye',
    status: 'Assessment due today',
    statusColor: '#d97706',
    region: 'Sidama Region',
  },
  {
    id: 'ASQ-002',
    priority: 'High',
    priorityColor: '#f59e0b',
    priorityBg: '#fef3c7',
    kw: '60 kWp',
    title: 'Operating theatre power stabilization',
    facility: 'Gondar University Hospital',
    contact: 'Facilities Desk',
    status: 'Site documents ready',
    statusColor: '#059669',
    region: 'Amhara Region',
  },
  {
    id: 'ASQ-003',
    priority: 'Medium',
    priorityColor: '#2563eb',
    priorityBg: '#eff6ff',
    kw: '15 kWp',
    title: 'Laboratory refrigeration continuity',
    facility: 'Jimma Health Center',
    contact: 'Nurse Coordinator Hana',
    status: 'Clarification received',
    statusColor: '#2563eb',
    region: 'Oromia Region',
  },
  {
    id: 'ASQ-004',
    priority: 'High',
    priorityColor: '#f59e0b',
    priorityBg: '#fef3c7',
    kw: '33 kWp',
    title: 'Emergency ward night-load assessment',
    facility: 'Adama Regional Clinic',
    contact: 'Procurement Unit',
    status: 'Needs assessment start',
    statusColor: '#94a3b8',
    region: 'Oromia Region',
  },
];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: i < step ? '#00a884' : i === step ? 'linear-gradient(135deg,#00a884,#008f70)' : '#e2e8f0',
              color: i <= step ? 'white' : '#94a3b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800,
              boxShadow: i === step ? '0 2px 8px rgba(0,168,132,0.4)' : 'none',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}
          >
            {i < step ? <CheckCircle size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div style={{ width: 36, height: 2, borderRadius: 2, background: i < step ? '#00a884' : '#e2e8f0', transition: 'background 0.3s' }} />
          )}
        </div>
      ))}
      <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, color: '#64748b' }}>
        Step {step + 1} of {total}
      </span>
    </div>
  );
}

const STEP_TITLES = ['Site Review', 'Technical Sizing', 'Decision & Submit'];

// ─── Assessment Wizard Modal ───────────────────────────────────────────────────
function AssessmentWizard({ item, onClose, onComplete }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [siteNotes, setSiteNotes] = useState('');
  const [accessConfirmed, setAccessConfirmed] = useState(false);
  const [docsReviewed, setDocsReviewed] = useState(false);

  const [recommendedKwp, setRecommendedKwp] = useState('');
  const [batteryKwh, setBatteryKwh] = useState('');
  const [severity, setSeverity] = useState('High');
  const [urgency, setUrgency] = useState('Within 2 weeks');

  const [findings, setFindings] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [decision, setDecision] = useState('Approved');

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      onComplete(item.id, {
        severity,
        urgency,
        findings,
        recommendations,
        decision,
        recommendedKwp: parseFloat(recommendedKwp) || 0,
        batteryKwh: parseFloat(batteryKwh) || 0,
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 1600);
  };

  if (!item) return null;

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div
        className="portal-modal-box"
        style={{ maxWidth: 660, width: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: item.priorityBg, color: item.priorityColor }}>
                {item.priority}
              </span>
              <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{item.id}</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>·</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{item.kw}</span>
            </div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{item.title}</h3>
          </div>
          <button type="button" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {submitted ? (
            /* ── Success screen ── */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 16px', textAlign: 'center', gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={34} color="#00a884" />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0c1726', marginBottom: 6 }}>Assessment Submitted</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {item.facility} · {item.title}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 400, marginTop: 8 }}>
                {[
                  { label: 'Decision', val: decision },
                  { label: 'Recommended kWp', val: recommendedKwp ? `${recommendedKwp} kWp` : item.kw },
                  { label: 'Severity', val: severity },
                  { label: 'Urgency', val: urgency },
                ].map(r => (
                  <div key={r.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', textAlign: 'left' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: 3 }}>{r.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: decision === 'Approved' && r.label === 'Decision' ? '#059669' : decision === 'Rejected' && r.label === 'Decision' ? '#ef4444' : '#0c1726' }}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <StepIndicator step={step} total={3} />

              {/* Step title */}
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0c1726', marginBottom: 16 }}>
                {STEP_TITLES[step]}
              </div>

              {/* ── STEP 0: Site Review ── */}
              {step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Info row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { icon: <MapPin size={13} />, label: 'Facility', val: item.facility },
                      { icon: <User size={13} />, label: 'Contact', val: item.contact },
                      { icon: <MapPin size={13} />, label: 'Region', val: item.region },
                      { icon: <Zap size={13} />, label: 'Requested kWp', val: item.kw },
                    ].map(r => (
                      <div key={r.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', marginBottom: 3 }}>
                          {r.icon}
                          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Checklist */}
                  <div style={{ background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 10 }}>Site Confirmation</div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#334155', marginBottom: 10, cursor: 'pointer' }}>
                      <input type="checkbox" checked={accessConfirmed} onChange={e => setAccessConfirmed(e.target.checked)}
                        style={{ width: 16, height: 16, accentColor: '#00a884', cursor: 'pointer' }} />
                      Site access confirmed and visit scheduled
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                      <input type="checkbox" checked={docsReviewed} onChange={e => setDocsReviewed(e.target.checked)}
                        style={{ width: 16, height: 16, accentColor: '#00a884', cursor: 'pointer' }} />
                      Technical documents and demand profile reviewed
                    </label>
                  </div>

                  {/* Field notes */}
                  <div className="form-group">
                    <label className="form-label">Field Notes</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Describe site observations, access conditions, any initial concerns..."
                      value={siteNotes}
                      onChange={e => setSiteNotes(e.target.value)}
                      style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 1: Technical Sizing ── */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#065f46', fontWeight: 500 }}>
                    <strong>Requested capacity:</strong> {item.kw} — Adjust based on your site assessment findings.
                  </div>

                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label className="form-label">Recommended kWp</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder={`e.g. ${parseFloat(item.kw) || 30}`}
                        value={recommendedKwp}
                        onChange={e => setRecommendedKwp(e.target.value)}
                        min={0}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Battery kWh</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="e.g. 48"
                        value={batteryKwh}
                        onChange={e => setBatteryKwh(e.target.value)}
                        min={0}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label className="form-label">Severity Assessment</label>
                      <select className="form-input" value={severity} onChange={e => setSeverity(e.target.value)}>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Urgency Timeline</label>
                      <select className="form-input" value={urgency} onChange={e => setUrgency(e.target.value)}>
                        <option>Immediate (within 48h)</option>
                        <option>Within 1 week</option>
                        <option>Within 2 weeks</option>
                        <option>Within 1 month</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Decision & Submit ── */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Technical Findings</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Summarise what you found on-site and in the technical documents..."
                      value={findings}
                      onChange={e => setFindings(e.target.value)}
                      style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Recommendations</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="What system configuration, installation notes, or actions do you recommend?"
                      value={recommendations}
                      onChange={e => setRecommendations(e.target.value)}
                      style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Assessment Decision</label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {['Approved', 'Returned for Revision', 'Rejected'].map(d => (
                        <label
                          key={d}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 16px', borderRadius: 10, cursor: 'pointer',
                            border: `2px solid ${decision === d ? '#00a884' : '#e2e8f0'}`,
                            background: decision === d ? '#f0fdf4' : '#f8fafc',
                            fontSize: 13, fontWeight: 600,
                            color: decision === d ? '#065f46' : '#475569',
                            transition: 'all 0.15s',
                          }}
                        >
                          <input
                            type="radio"
                            name="decision"
                            value={d}
                            checked={decision === d}
                            onChange={() => setDecision(d)}
                            style={{ accentColor: '#00a884' }}
                          />
                          {d}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Summary card */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: 10 }}>Assessment Summary</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12 }}>
                      <div><span style={{ color: '#94a3b8' }}>Facility: </span><strong>{item.facility}</strong></div>
                      <div><span style={{ color: '#94a3b8' }}>kWp: </span><strong>{recommendedKwp || item.kw}</strong></div>
                      <div><span style={{ color: '#94a3b8' }}>Severity: </span><strong>{severity}</strong></div>
                      <div><span style={{ color: '#94a3b8' }}>Urgency: </span><strong>{urgency}</strong></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="modal-footer">
          {submitted ? (
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#00a884,#008f70)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              Close & View Completed
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={step === 0 ? onClose : () => setStep(s => s - 1)}
                style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {step === 0 ? 'Cancel' : <><ChevronLeft size={14} /> Back</>}
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s + 1)}
                  style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#00a884,#008f70)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 10px rgba(0,168,132,0.4)' }}
                >
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: submitting ? '#94a3b8' : 'linear-gradient(135deg,#00a884,#008f70)', color: 'white', fontSize: 13, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: submitting ? 'none' : '0 3px 10px rgba(0,168,132,0.4)' }}
                >
                  {submitting ? <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Submitting…</> : <><CheckCircle size={14} /> Submit Assessment</>}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

function AssessmentDetailModal({ item, onClose, onStartAssessment }) {
  if (!item) return null;
  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div
        className="portal-modal-box"
        style={{ maxWidth: 620 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: item.priorityBg, color: item.priorityColor }}>
                {item.priority}
              </span>
              <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{item.id}</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>·</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{item.kw}</span>
            </div>
            <h3 style={{ margin: 0 }}>{item.title}</h3>
          </div>
          <button type="button" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { icon: <MapPin size={14} />, label: 'Facility', val: item.facility },
              { icon: <User size={14} />, label: 'Contact', val: item.contact },
              { icon: <MapPin size={14} />, label: 'Region', val: item.region },
              { icon: <Zap size={14} />, label: 'Capacity', val: item.kw },
            ].map(r => (
              <div key={r.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', marginBottom: 4 }}>
                  {r.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={14} style={{ color: '#059669' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#065f46' }}>Current Status</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: item.statusColor }}>{item.status}</span>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 10 }}>Pre-assessment checklist</div>
            {[
              { label: 'Facility demand profile received', done: true },
              { label: 'Site access confirmed', done: item.priority !== 'Medium' },
              { label: 'Technical documents reviewed', done: item.status.includes('ready') || item.status.includes('received') },
              { label: 'Sizing calculation complete', done: false },
              { label: 'Assessment report submitted', done: false },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: c.done ? '#334155' : '#94a3b8' }}>
                <span style={{ width: 18, height: 18, borderRadius: 5, background: c.done ? '#00a884' : '#e2e8f0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, fontWeight: 800 }}>
                  {c.done ? '✓' : ''}
                </span>
                {c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Close
          </button>
          <button
            type="button"
            onClick={onStartAssessment}
            style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 10px rgba(0,168,132,0.4)' }}
          >
            <PlayCircle size={15} />
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentQueue() {
  const { completeAssessment, demands } = useSolcare();
  const [selectedItem, setSelectedItem] = useState(null);
  const [wizardItem, setWizardItem] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);

  const handleComplete = (itemId, assessmentData) => {
    // Try to match against context demands by facility name
    const matched = demands && demands.find(d => d.facility === (wizardItem && wizardItem.facility));
    if (matched && completeAssessment) {
      completeAssessment(matched.id, assessmentData);
    }
    setCompletedIds(prev => [...prev, itemId]);
  };

  const activeItems = queueItems.filter(i => !completedIds.includes(i.id));

  return (
    <>
      {/* Header */}
      <header className="portal-topbar">
        <div className="topbar-left">
          <div className="breadcrumb">AWAITING TECHNICAL REVIEW</div>
          <h1 className="portal-title">Assessment Queue</h1>
          <p className="portal-subtitle">
            Prioritised hospital demands ready for a technical professional to begin assessment.
          </p>
        </div>
        <div className="topbar-right">
          <div className="header-badge-pill dark">
            <Clock size={12} style={{ color: '#00a884' }} />
            <span>TODAY • Jan 18 · {activeItems.length} open decisions</span>
          </div>
        </div>
      </header>

      {/* Queue Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}
      >
        {activeItems.map(item => (
          <div
            key={item.id}
            className="portal-panel-card"
            style={{ gap: 0, cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(15,23,42,0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.transform = '';
            }}
          >
            {/* Priority row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: item.priorityBg, color: item.priorityColor }}>
                {item.priority}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '3px 10px' }}>
                {item.kw}
              </span>
            </div>

            {/* Title */}
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0c1726', marginBottom: 6, lineHeight: 1.25 }}>
              {item.title}
            </div>

            {/* Facility & contact */}
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={12} style={{ flexShrink: 0 }} />
              {item.facility}
              <span style={{ color: '#cbd5e1' }}>·</span>
              {item.contact}
            </div>

            {/* Footer row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f1f5f9', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: item.statusColor, display: 'flex', alignItems: 'center', gap: 5 }}>
                {item.status.includes('today') && <AlertTriangle size={13} />}
                {item.status}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,168,132,0.35)', transition: 'opacity 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <PlayCircle size={14} />
                Start Assessment
              </button>
            </div>
          </div>
        ))}

        {activeItems.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 24px', color: '#94a3b8' }}>
            <CheckCircle size={40} style={{ marginBottom: 12, color: '#00a884' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: '#475569' }}>All assessments completed!</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Check the Completed Assessments tab to review results.</div>
          </div>
        )}
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 860px) {
          .queue-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Detail modal (pre-flight) */}
      {selectedItem && !wizardItem && (
        <AssessmentDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onStartAssessment={() => { setWizardItem(selectedItem); setSelectedItem(null); }}
        />
      )}

      {/* Full 3-step assessment wizard */}
      {wizardItem && (
        <AssessmentWizard
          item={wizardItem}
          onClose={() => setWizardItem(null)}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}


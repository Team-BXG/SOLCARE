import { useState } from 'react';
import { Clock, PlayCircle, AlertTriangle, ChevronRight, X, FileText, MapPin, User, Zap } from 'lucide-react';

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

function AssessmentDetailModal({ item, onClose }) {
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
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: item.priorityBg,
                  color: item.priorityColor,
                }}
              >
                {item.priority}
              </span>
              <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{item.id}</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>·</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{item.kw}</span>
            </div>
            <h3 style={{ margin: 0 }}>{item.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#f1f5f9', color: '#64748b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Info rows */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { icon: <MapPin size={14} />, label: 'Facility', val: item.facility },
              { icon: <User size={14} />, label: 'Contact', val: item.contact },
              { icon: <MapPin size={14} />, label: 'Region', val: item.region },
              { icon: <Zap size={14} />, label: 'Capacity', val: item.kw },
            ].map(r => (
              <div
                key={r.label}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', marginBottom: 4 }}>
                  {r.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 10,
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={14} style={{ color: '#059669' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#065f46' }}>Current Status</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: item.statusColor }}>{item.status}</span>
          </div>

          {/* Pre-assessment checklist */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 10 }}>
              Pre-assessment checklist
            </div>
            {[
              { label: 'Facility demand profile received', done: true },
              { label: 'Site access confirmed', done: item.priority !== 'Medium' },
              { label: 'Technical documents reviewed', done: item.status.includes('ready') || item.status.includes('received') },
              { label: 'Sizing calculation complete', done: false },
              { label: 'Assessment report submitted', done: false },
            ].map(c => (
              <div
                key={c.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: '1px solid #f1f5f9',
                  fontSize: 13,
                  color: c.done ? '#334155' : '#94a3b8',
                }}
              >
                <span
                  style={{
                    width: 18, height: 18, borderRadius: 5,
                    background: c.done ? '#00a884' : '#e2e8f0',
                    color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 10, fontWeight: 800,
                  }}
                >
                  {c.done ? '✓' : ''}
                </span>
                {c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0',
              background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => alert(`Starting assessment for ${item.facility}...`)}
            style={{
              padding: '9px 20px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: '0 3px 10px rgba(0,168,132,0.4)',
            }}
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
  const [selectedItem, setSelectedItem] = useState(null);

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
            <span>TODAY • Jan 18 · 7 open decisions</span>
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
        {queueItems.map(item => (
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: item.priorityBg,
                  color: item.priorityColor,
                }}
              >
                {item.priority}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#64748b',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 20,
                  padding: '3px 10px',
                }}
              >
                {item.kw}
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: '#0c1726',
                marginBottom: 6,
                lineHeight: 1.25,
              }}
            >
              {item.title}
            </div>

            {/* Facility & contact */}
            <div
              style={{
                fontSize: 12,
                color: '#64748b',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <MapPin size={12} style={{ flexShrink: 0 }} />
              {item.facility}
              <span style={{ color: '#cbd5e1' }}>·</span>
              {item.contact}
            </div>

            {/* Footer row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 16,
                borderTop: '1px solid #f1f5f9',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: item.statusColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {item.status.includes('today') && <AlertTriangle size={13} />}
                {item.status}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,168,132,0.35)',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <PlayCircle size={14} />
                Start Assessment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 860px) {
          .queue-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Detail modal */}
      {selectedItem && (
        <AssessmentDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}


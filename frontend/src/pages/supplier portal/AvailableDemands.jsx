import { useState } from 'react';
import { MapPin, Zap, Package, CheckCircle2, X, ChevronRight, PanelLeft } from 'lucide-react';

const availableDemands = [
  {
    id: 'REQ-2025-008',
    age: '12 days ago',
    ageLabel: 'Open',
    title: 'Gondar University Hospital Solar Resilience Upgrade',
    category: '500 kWp Hybrid-Solar System',
    location: 'Gondar City, Amhara',
    demandSize: '14 panels · 60 batteries',
    description:
      'Full rooftop PV array with battery backup to maintain ICU, theatre, and cold-chain continuity during grid outages. Detailed BOQ attached.',
    tags: ['ICU', 'Battery', 'Cold Chain'],
    urgency: 'High',
  },
  {
    id: 'REQ-2025-014',
    age: '4 days ago',
    ageLabel: 'Open',
    title: 'Bahir Dar Regional Blood Bank Backup Power',
    category: '20 kWp Critical Storage Package',
    location: 'Bahir Dar, Amhara',
    demandSize: '7 panels · cold-chain priority',
    description:
      'Emergency backup solar system scoped specifically for blood bank refrigeration. Cold-chain compliance documentation required from supplier.',
    tags: ['Cold Chain', 'Emergency', 'Refrigeration'],
    urgency: 'Critical',
  },
];

function AcceptConfirmModal({ demand, onConfirm, onClose }) {
  if (!demand) return null;
  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div
        className="portal-modal-box"
        style={{ maxWidth: 520 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#00a884', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>
              Confirm Job Acceptance
            </div>
            <h3 style={{ margin: 0, fontSize: 17 }}>{demand.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, background: '#f1f5f9',
              color: '#64748b', display: 'flex', alignItems: 'center',
              justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Key details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: <Package size={13} />, label: 'Category', val: demand.category },
              { icon: <MapPin size={13} />, label: 'Location', val: demand.location },
              { icon: <Zap size={13} />, label: 'Demand Size', val: demand.demandSize },
              { icon: <CheckCircle2 size={13} />, label: 'Urgency', val: demand.urgency },
            ].map(r => (
              <div
                key={r.label}
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', marginBottom: 4 }}>
                  {r.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: 10, padding: '14px 16px',
            fontSize: 13, color: '#475569', lineHeight: 1.6,
          }}>
            {demand.description}
          </div>

          {/* Commitment notice */}
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: 10, padding: '12px 16px',
            fontSize: 12, color: '#1e40af', lineHeight: 1.5,
            display: 'flex', gap: 10,
          }}>
            <span style={{ fontSize: 16 }}>ℹ️</span>
            <span>Accepting this job commits <strong>EthioSolar Solutions PLC</strong> to fulfil the stated scope. Your acceptance is logged and visible to the administration team.</span>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0',
              background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(demand); onClose(); }}
            style={{
              padding: '9px 22px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: '0 3px 10px rgba(0,168,132,0.4)',
            }}
          >
            <CheckCircle2 size={15} />
            Accept Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AvailableDemands({ acceptedJobIds = [], onAccept }) {
  const [selectedDemand, setSelectedDemand] = useState(null);

  const handleAccept = (demand) => {
    if (onAccept) onAccept(demand);
  };

  const open = availableDemands.filter(d => !acceptedJobIds.includes(d.id));

  return (
    <>
      {/* Header */}
      <header className="portal-topbar" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div className="topbar-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00a884', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
            <PanelLeft size={14} />
            <span>DIRECT SUPPLIER WORKSPACE</span>
          </div>
          <h1 className="portal-title">Available Demands</h1>
          <p className="portal-subtitle">Claim work with the clearest fit.</p>
        </div>
        <div className="topbar-right">
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#e6f7f3', color: '#00a884',
              padding: '5px 14px', borderRadius: 20,
              fontSize: 12, fontWeight: 700,
              border: '1px solid #a7f3d0',
            }}
          >
            {open.length} open
          </div>
        </div>
      </header>

      {/* Sub-label */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#64748b', marginBottom: 16 }}>
        OPEN DEMAND OPPORTUNITIES
      </div>

      {open.length === 0 ? (
        <div
          style={{
            background: 'white', border: '1px solid #e2e8f0', borderRadius: 20,
            padding: '56px 32px', textAlign: 'center',
          }}
        >
          <CheckCircle2 size={40} style={{ color: '#00a884', marginBottom: 14 }} />
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0c1726', marginBottom: 6 }}>All demands accepted</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>You've claimed all current open opportunities. New demands will appear here when released by admin.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {open.map(demand => (
            <div
              key={demand.id}
              className="portal-panel-card"
              style={{ gap: 0 }}
            >
              {/* Top meta row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>{demand.id} · {demand.age}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: '#f1f5f9', color: '#475569',
                  padding: '3px 10px', borderRadius: 20,
                }}>
                  {demand.ageLabel}
                </span>
              </div>

              {/* Title */}
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0c1726', marginBottom: 10, lineHeight: 1.3 }}>
                {demand.title}
              </div>

              {/* Category & Location & Size rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#475569' }}>
                  <Package size={12} style={{ color: '#00a884', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>Category:</span>
                  <span>{demand.category}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#475569' }}>
                  <MapPin size={12} style={{ color: '#64748b', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>Location:</span>
                  <span>{demand.location}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#475569' }}>
                  <Zap size={12} style={{ color: '#64748b', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>Demand Size:</span>
                  <span>{demand.demandSize}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => setSelectedDemand(demand)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '11px',
                  borderRadius: 10,
                  background: '#0f1c29',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  transition: 'background 0.15s',
                  marginTop: 'auto',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1a2f46')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0f1c29')}
              >
                <CheckCircle2 size={15} />
                Accept Job
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirm modal */}
      {selectedDemand && (
        <AcceptConfirmModal
          demand={selectedDemand}
          onConfirm={handleAccept}
          onClose={() => setSelectedDemand(null)}
        />
      )}

      <style>{`
        @media (max-width: 860px) {
          .supplier-demands-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}


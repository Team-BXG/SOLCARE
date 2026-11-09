import { X, CheckCircle2, Zap } from 'lucide-react';

export default function DemandModal({ selectedDemand, onClose }) {
  if (!selectedDemand) return null;

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              DEMAND SPECIFICATION
            </span>
            <h3>{selectedDemand.facility}</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
              {selectedDemand.id} • {selectedDemand.type}
            </span>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            style={{ position: 'static', display: 'flex' }}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>REGION / WOREDA</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{selectedDemand.regionZone}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{selectedDemand.woreda}</div>
            </div>

            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>ASSIGNED EPC SUPPLIER</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{selectedDemand.supplier}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Submitted {selectedDemand.date}</div>
            </div>
          </div>

          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>SYSTEM REQUIREMENT</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{selectedDemand.requirement}</div>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
              Primary energy source to sustain ICU, Cold Chain Vaccine storage, Maternity, and Surgical Theatre units with high reliability.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#ecfdf5', borderRadius: 10, border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {selectedDemand.techClass === 'complete' ? (
                <CheckCircle2 size={18} color="#059669" />
              ) : (
                <Zap size={18} color="#d97706" />
              )}
              <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46' }}>
                Technical Status: {selectedDemand.techAssessment}
              </span>
            </div>
            <span className={`badge-status ${selectedDemand.statusClass}`}>
              {selectedDemand.status}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-export"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


import { X, CheckCircle } from 'lucide-react';

export default function RequestModal({ selectedRequest, onClose }) {
  if (!selectedRequest) return null;

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#00a884', letterSpacing: 0.8 }}>
              REQUEST DETAILS
            </span>
            <h3>{selectedRequest.summary}</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
              {selectedRequest.id}
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
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>SUBMITTED DATE</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                {selectedRequest.submittedDate}
              </div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Last updated: {selectedRequest.lastUpdated}</div>
            </div>

            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>REQUESTED CAPACITY</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                {selectedRequest.capacity}
              </div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Solar PV + Inverter Hybrid</div>
            </div>
          </div>

          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
              COVERED CLINICAL DEPARTMENTS
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
              {selectedRequest.departments}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#ecfdf5', borderRadius: 10, border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={18} color="#059669" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46' }}>
                Status: {selectedRequest.status}
              </span>
            </div>
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


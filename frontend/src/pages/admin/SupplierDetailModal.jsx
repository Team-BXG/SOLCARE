import React from 'react';
import { X, Truck, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SupplierDetailModal({ supplier, demands = [], onClose, onSelectDemand }) {
  if (!supplier) return null;

  const assignedDemands = demands.filter(
    (d) => (d.supplier || '').toLowerCase() === (supplier.name || '').toLowerCase()
  );

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              EPC SOLAR SUPPLIER PROFILE
            </span>
            <h3 style={{ margin: '2px 0 0 0' }}>{supplier.name}</h3>
            <span style={{ fontSize: 11, color: '#64748b' }}>
              Active Allocated Projects: {assignedDemands.length}
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

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status Breakdown Pills */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, marginBottom: 8 }}>WORKLOAD BREAKDOWN</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {supplier.breakdown?.length > 0 ? (
                supplier.breakdown.map((b) => (
                  <span key={b.label} className="breakdown-pill">
                    {b.label}: {b.count}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: 12, color: '#64748b' }}>No active contracts underway.</span>
              )}
            </div>
          </div>

          {/* Assigned Healthcare Demands */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={15} color="var(--brand-primary, #00a884)" />
              <span>Assigned Facility Projects ({assignedDemands.length})</span>
            </div>

            {assignedDemands.length === 0 ? (
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', color: '#64748b', fontSize: 13 }}>
                This EPC supplier does not currently have any assigned hospital projects.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {assignedDemands.map((dem) => (
                  <div
                    key={dem.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 12,
                      background: '#ffffff',
                      borderRadius: 10,
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onClick={() => {
                      if (onSelectDemand) {
                        onClose();
                        onSelectDemand(dem);
                      }
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-primary, #00a884)', fontFamily: 'monospace' }}>
                          {dem.id}
                        </span>
                        <span className={`badge-status ${dem.statusClass}`}>
                          {dem.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginTop: 4 }}>
                        {dem.facility} — {dem.requirement || dem.summary}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>
                        Milestone: {dem.supplyStage || 'In Progress'} · Region: {dem.region}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="link-action-btn"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--brand-primary, #00a884)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>Manage</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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


import React from 'react';
import { X, Building2, MapPin, Zap, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function FacilityDetailModal({ facility, demands = [], onClose, onSelectDemand }) {
  if (!facility) return null;

  const facilityDemands = demands.filter(
    (d) => (d.facility || '').toLowerCase() === (facility.name || '').toLowerCase()
  );

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              FACILITY DIRECTORY DOSSIER
            </span>
            <h3 style={{ margin: '2px 0 0 0' }}>{facility.name}</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
              Level: {facility.type}
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
          {/* Geographic Location Box */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>REGION</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{facility.region}</div>
            </div>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>ZONE</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{facility.zone || facility.region}</div>
            </div>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>WOREDA</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{facility.woreda}</div>
            </div>
          </div>

          {/* Registered Demands for this Facility */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={15} color="var(--brand-primary, #00a884)" />
              <span>Registered Solar Energy Demands ({facilityDemands.length})</span>
            </div>

            {facilityDemands.length === 0 ? (
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', color: '#64748b', fontSize: 13 }}>
                No active solar demands currently registered for this healthcare facility.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {facilityDemands.map((dem) => (
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
                        {dem.requirement || dem.summary}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>
                        Supplier: {dem.supplier || '—'} · Submitted {dem.date}
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
                      <span>Open</span>
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


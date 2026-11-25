import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';

const SUPPLY_STAGES = [
  'Supplier Accepted',
  'Procurement',
  'Dispatched',
  'Delivered',
  'Installation In Progress',
  'Installation Completed',
];

export default function SupplyTrackingModal({ demand, onClose }) {
  const { updateSupplyStage } = useSolcare();
  const [currentStage, setCurrentStage] = useState(
    demand?.supplyStage || 'Supplier Accepted'
  );
  const [notes, setNotes] = useState(demand?.supplyNotes || '');

  if (!demand) return null;

  const handleAdvance = (stage) => {
    setCurrentStage(stage);
    updateSupplyStage(demand.id, stage, notes);
    onClose();
  };

  const currentStageIndex = SUPPLY_STAGES.indexOf(currentStage);

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              SUPPLY CHAIN & FULFILLMENT TRACKER
            </span>
            <h3 style={{ margin: '2px 0 0 0' }}>{demand.facility}</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
              Ref: {demand.id} • Assigned: {demand.supplier || 'SunGrid Ethiopia'}
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
          {/* Specifications Box */}
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>PROJECT SCOPE</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{demand.requirement || demand.summary}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
              Location: {demand.regionZone || demand.region} ({demand.woreda})
            </div>
          </div>

          {/* Stepper for Supply Stages */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 10 }}>
              SUPPLY & INSTALLATION MILESTONES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SUPPLY_STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentStageIndex;
                const isCurrent = stage === currentStage;
                return (
                  <div
                    key={stage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: isCurrent ? '1.5px solid var(--brand-primary, #00a884)' : '1px solid #e2e8f0',
                      background: isCurrent ? '#f0fdfa' : isCompleted ? '#f8fafc' : '#ffffff',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: isCompleted ? '#00a884' : '#e2e8f0',
                          color: isCompleted ? '#ffffff' : '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {isCompleted ? <CheckCircle2 size={14} /> : idx + 1}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: '#0f172a' }}>
                        {stage}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={isCurrent ? 'btn-export' : 'btn-primary'}
                      style={{ fontSize: 11, padding: '4px 10px' }}
                      onClick={() => handleAdvance(stage)}
                    >
                      {isCurrent ? 'Current Stage' : 'Set as Current'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes field */}
          <div className="form-group">
            <label className="form-label">Fulfillment & Staging Log Notes</label>
            <textarea
              className="form-input form-textarea"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Battery crates cleared customs. Inverter testing scheduled on-site."
            />
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-export"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleAdvance('Installation Completed')}
          >
            <CheckCircle2 size={14} style={{ marginRight: 6 }} />
            Mark Project Completed
          </button>
        </div>
      </div>
    </div>
  );
}

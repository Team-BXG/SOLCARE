import React, { useState } from 'react';
import { X, AlertTriangle, RotateCcw, Check } from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';

export default function AssessmentModal({ demand, onClose }) {
  const { completeAssessment } = useSolcare();
  const [severity, setSeverity] = useState(demand?.severity || 'Critical');
  const [urgency, setUrgency] = useState(demand?.urgency || 'High');
  const [findings, setFindings] = useState(
    demand?.assessmentNotes ||
      'Site audit confirmed roof truss capacity adequate for monocrystalline PV installation. Existing battery backup exhausted.'
  );
  const [recommendations, setRecommendations] = useState(
    demand?.recommendations ||
      'Deploy 35 kWp solar array with 70 kWh lithium battery storage. Include automatic grid/generator transfer switch.'
  );
  const [recommendedKwp, setRecommendedKwp] = useState(
    demand?.capacity ? demand.capacity.replace(/[^0-9.]/g, '') : '35'
  );
  const [batteryKwh, setBatteryKwh] = useState('70');

  if (!demand) return null;

  const handleDecision = (decision) => {
    completeAssessment(demand.id, {
      severity,
      urgency,
      findings,
      recommendations,
      decision,
      recommendedKwp: Number(recommendedKwp) || 35,
      batteryKwh: Number(batteryKwh) || 70,
    });
    onClose();
  };

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 660 }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              TECHNICAL ASSESSMENT & ENGINEERING REVIEW
            </span>
            <h3 style={{ margin: '2px 0 0 0' }}>{demand.facility}</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
              {demand.id} • {demand.regionZone || demand.region}
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

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Summary Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>FACILITY TYPE & REGION</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{demand.type}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{demand.region} · {demand.woreda}</div>
            </div>

            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>SUBMITTED DEMAND</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{demand.requirement || demand.summary}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Current Status: {demand.status}</div>
            </div>
          </div>

          {/* Clinical Severity & Urgency */}
          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Clinical Severity Classification</label>
              <select
                className="form-input"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="Critical">Critical (ICU / Cold Chain / Surgical Theater)</option>
                <option value="Moderate">Moderate (Wards / Laboratory / Outpatient)</option>
                <option value="Low">Low (Administration / Perimeter / Quarters)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Intervention Urgency</label>
              <select
                className="form-input"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option value="High">High (Immediate intervention within 30 days)</option>
                <option value="Medium">Medium (Cluster scheduled deployment)</option>
                <option value="Low">Low (Planned standard upgrade)</option>
              </select>
            </div>
          </div>

          {/* Sizing Recommendations */}
          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Recommended Solar PV Capacity (kWp)</label>
              <input
                className="form-input"
                type="number"
                value={recommendedKwp}
                onChange={(e) => setRecommendedKwp(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Recommended Battery Storage (kWh)</label>
              <input
                className="form-input"
                type="number"
                value={batteryKwh}
                onChange={(e) => setBatteryKwh(e.target.value)}
              />
            </div>
          </div>

          {/* Technical Findings */}
          <div className="form-group">
            <label className="form-label">Field Audit & Technical Findings</label>
            <textarea
              className="form-input form-textarea"
              rows={2}
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              placeholder="Record structural survey, grid voltage fluctuations, shading, and equipment findings..."
            />
          </div>

          {/* Recommendations */}
          <div className="form-group">
            <label className="form-label">Engineering Recommendations & Comments</label>
            <textarea
              className="form-input form-textarea"
              rows={2}
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              placeholder="Recommended inverter type, battery chemistry, priority circuit cabling..."
            />
          </div>
        </div>

        {/* Modal Decision Buttons */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-export"
            onClick={onClose}
          >
            Cancel
          </button>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn-export"
              style={{ color: '#b45309', borderColor: '#fde68a', background: '#fffbeb' }}
              onClick={() => handleDecision('Returned')}
            >
              <RotateCcw size={14} style={{ marginRight: 4 }} />
              Return for Revision
            </button>
            <button
              type="button"
              className="btn-export"
              style={{ color: '#dc2626', borderColor: '#fecaca', background: '#fef2f2' }}
              onClick={() => handleDecision('Rejected')}
            >
              <AlertTriangle size={14} style={{ marginRight: 4 }} />
              Reject
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => handleDecision('Approved')}
            >
              <Check size={14} style={{ marginRight: 4 }} />
              Approve Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

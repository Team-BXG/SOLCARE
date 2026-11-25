import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Zap,
  Trash2,
  Edit2,
  Save,
  Check,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';
import { STATUS_MAP } from '../../context/statusConstants';

export default function DemandModal({ selectedDemand, onClose }) {
  const { updateDemand, deleteDemand, completeAssessment, suppliers } = useSolcare();
  const [isEditing, setIsEditing] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);

  // Edit fields
  const [editRequirement, setEditRequirement] = useState(selectedDemand?.requirement || '');
  const [editStatus, setEditStatus] = useState(selectedDemand?.status || 'Under Verification');
  const [editSupplier, setEditSupplier] = useState(selectedDemand?.supplier || '—');

  // Assessment fields
  const [severity, setSeverity] = useState(selectedDemand?.severity || 'Critical');
  const [urgency, setUrgency] = useState(selectedDemand?.urgency || 'High');
  const [findings, setFindings] = useState(selectedDemand?.assessmentNotes || '');
  const [recommendations, setRecommendations] = useState(selectedDemand?.recommendations || '');
  const [recommendedKwp, setRecommendedKwp] = useState(
    selectedDemand?.capacity?.replace(/[^0-9.]/g, '') || '35'
  );

  if (!selectedDemand) return null;

  const handleSaveEdit = () => {
    updateDemand(selectedDemand.id, {
      requirement: editRequirement,
      status: editStatus,
      supplier: editSupplier,
    });
    setIsEditing(false);
  };

  const handleSaveAssessment = (chosenDecision) => {
    completeAssessment(selectedDemand.id, {
      severity,
      urgency,
      findings,
      recommendations,
      decision: chosenDecision,
      recommendedKwp: Number(recommendedKwp) || 35,
    });
    setIsAssessing(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete request ${selectedDemand.id}? This action cannot be undone.`)) {
      deleteDemand(selectedDemand.id);
      onClose();
    }
  };

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              DEMAND SPECIFICATION & WORKFLOW CONTROL
            </span>
            <h3 style={{ margin: '2px 0 0 0' }}>{selectedDemand.facility}</h3>
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
          {/* Action Tabs in Modal */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18, borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
            <button
              type="button"
              className="btn-export"
              style={{
                fontSize: 12,
                fontWeight: !isEditing && !isAssessing ? 700 : 500,
                background: !isEditing && !isAssessing ? '#f1f5f9' : 'transparent',
              }}
              onClick={() => {
                setIsEditing(false);
                setIsAssessing(false);
              }}
            >
              Overview
            </button>
            <button
              type="button"
              className="btn-export"
              style={{
                fontSize: 12,
                fontWeight: isEditing ? 700 : 500,
                background: isEditing ? '#f1f5f9' : 'transparent',
              }}
              onClick={() => {
                setIsEditing(true);
                setIsAssessing(false);
              }}
            >
              <Edit2 size={13} style={{ marginRight: 4 }} />
              Edit Request
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{
                fontSize: 12,
                padding: '6px 12px',
                fontWeight: isAssessing ? 700 : 600,
              }}
              onClick={() => {
                setIsAssessing(true);
                setIsEditing(false);
              }}
            >
              <CheckCircle2 size={13} style={{ marginRight: 4 }} />
              Engineering Assessment
            </button>
          </div>

          {/* VIEW 1: ASSESSMENT FORM */}
          {isAssessing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0', fontSize: 13, color: '#166534' }}>
                <strong>Technical Assessment Desk:</strong> Complete findings, classify severity and urgency, then Approve, Reject, or Return this request.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Clinical Severity</label>
                  <select
                    className="form-input"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                  >
                    <option value="Critical">Critical (ICU / Operating Room / Vaccines)</option>
                    <option value="Moderate">Moderate (General Ward / Lab)</option>
                    <option value="Low">Low (Administrative loads)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Intervention Urgency</label>
                  <select
                    className="form-input"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                  >
                    <option value="High">High (Immediate intervention required)</option>
                    <option value="Medium">Medium (Scheduled cluster rollout)</option>
                    <option value="Low">Low (Standard maintenance cycle)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Recommended Solar Capacity (kWp)</label>
                <input
                  className="form-input"
                  type="number"
                  value={recommendedKwp}
                  onChange={(e) => setRecommendedKwp(e.target.value)}
                  placeholder="e.g. 35"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technical Findings</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="e.g. Roof structural integrity confirmed. Existing lead-acid battery bank is exhausted and requires replacement."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recommendations & Engineering Comments</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="e.g. Deploy 35kWp monocrystalline arrays with 70kWh lithium storage and automatic transfer switch."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  className="btn-export"
                  style={{ color: '#b45309', borderColor: '#fde68a', background: '#fffbeb' }}
                  onClick={() => handleSaveAssessment('Returned')}
                >
                  <RotateCcw size={14} style={{ marginRight: 4 }} />
                  Return for Info
                </button>
                <button
                  type="button"
                  className="btn-export"
                  style={{ color: '#dc2626', borderColor: '#fecaca', background: '#fef2f2' }}
                  onClick={() => handleSaveAssessment('Rejected')}
                >
                  <AlertTriangle size={14} style={{ marginRight: 4 }} />
                  Reject
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleSaveAssessment('Approved')}
                >
                  <Check size={14} style={{ marginRight: 4 }} />
                  Approve Assessment
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: EDIT REQUEST FORM */}
          {isEditing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Solar Requirement Description</label>
                <input
                  className="form-input"
                  type="text"
                  value={editRequirement}
                  onChange={(e) => setEditRequirement(e.target.value)}
                />
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Workflow Status</label>
                  <select
                    className="form-input"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    {Object.keys(STATUS_MAP).map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Assigned Supplier</label>
                  <select
                    className="form-input"
                    value={editSupplier}
                    onChange={(e) => setEditSupplier(e.target.value)}
                  >
                    <option value="—">Unassigned (—)</option>
                    {suppliers.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                <button
                  type="button"
                  className="table-action-btn"
                  style={{ color: '#dc2626', width: 'auto', padding: '6px 12px', fontSize: 12, background: '#fef2f2' }}
                  onClick={handleDelete}
                >
                  <Trash2 size={14} style={{ marginRight: 6 }} />
                  Delete Request
                </button>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="btn-export"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSaveEdit}
                  >
                    <Save size={14} style={{ marginRight: 4 }} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: STANDARD DETAILS OVERVIEW */}
          {!isEditing && !isAssessing && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>REGION / WOREDA</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{selectedDemand.regionZone || selectedDemand.region}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{selectedDemand.woreda}</div>
                </div>

                <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>ASSIGNED EPC SUPPLIER</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{selectedDemand.supplier || '—'}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Stage: {selectedDemand.supplyStage || 'Pending'}</div>
                </div>
              </div>

              <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 4 }}>SYSTEM REQUIREMENT</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{selectedDemand.requirement}</div>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
                  {selectedDemand.criticalDepartments || 'Primary energy source to sustain ICU, Cold Chain Vaccine storage, Maternity, and Surgical Theatre units with high reliability.'}
                </p>
              </div>

              {selectedDemand.assessmentNotes && (
                <div style={{ padding: 14, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#166534', marginBottom: 4 }}>TECHNICAL FINDINGS & RECOMMENDATIONS</div>
                  <p style={{ fontSize: 13, color: '#14532d', margin: '0 0 6px 0', fontWeight: 600 }}>{selectedDemand.assessmentNotes}</p>
                  <p style={{ fontSize: 12, color: '#166534', margin: 0 }}>{selectedDemand.recommendations}</p>
                </div>
              )}

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
            </>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {!isEditing && !isAssessing && (
              <button
                type="button"
                className="table-action-btn"
                style={{ color: '#dc2626', width: 'auto', padding: '6px 12px', fontSize: 12 }}
                onClick={handleDelete}
              >
                <Trash2 size={14} style={{ marginRight: 4 }} />
                Delete
              </button>
            )}
          </div>
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

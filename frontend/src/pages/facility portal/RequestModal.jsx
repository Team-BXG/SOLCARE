import React, { useState } from 'react';
import { X, CheckCircle, Edit2, Save, Trash2 } from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';
import { STATUS_MAP } from '../../context/statusConstants';

export default function RequestModal({ selectedRequest, onClose }) {
  const { updateDemand, deleteDemand } = useSolcare();
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState(selectedRequest?.summary || selectedRequest?.requirement || '');
  const [departments, setDepartments] = useState(selectedRequest?.departments || selectedRequest?.criticalDepartments || '');
  const [capacity, setCapacity] = useState(selectedRequest?.capacity || '35 kWp');
  const [status, setStatus] = useState(selectedRequest?.status || 'Under Verification');

  if (!selectedRequest) return null;

  const handleSave = () => {
    updateDemand(selectedRequest.id, {
      summary,
      requirement: summary,
      departments,
      criticalDepartments: departments,
      capacity,
      status,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete request ${selectedRequest.id}?`)) {
      deleteDemand(selectedRequest.id);
      onClose();
    }
  };

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
              HEALTHCARE FACILITY REQUEST
            </span>
            <h3 style={{ margin: '2px 0 0 0' }}>{selectedRequest.summary || selectedRequest.requirement}</h3>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
              {selectedRequest.id} • {selectedRequest.facility || 'Hawassa General Hospital'}
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
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Requirement Summary</label>
                <input
                  className="form-input"
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Requested Capacity</label>
                  <input
                    className="form-input"
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Workflow Status</label>
                  <select
                    className="form-input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {Object.keys(STATUS_MAP).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Covered Clinical Departments</label>
                <textarea
                  className="form-input form-textarea"
                  rows={2}
                  value={departments}
                  onChange={(e) => setDepartments(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
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
                  onClick={handleSave}
                >
                  <Save size={14} style={{ marginRight: 4 }} />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>SUBMITTED DATE</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                    {selectedRequest.submittedDate || selectedRequest.date}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>
                    {selectedRequest.lastUpdated || selectedRequest.updatedDate}
                  </div>
                </div>

                <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>REQUESTED CAPACITY</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                    {selectedRequest.capacity || selectedRequest.requirement}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Solar PV + Inverter Hybrid</div>
                </div>
              </div>

              <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                  COVERED CLINICAL DEPARTMENTS
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                  {selectedRequest.departments || selectedRequest.criticalDepartments || 'ICU, Operating Room, Laboratory, Emergency'}
                </div>
              </div>

              {selectedRequest.assessmentNotes && (
                <div style={{ padding: 14, background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                    ENGINEERING ASSESSMENT NOTES
                  </div>
                  <div style={{ fontSize: 13, color: '#14532d', fontWeight: 600 }}>{selectedRequest.assessmentNotes}</div>
                  <div style={{ fontSize: 12, color: '#166534', marginTop: 4 }}>{selectedRequest.recommendations}</div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#ecfdf5', borderRadius: 10, border: '1px solid #a7f3d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={18} color="#059669" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46' }}>
                    Status: {selectedRequest.status}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: '#065f46', fontWeight: 600 }}>
                  Stage: {selectedRequest.supplyStage || 'Verification'}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {!isEditing && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="table-action-btn"
                  style={{ width: 'auto', padding: '6px 12px', fontSize: 12 }}
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={13} style={{ marginRight: 4 }} />
                  Edit
                </button>
                <button
                  type="button"
                  className="table-action-btn"
                  style={{ color: '#dc2626', width: 'auto', padding: '6px 12px', fontSize: 12 }}
                  onClick={handleDelete}
                >
                  <Trash2 size={13} style={{ marginRight: 4 }} />
                  Delete
                </button>
              </div>
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

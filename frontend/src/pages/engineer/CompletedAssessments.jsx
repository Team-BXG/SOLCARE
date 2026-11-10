import { useState } from 'react';
import { Clock, CheckCircle2, X, FileText, MapPin, User, Zap, Download, Eye } from 'lucide-react';

const completedData = [
  {
    id: 'CMP-091',
    facility: 'Bahir Dar Referral Hospital',
    assessor: 'Eng. Solomon Bekele',
    score: 91,
    status: 'Approved',
    statusKey: 'approved',
    completed: 'Jan 16, 2025',
    region: 'Amhara',
    capacity: '48 kWp',
    notes: 'Battery autonomy meets ICU 8-hour standard. PV array orientation optimal for rooftop.',
  },
  {
    id: 'CMP-086',
    facility: 'Mekele Children\'s Hospital',
    assessor: 'Eng. Solomon Bekele',
    score: 86,
    status: 'Ready for procurement',
    statusKey: 'procurement',
    completed: 'Jan 14, 2025',
    region: 'Tigray',
    capacity: '32 kWp',
    notes: 'Paediatric ward load verified. Structural survey complete. Procurement package submitted.',
  },
  {
    id: 'CMP-74',
    facility: 'Dire Dawa Clinic Network',
    assessor: 'Technical Team D',
    score: 74,
    status: 'Needs site visit',
    statusKey: 'site-visit',
    completed: 'Jan 11, 2025',
    region: 'Dire Dawa',
    capacity: '22 kWp',
    notes: 'Grid feed-in point unclear. Site revisit required to verify metering cabinet access.',
  },
  {
    id: 'CMP-086B',
    facility: 'Harer General Hospital',
    assessor: 'Eng. Solomon Bekele',
    score: 86,
    status: 'Approved',
    statusKey: 'approved',
    completed: 'Jan 09, 2025',
    region: 'Harari',
    capacity: '55 kWp',
    notes: 'Emergency ward and cold chain loads modelled correctly. Commissioning plan attached.',
  },
];

const statusStyles = {
  approved: { bg: '#d1fae5', color: '#059669', label: 'Approved' },
  procurement: { bg: '#dbeafe', color: '#1d4ed8', label: 'Ready for procurement' },
  'site-visit': { bg: '#fef3c7', color: '#d97706', label: 'Needs site visit' },
};

function ScoreBadge({ score }) {
  const color = score >= 85 ? '#00a884' : score >= 75 ? '#f59e0b' : '#ef4444';
  const bg = score >= 85 ? '#e6f7f3' : score >= 75 ? '#fef3c7' : '#fee2e2';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 10,
        background: bg,
        color,
        fontSize: 13,
        fontWeight: 800,
      }}
    >
      {score}
    </span>
  );
}

function CompletedDetailModal({ item, onClose }) {
  if (!item) return null;
  const st = statusStyles[item.statusKey] || statusStyles.approved;
  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div
        className="portal-modal-box"
        style={{ maxWidth: 620 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                  background: st.bg, color: st.color,
                }}
              >
                {st.label}
              </span>
              <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>{item.id}</span>
            </div>
            <h3 style={{ margin: 0 }}>{item.facility}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', color: '#64748b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: <User size={13} />, label: 'Assessor', val: item.assessor },
              { icon: <Zap size={13} />, label: 'Capacity', val: item.capacity },
              { icon: <MapPin size={13} />, label: 'Region', val: item.region },
              { icon: <Clock size={13} />, label: 'Completed', val: item.completed },
            ].map(r => (
              <div
                key={r.label}
                style={{
                  background: '#f8fafc', border: '1px solid #e2e8f0',
                  borderRadius: 10, padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', marginBottom: 4 }}>
                  {r.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</div>
              </div>
            ))}
          </div>

          {/* Readiness Score */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: 12,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', marginBottom: 4 }}>
                Readiness Score
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Technical readiness out of 100</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 120, height: 8, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${item.score}%`,
                    borderRadius: 4,
                    background: item.score >= 85 ? '#00a884' : item.score >= 75 ? '#f59e0b' : '#ef4444',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#0c1726' }}>{item.score}</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 8 }}>Assessment Notes</div>
            <div
              style={{
                fontSize: 13, color: '#475569', lineHeight: 1.6,
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 10, padding: '14px 16px',
              }}
            >
              {item.notes}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={() => alert(`Downloading report for ${item.facility}...`)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0',
              background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Download size={14} />
            Download Report
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 20px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0,168,132,0.4)',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CompletedAssessments() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = filterStatus === 'all'
    ? completedData
    : completedData.filter(d => d.statusKey === filterStatus);

  return (
    <>
      {/* Header */}
      <header className="portal-topbar">
        <div className="topbar-left">
          <div className="breadcrumb">CLOSED ASSESSMENT REGISTER</div>
          <h1 className="portal-title">Completed Assessments</h1>
          <p className="portal-subtitle">
            Finished technical assessments with readiness scores and final review status.
          </p>
        </div>
        <div className="topbar-right">
          <div className="header-badge-pill dark">
            <Clock size={12} style={{ color: '#00a884' }} />
            <span>TODAY • Jan 18 · 7 open decisions</span>
          </div>
        </div>
      </header>

      {/* Table Card */}
      <div className="content-table-card">
        <div className="table-card-header">
          <div className="table-title-area">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={18} style={{ color: '#00a884' }} />
              Finished assessment table
            </h3>
            <p>{filtered.length} assessments shown</p>
          </div>
          <div className="table-actions-row">
            <select
              className="table-filter-select"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="approved">Approved</option>
              <option value="procurement">Ready for procurement</option>
              <option value="site-visit">Needs site visit</option>
            </select>
            <button
              type="button"
              className="btn-export"
              onClick={() => alert('Exporting CSV...')}
            >
              <Download size={13} />
              Export
            </button>
          </div>
        </div>

        <div className="portal-table-container">
          <table className="portal-data-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Assessor</th>
                <th>Score</th>
                <th>Status</th>
                <th>Completed</th>
                <th style={{ textAlign: 'center' }}>View</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const st = statusStyles[row.statusKey] || statusStyles.approved;
                return (
                  <tr key={row.id}>
                    <td>
                      <div className="facility-cell">
                        <div className="name">{row.facility}</div>
                        <div className="code">{row.id} · {row.region}</div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>
                      {row.assessor}
                    </td>
                    <td>
                      <ScoreBadge score={row.score} />
                    </td>
                    <td>
                      <span
                        className="badge-status"
                        style={{ background: st.bg, color: st.color }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {row.completed}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => setSelectedItem(row)}
                        title="View details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="table-card-footer">
          <span>Showing {filtered.length} of {completedData.length} completed assessments</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 12, color: '#059669', fontWeight: 600,
              }}
            >
              <CheckCircle2 size={13} />
              {completedData.filter(d => d.statusKey === 'approved').length} Approved
            </span>
            <span style={{ color: '#e2e8f0' }}>|</span>
            <span style={{ fontSize: 12, color: '#1d4ed8', fontWeight: 600 }}>
              {completedData.filter(d => d.statusKey === 'procurement').length} Procurement ready
            </span>
            <span style={{ color: '#e2e8f0' }}>|</span>
            <span style={{ fontSize: 12, color: '#d97706', fontWeight: 600 }}>
              {completedData.filter(d => d.statusKey === 'site-visit').length} Needs site visit
            </span>
          </div>
        </div>
      </div>

      {selectedItem && (
        <CompletedDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}


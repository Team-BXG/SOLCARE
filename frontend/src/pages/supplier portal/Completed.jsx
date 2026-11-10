import { useState } from 'react';
import { PanelLeft, Star, ChevronDown, CheckCircle2, X, Download, FileText, Calendar, MapPin, Zap } from 'lucide-react';

const completedJobs = [
  {
    id: 'REQ-2025-001',
    title: 'Adama Emergency Department Power Stabilization',
    facility: 'Adama Medical Center',
    location: 'Adama, Oromia',
    completedDate: 'Feb 14, 2025',
    category: '120 kWp Rooftop PV',
    rating: 4.9,
    ratingCount: 1,
    summary: 'Completion report approved with excellent handover score. All installation, commissioning, and documentation requirements were met on time.',
    handoverScore: 97,
    items: [
      { label: 'Equipment delivered on schedule', passed: true },
      { label: 'On-site installation completed', passed: true },
      { label: 'Commissioning test passed', passed: true },
      { label: 'Handover documentation submitted', passed: true },
      { label: 'Admin review & sign-off', passed: true },
    ],
  },
];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={15}
          fill={i <= full ? '#f59e0b' : 'none'}
          stroke={i <= full || (half && i === full + 1) ? '#f59e0b' : '#d1d5db'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

function CompletedJobModal({ job, onClose }) {
  if (!job) return null;
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
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                background: '#d1fae5', color: '#059669',
              }}>
                Completed
              </span>
              <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>{job.id}</span>
            </div>
            <h3 style={{ margin: 0 }}>{job.title}</h3>
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
              { icon: <MapPin size={13} />, label: 'Location', val: job.location },
              { icon: <Calendar size={13} />, label: 'Completed', val: job.completedDate },
              { icon: <Zap size={13} />, label: 'Scope', val: job.category },
              { icon: <FileText size={13} />, label: 'Facility', val: job.facility },
            ].map(r => (
              <div key={r.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', marginBottom: 4 }}>
                  {r.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</div>
              </div>
            ))}
          </div>

          {/* Rating & Score row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{
              background: '#fffbeb', border: '1px solid #fde68a',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#92400e', marginBottom: 6 }}>
                Supplier Rating
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <StarRating rating={job.rating} />
                <span style={{ fontSize: 22, fontWeight: 800, color: '#0c1726' }}>{job.rating}</span>
              </div>
            </div>
            <div style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#065f46', marginBottom: 6 }}>
                Handover Score
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 7, borderRadius: 4, background: '#d1fae5', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${job.handoverScore}%`, borderRadius: 4, background: '#00a884' }} />
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#0c1726' }}>{job.handoverScore}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: 10, padding: '14px 16px',
            fontSize: 13, color: '#475569', lineHeight: 1.6,
          }}>
            {job.summary}
          </div>

          {/* Checklist */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 10 }}>Completion checklist</div>
            {job.items.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderBottom: '1px solid #f1f5f9',
                fontSize: 13, color: '#334155',
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 50,
                  background: item.passed ? '#00a884' : '#e2e8f0',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 10, fontWeight: 800,
                }}>
                  {item.passed ? '✓' : ''}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={() => alert(`Downloading completion report for ${job.id}...`)}
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
              padding: '9px 22px', borderRadius: 8, border: 'none',
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

export default function Completed() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      {/* Header */}
      <header className="portal-topbar" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div className="topbar-left">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#00a884', fontSize: 11, fontWeight: 700,
            letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4,
          }}>
            <PanelLeft size={14} />
            <span>DIRECT SUPPLIER WORKSPACE</span>
          </div>
          <h1 className="portal-title">Completed</h1>
        </div>
        <div className="topbar-right" style={{ maxWidth: 420 }}>
          <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
            A fixed left navigation keeps each section in its own calm, full-panel view for fast demand review, fulfillment tracking, and document control.
          </p>
        </div>
      </header>

      {/* Sub-label + subtitle */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#64748b', marginBottom: 6 }}>
          COMPLETED HISTORY
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0c1726' }}>
          Closed jobs with supplier ratings.
        </div>
      </div>

      {/* Job cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {completedJobs.map(job => (
          <div
            key={job.id}
            className="portal-panel-card"
            style={{ gap: 0 }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>
                {job.id} · {job.completedDate}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: '#d1fae5', color: '#059669',
                padding: '3px 10px', borderRadius: 20,
              }}>
                Completed
              </span>
            </div>

            {/* Title */}
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0c1726', marginBottom: 16, lineHeight: 1.25 }}>
              {job.title}
            </div>

            {/* Supplier rating row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 14, padding: '12px 16px',
              background: '#fffbeb', border: '1px solid #fde68a',
              borderRadius: 12,
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#78350f' }}>Supplier rating</span>
              <div style={{ flex: 1 }} />
              <StarRating rating={job.rating} />
              <span style={{ fontSize: 18, fontWeight: 800, color: '#0c1726' }}>{job.rating}</span>
            </div>

            {/* Summary */}
            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 18 }}>
              {job.summary}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 16, borderTop: '1px solid #f1f5f9', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#059669', fontWeight: 600 }}>
                <CheckCircle2 size={13} />
                All {job.items.length} milestones completed
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(job)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: '#0f1c29', color: 'white',
                  border: 'none', borderRadius: 8,
                  padding: '8px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1a2f46')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0f1c29')}
              >
                View full report
                <Download size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <CompletedJobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}


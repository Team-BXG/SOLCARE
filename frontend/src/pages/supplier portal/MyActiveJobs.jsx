import { useState } from 'react';
import { MapPin, Calendar, ChevronRight, X, Upload, FileText, CheckCircle2, Clock, PanelLeft, AlertCircle } from 'lucide-react';

const activeJobs = [
  {
    id: 'REQ-2025-003',
    status: 'In Progress',
    statusKey: 'progress',
    title: 'Jimma Outpatient Wing Installation',
    facility: 'Jimma Health Center',
    location: 'Jimma, Oromia',
    deadline: 'Mar 19, 2025',
    category: '50 kWp Solar PV System',
    description: 'Site project staging confirmed. Delivery route assigned. Equipment currently in transit from Addis Ababa warehouse to Jimma.',
    milestones: [
      { label: 'Job accepted', done: true, date: 'Mar 01' },
      { label: 'BOQ & documents submitted', done: true, date: 'Mar 05' },
      { label: 'Equipment dispatched', done: true, date: 'Mar 12' },
      { label: 'On-site installation', done: false, date: 'Mar 16' },
      { label: 'Commissioning & handover', done: false, date: 'Mar 19' },
    ],
    progress: 60,
  },
];

function JobDetailModal({ job, onClose }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleFileChange = (e) => {
    if (e.target.files[0]) setUploadedFile(e.target.files[0].name);
  };

  const handleSubmitUpdate = () => {
    if (!noteText.trim() && !uploadedFile) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setNoteText('');
    setUploadedFile(null);
  };

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div
        className="portal-modal-box"
        style={{ maxWidth: 640 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                background: '#fef3c7', color: '#d97706',
              }}>
                In Progress
              </span>
              <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>{job.id}</span>
            </div>
            <h3 style={{ margin: 0 }}>{job.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8, background: '#f1f5f9',
              color: '#64748b', display: 'flex', alignItems: 'center',
              justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Info row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: <MapPin size={13} />, label: 'Location', val: job.location },
              { icon: <Calendar size={13} />, label: 'Deadline', val: job.deadline },
              { icon: <FileText size={13} />, label: 'Scope', val: job.category },
              { icon: <CheckCircle2 size={13} />, label: 'Facility', val: job.facility },
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

          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>Overall progress</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#00a884' }}>{job.progress}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${job.progress}%`, borderRadius: 4, background: 'linear-gradient(90deg, #00a884, #06b6d4)', transition: 'width 0.8s ease' }} />
            </div>
          </div>

          {/* Milestones */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 10 }}>Milestones</div>
            {job.milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 50,
                  background: m.done ? '#00a884' : '#e2e8f0',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 11, fontWeight: 800,
                }}>
                  {m.done ? '✓' : ''}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: m.done ? '#334155' : '#94a3b8', fontWeight: m.done ? 600 : 400 }}>{m.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>{m.date}</span>
              </div>
            ))}
          </div>

          {/* Submit progress update */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 10 }}>Submit a progress update</div>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Describe current status, issues, or next steps..."
              className="form-input form-textarea"
              style={{ marginBottom: 10, minHeight: 72 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 600, color: '#475569',
                cursor: 'pointer',
                background: 'white', border: '1px solid #e2e8f0',
                borderRadius: 8, padding: '7px 14px',
              }}>
                <Upload size={13} />
                {uploadedFile ? uploadedFile : 'Attach document'}
                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
              </label>
              {submitted && (
                <span style={{ fontSize: 12, color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={13} /> Update submitted
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmitUpdate}
            style={{
              padding: '9px 22px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: '0 3px 10px rgba(0,168,132,0.4)',
            }}
          >
            <Upload size={14} />
            Submit Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyActiveJobs() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      {/* Header */}
      <header className="portal-topbar" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div className="topbar-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00a884', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
            <PanelLeft size={14} />
            <span>DIRECT SUPPLIER WORKSPACE</span>
          </div>
          <h1 className="portal-title">My Active Jobs</h1>
          <p className="portal-subtitle">Jobs in motion with deadlines.</p>
        </div>
      </header>

      {/* Sub-label */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase', color: '#64748b', marginBottom: 16 }}>
        CURRENTLY ACCEPTED
      </div>

      {/* Job Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeJobs.map(job => (
          <div key={job.id} className="portal-panel-card" style={{ gap: 0 }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>{job.id}</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: '#fef3c7', color: '#d97706',
                padding: '3px 10px', borderRadius: 20,
              }}>
                In Progress
              </span>
            </div>

            {/* Title */}
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0c1726', marginBottom: 16, lineHeight: 1.25 }}>
              {job.title}
            </div>

            {/* Meta row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: 12, color: '#475569' }}>
                <Calendar size={13} style={{ color: '#00a884', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px' }}>Deadline</div>
                  <div style={{ fontWeight: 700, color: '#0c1726' }}>{job.deadline}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: 12, color: '#475569' }}>
                <MapPin size={13} style={{ color: '#64748b', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px' }}>Location</div>
                  <div style={{ fontWeight: 700, color: '#0c1726' }}>{job.location}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 18 }}>
              {job.description}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Completion</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#00a884' }}>{job.progress}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${job.progress}%`, borderRadius: 4,
                  background: 'linear-gradient(90deg, #00a884, #06b6d4)',
                }} />
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f1f5f9', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#d97706', fontWeight: 600 }}>
                <Clock size={13} />
                Next: On-site installation · Mar 16
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(job)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'linear-gradient(135deg, #00a884 0%, #008f70 100%)',
                  color: 'white', border: 'none', borderRadius: 8,
                  padding: '8px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,168,132,0.35)',
                }}
              >
                View Job
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}


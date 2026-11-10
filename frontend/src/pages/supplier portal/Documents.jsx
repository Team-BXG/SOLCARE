import { useState, useRef } from 'react';
import { PanelLeft, Upload, FileText, Image, ClipboardList, Download, Eye, Trash2, X, CheckCircle2 } from 'lucide-react';

const initialDocuments = [
  {
    id: 'doc-001',
    name: 'Delivery acceptance packet',
    type: 'PDF Bundle',
    updatedLabel: 'Updated Today',
    status: 'Approved',
    statusKey: 'approved',
    icon: 'pdf',
    linkedJob: 'REQ-2025-001',
    size: '2.4 MB',
  },
  {
    id: 'doc-002',
    name: 'Installation evidence photos',
    type: 'Image set',
    updatedLabel: 'Updated Yesterday',
    status: 'Pending',
    statusKey: 'pending',
    icon: 'image',
    linkedJob: 'REQ-2025-003',
    size: '8.7 MB',
  },
  {
    id: 'doc-003',
    name: 'Commissioning checklist template',
    type: 'Template',
    updatedLabel: 'Updated Nov 10',
    status: 'Draft',
    statusKey: 'draft',
    icon: 'template',
    linkedJob: '—',
    size: '124 KB',
  },
];

const statusStyles = {
  approved: { bg: '#d1fae5', color: '#059669' },
  pending:  { bg: '#fef3c7', color: '#d97706' },
  draft:    { bg: '#f1f5f9', color: '#475569' },
};

function DocIcon({ type }) {
  const base = {
    width: 36, height: 36, minWidth: 36, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
  if (type === 'pdf')      return <div style={{ ...base, background: '#fee2e2', color: '#ef4444' }}><FileText size={16} /></div>;
  if (type === 'image')    return <div style={{ ...base, background: '#eff6ff', color: '#2563eb' }}><Image size={16} /></div>;
  return                          <div style={{ ...base, background: '#f1f5f9', color: '#64748b' }}><ClipboardList size={16} /></div>;
}

function DocDetailModal({ doc, onClose }) {
  if (!doc) return null;
  const st = statusStyles[doc.statusKey] || statusStyles.draft;
  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div className="portal-modal-box" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: st.bg, color: st.color, marginBottom: 6, display: 'inline-block' }}>
              {doc.status}
            </span>
            <h3 style={{ margin: 0 }}>{doc.name}</h3>
          </div>
          <button type="button" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'File type', val: doc.type },
            { label: 'File size', val: doc.size },
            { label: 'Last updated', val: doc.updatedLabel },
            { label: 'Linked job', val: doc.linkedJob },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Close
          </button>
          <button
            type="button"
            onClick={() => alert(`Downloading ${doc.name}...`)}
            style={{ padding: '9px 22px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#00a884,#008f70)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 3px 10px rgba(0,168,132,0.4)' }}
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Documents() {
  const [docs, setDocs] = useState(initialDocuments);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      type: file.type.includes('image') ? 'Image set' : file.type.includes('pdf') ? 'PDF Bundle' : 'Document',
      updatedLabel: 'Updated Just now',
      status: 'Draft',
      statusKey: 'draft',
      icon: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'template',
      linkedJob: '—',
      size: `${(file.size / 1024).toFixed(0)} KB`,
    };
    setDocs(prev => [newDoc, ...prev]);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
    e.target.value = '';
  };

  const handleDelete = (id) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  };

  return (
    <>
      {/* Header */}
      <header className="portal-topbar" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div className="topbar-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00a884', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
            <PanelLeft size={14} />
            <span>DIRECT SUPPLIER WORKSPACE</span>
          </div>
          <h1 className="portal-title">Documents</h1>
        </div>
        <div className="topbar-right" style={{ maxWidth: 420 }}>
          <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
            A fixed left navigation keeps each section in its own calm, full-panel view for fast demand review, fulfillment tracking, and document control.
          </p>
        </div>
      </header>

      {/* Two-col layout matching design — dark left, white right */}
      <div className="portal-two-col-layout">

        {/* LEFT — dark hero card */}
        <section className="dark-hero-card">
          <div className="milestone-tag">DOCUMENT MANAGEMENT</div>
          <h2 className="hero-heading" style={{ fontSize: 26 }}>
            Evidence, packets, and templates.
          </h2>
          <p className="hero-desc">
            Keep delivery reports, acceptance letters, installation evidence, and commissioning files in one supplier-ready workspace.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {[
              { label: 'Total documents', val: docs.length },
              { label: 'Approved', val: docs.filter(d => d.statusKey === 'approved').length },
              { label: 'Pending review', val: docs.filter(d => d.statusKey === 'pending').length },
              { label: 'Drafts', val: docs.filter(d => d.statusKey === 'draft').length },
            ].map(s => (
              <div
                key={s.label}
                className="dark-card-inner-box"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}
              >
                <span className="box-label" style={{ margin: 0 }}>{s.label}</span>
                <span className="box-val">{s.val}</span>
              </div>
            ))}
          </div>

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleUpload}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx,.csv"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg,#00a884,#008f70)',
              color: 'white', border: 'none', borderRadius: 10,
              padding: '11px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(0,168,132,0.45)',
              transition: 'opacity 0.15s', marginTop: 'auto',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Upload size={15} />
            Upload document
          </button>

          {uploadSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 12, color: '#00a884', fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              Document uploaded successfully
            </div>
          )}
        </section>

        {/* RIGHT — white document list card */}
        <section className="portal-panel-card" style={{ gap: 0 }}>
          <div className="section-heading-sm" style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>Your files</span>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{docs.length} files</span>
          </div>

          {docs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
              <Upload size={36} style={{ marginBottom: 12, opacity: 0.5 }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: '#475569', marginBottom: 4 }}>No documents yet</div>
              <div style={{ fontSize: 13 }}>Upload your first file using the button on the left.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {docs.map((doc, idx) => {
                const st = statusStyles[doc.statusKey] || statusStyles.draft;
                return (
                  <div
                    key={doc.id}
                    className="document-item-row"
                    style={{ borderBottom: idx === docs.length - 1 ? 'none' : undefined }}
                  >
                    {/* Left: icon + info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                      <DocIcon type={doc.icon} />
                      <div style={{ minWidth: 0 }}>
                        <div className="document-item-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {doc.name}
                        </div>
                        <div className="document-item-sub">{doc.type} · {doc.updatedLabel}</div>
                      </div>
                    </div>

                    {/* Right: status badge + actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: st.bg, color: st.color, whiteSpace: 'nowrap' }}>
                        {doc.status}
                      </span>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => setSelectedDoc(doc)}
                        title="View details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => alert(`Downloading ${doc.name}...`)}
                        title="Download"
                      >
                        <Download size={14} />
                      </button>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => handleDelete(doc.id)}
                        title="Delete"
                        style={{ color: '#ef4444' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Upload CTA at bottom of card */}
          <div
            className="document-upload-dropzone"
            style={{ marginTop: 20 }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon-circle">
              <Upload size={22} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726', marginBottom: 4 }}>
              Drop files here or click to upload
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
              PDF, images, Word documents, spreadsheets
            </div>
          </div>
        </section>
      </div>

      {selectedDoc && (
        <DocDetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </>
  );
}


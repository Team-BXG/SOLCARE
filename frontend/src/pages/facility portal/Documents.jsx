import { useState, useRef } from 'react';
import FacilityHeader from './FacilityHeader';
import { UploadCloud, FileText, Download, Trash2, CheckCircle } from 'lucide-react';

function getFileIcon(name) {
  const ext = (name || '').split('.').pop().toLowerCase();
  return ext;
}

export default function Documents({ documents = [] }) {
  const [localDocs, setLocalDocs] = useState(() =>
    documents.map((d) => ({ ...d, isLocal: false }))
  );
  const [toast, setToast] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleFiles = (files) => {
    const newDocs = Array.from(files).map((file) => ({
      title: file.name,
      category: file.type || 'Document',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Uploaded',
      statusClass: 'approved',
      isLocal: true,
      fileObj: file,
    }));
    setLocalDocs((prev) => [...newDocs, ...prev]);
    showToast(`${newDocs.length} file${newDocs.length > 1 ? 's' : ''} uploaded successfully`);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = (idx) => {
    setLocalDocs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDownload = (doc) => {
    if (doc.fileObj) {
      const url = URL.createObjectURL(doc.fileObj);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.title;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      showToast('Download not available for pre-existing documents in demo mode.');
    }
  };

  return (
    <>
      <FacilityHeader />

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed', top: 24, right: 24, zIndex: 9999,
            background: '#00a884', color: 'white',
            borderRadius: 10, padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 4px 20px rgba(0,168,132,0.4)',
            fontWeight: 600, fontSize: 14,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <CheckCircle size={16} />
          {toast}
        </div>
      )}

      <div className="portal-two-col-layout" style={{ marginTop: 20 }}>
        {/* Left Column: Documents List */}
        <section className="portal-panel-card">
          <div className="panel-sub-label">DOCUMENTS</div>
          <h2 className="panel-main-title">Document center</h2>
          <p className="panel-description">
            Keep load calculations, site plans, facility layouts, and authorization letters in one review-ready panel.
          </p>

          <div style={{ marginTop: 18, border: '1px solid var(--border-light)', borderRadius: 12, overflow: 'hidden' }}>
            {localDocs.length === 0 ? (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                No documents yet. Upload your first file →
              </div>
            ) : (
              localDocs.map((doc, idx) => (
                <div key={idx} className="document-item-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <div
                      style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: '#f0fdf4', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}
                    >
                      <FileText size={16} color="#00a884" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="document-item-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>
                        {doc.title}
                      </div>
                      <div className="document-item-sub">{doc.category}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{doc.date}</span>
                    <span className={`badge-status ${doc.statusClass || 'progress'}`}>{doc.status}</span>
                    <button
                      type="button"
                      title="Download"
                      onClick={() => handleDownload(doc)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: 6, display: 'flex' }}
                    >
                      <Download size={14} />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(idx)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4, borderRadius: 6, display: 'flex' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Column: Upload Box */}
        <section className="document-upload-card">
          <div
            className="document-upload-dropzone"
            style={{
              borderColor: isDragOver ? '#00a884' : undefined,
              background: isDragOver ? '#f0fdf4' : undefined,
              transition: 'border-color 0.2s, background 0.2s',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.csv,.txt"
              style={{ display: 'none' }}
              onChange={handleInputChange}
            />
            <div className="upload-icon-circle" style={{ background: isDragOver ? '#d1fae5' : undefined }}>
              <UploadCloud size={26} color={isDragOver ? '#00a884' : undefined} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
              {isDragOver ? 'Drop files here' : 'Upload documents'}
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 260, marginBottom: 14 }}>
              Attach PDFs, spreadsheets, images, and authorization letters for demand verification.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current && fileInputRef.current.click(); }}
            >
              Choose File
            </button>
          </div>

          {/* Upload count summary */}
          {localDocs.filter(d => d.isLocal).length > 0 && (
            <div style={{
              marginTop: 16, padding: '10px 14px', borderRadius: 10,
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              fontSize: 12, color: '#065f46', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <CheckCircle size={14} color="#00a884" />
              {localDocs.filter(d => d.isLocal).length} file{localDocs.filter(d => d.isLocal).length > 1 ? 's' : ''} ready for submission
            </div>
          )}
        </section>
      </div>
    </>
  );
}

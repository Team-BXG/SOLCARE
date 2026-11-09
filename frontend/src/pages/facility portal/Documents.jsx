import FacilityHeader from './FacilityHeader';
import { UploadCloud } from 'lucide-react';

export default function Documents({ documents = [] }) {
  return (
    <>
      <FacilityHeader />

      <div className="portal-two-col-layout" style={{ marginTop: 20 }}>
        {/* Left Column: Documents List */}
        <section className="portal-panel-card">
          <div className="panel-sub-label">DOCUMENTS</div>
          <h2 className="panel-main-title">Document center</h2>
          <p className="panel-description">
            Keep load calculations, site plans, facility layouts, and authorization letters in one review-ready panel.
          </p>

          <div style={{ marginTop: 18, border: '1px solid var(--border-light)', borderRadius: 12, overflow: 'hidden' }}>
            {documents.map((doc) => (
              <div key={doc.title} className="document-item-row">
                <div>
                  <div className="document-item-title">{doc.title}</div>
                  <div className="document-item-sub">{doc.category}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{doc.date}</span>
                  <span className={`badge-status ${doc.statusClass}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Upload Box matching screenshot */}
        <section className="document-upload-card">
          <div className="document-upload-dropzone" onClick={() => alert('Document upload modal')}>
            <div className="upload-icon-circle">
              <UploadCloud size={26} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
              Upload documents
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 260, marginBottom: 14 }}>
              Attach PDFs, spreadsheets, images, and authorization letters for demand verification.
            </p>
            <button type="button" className="btn-primary" style={{ pointerEvents: 'none' }}>
              Choose File
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

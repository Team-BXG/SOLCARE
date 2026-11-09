export default function Settings() {
  return (
    <section className="portal-panel-card" style={{ maxWidth: 700 }}>
      <div className="panel-sub-label">ADMINISTRATION</div>
      <h2 className="panel-main-title">System Settings</h2>
      <p className="panel-description">
        Configure facility registries, workflow rules, and supplier procurement thresholds.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>
            Database Connection
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Configured for PostgreSQL engine (`solcare_db`) with fallback support.
          </div>
          <span className="badge-status verified">Connected: PostgreSQL</span>
        </div>

        <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>
            Automatic Technical Assessment Routing
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            Demands above 50 kWp are automatically routed to the Regional Senior Engineering Desk.
          </div>
        </div>
      </div>
    </section>
  );
}


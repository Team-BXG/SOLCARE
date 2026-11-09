export default function Reports({ demands = [] }) {
  const completedCount = demands.filter((d) => d.status === 'Completed').length;
  const inProgressCount = demands.filter((d) => d.status === 'In Progress').length;

  const statuses = [
    'Technically Assessed',
    'Under Verification',
    'Verified',
    'Released to Supplier',
    'Supplier Accepted',
    'In Progress',
    'Completed',
    'Returned',
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Analytics & Reports
        </h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Operational summary built from the active demand register.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#ffffff', borderRadius: 16, padding: '22px 24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Total Demands</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{demands.length}</div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, padding: '22px 24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Completed</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--brand-primary, #00a884)', lineHeight: 1 }}>
            {completedCount}
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, padding: '22px 24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>In Progress</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#d97706', lineHeight: 1 }}>
            {inProgressCount}
          </div>
        </div>
      </div>

      {/* Demand Count Per Status Card */}
      <section className="content-table-card">
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>
          Demand count per status
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {statuses.map((status) => {
            const count = demands.filter((d) => d.status === status).length;
            return (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{ width: 180, minWidth: 180, fontSize: 13, color: '#475569', fontWeight: 500 }}>
                  {status}
                </span>
                <div style={{ flex: 1, height: 12, background: '#f1f5f9', borderRadius: 20, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: 'var(--brand-primary, #00a884)',
                      borderRadius: 20,
                      width: `${count > 0 ? 100 : 0}%`,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
                <span style={{ minWidth: 20, fontSize: 13, fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}


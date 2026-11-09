export default function Facilities({ facilities = [] }) {
  return (
    <section className="content-table-card">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Registered Facilities</h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>All facilities currently represented in the demand registry.</p>
      </div>

      <div className="portal-table-container">
        <table className="portal-data-table">
          <thead>
            <tr>
              <th>FACILITY NAME</th>
              <th>FACILITY TYPE</th>
              <th>REGION</th>
              <th>ZONE</th>
              <th>WOREDA</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f) => (
              <tr key={f.name}>
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{f.name}</td>
                <td>{f.type}</td>
                <td>{f.region}</td>
                <td>{f.zone}</td>
                <td>{f.woreda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card-footer">
        <span>Showing {facilities.length} registered healthcare facilities</span>
        <span>Registry synchronized with Ministry of Health facility master list</span>
      </div>
    </section>
  );
}


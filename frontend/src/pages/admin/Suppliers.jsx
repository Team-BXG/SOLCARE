export default function Suppliers({ suppliers = [] }) {
  return (
    <section className="content-table-card">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Supplier Management
        </h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Supplier workload and workflow status breakdown from active assignments.
        </p>
      </div>

      <div className="portal-table-container">
        <table className="portal-data-table">
          <thead>
            <tr>
              <th>SUPPLIER NAME</th>
              <th>ASSIGNED DEMANDS</th>
              <th>STATUS BREAKDOWN</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((sup) => (
              <tr key={sup.name}>
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{sup.name}</td>
                <td style={{ fontWeight: 600 }}>{sup.assignedDemands}</td>
                <td>
                  <div className="status-breakdown-cell">
                    {sup.breakdown.map((b) => (
                      <span key={b.label} className="breakdown-pill">
                        {b.label}: {b.count}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card-footer">
        <span>Active EPC Solar Suppliers: {suppliers.length}</span>
        <span>Total Active Jobs: 5</span>
      </div>
    </section>
  );
}


import { CheckCircle2, Zap } from 'lucide-react';

export default function TechnicalAssessments({ assessments = [] }) {
  return (
    <section className="content-table-card">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Technical Assessment Status
        </h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Assessment progress, supplier assignment, and latest update by facility.
        </p>
      </div>

      <div className="portal-table-container">
        <table className="portal-data-table">
          <thead>
            <tr>
              <th>FACILITY</th>
              <th>ASSESSMENT STATUS</th>
              <th>SUPPLIER</th>
              <th>UPDATED DATE</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((item) => (
              <tr key={item.facility}>
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{item.facility}</td>
                <td>
                  <span className={`tech-status-indicator ${item.techClass}`}>
                    {item.techClass === 'complete' ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                    <span>{item.status}</span>
                  </span>
                </td>
                <td>{item.supplier}</td>
                <td>{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card-footer">
        <span>Completed: 6 | In Review: 1 | Not Started: 1 | Requires Revision: 1</span>
        <span>Updated live from Field Command Center</span>
      </div>
    </section>
  );
}


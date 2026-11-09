import FacilityHeader from './FacilityHeader';

export default function MyRequests({ requests = [], onSelectRequest }) {
  return (
    <>
      <FacilityHeader />

      <section className="portal-panel-card" style={{ marginTop: 20 }}>
        <div className="panel-sub-label">MY REQUESTS</div>
        <h2 className="panel-main-title">Submitted requests</h2>
        <p className="panel-description">
          Track all facility demand submissions and review their latest workflow status.
        </p>

        <div className="portal-table-container" style={{ marginTop: 18 }}>
          <table className="portal-data-table">
            <thead>
              <tr>
                <th>REQUEST ID</th>
                <th>REQUIREMENT SUMMARY</th>
                <th>SUBMITTED DATE</th>
                <th>STATUS</th>
                <th>LAST UPDATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="facility-cell">
                    <span className="code" style={{ fontWeight: 700, color: 'var(--brand-primary, #00a884)' }}>
                      {req.id}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{req.summary}</td>
                  <td>{req.submittedDate}</td>
                  <td>
                    <span className={`badge-status ${req.statusClass}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>{req.lastUpdated}</td>
                  <td>
                    <button
                      type="button"
                      className="link-action-btn"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--brand-primary, #00a884)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: 12,
                      }}
                      onClick={() => onSelectRequest && onSelectRequest(req)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

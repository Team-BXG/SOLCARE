import React from 'react';
import { CheckCircle2, Zap, Eye, ClipboardList } from 'lucide-react';

export default function TechnicalAssessments({ assessments = [], onSelectAssessment }) {
  return (
    <section className="content-table-card">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Technical Assessment Status
        </h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Assessment progress, supplier assignment, and latest engineering reviews. Click any facility row to inspect or update.
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
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((item) => (
              <tr
                key={item.facility + (item.demand?.id || '')}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectAssessment && onSelectAssessment(item.demand || item)}
              >
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>
                  <div>{item.facility}</div>
                  {item.demand?.id && (
                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
                      {item.demand.id}
                    </div>
                  )}
                </td>
                <td>
                  <span className={`tech-status-indicator ${item.techClass}`}>
                    {item.techClass === 'complete' ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                    <span>{item.status}</span>
                  </span>
                </td>
                <td>{item.supplier}</td>
                <td>{item.updated}</td>
                <td>
                  <button
                    type="button"
                    className="table-action-btn"
                    title="View & Perform Assessment"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectAssessment) onSelectAssessment(item.demand || item);
                    }}
                  >
                    <ClipboardList size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card-footer">
        <span>Showing {assessments.length} assessment records</span>
        <span>Updated live from Field Command Center</span>
      </div>
    </section>
  );
}

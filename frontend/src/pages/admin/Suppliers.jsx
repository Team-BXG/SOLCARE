import React from 'react';
import { Eye, Truck } from 'lucide-react';

export default function Suppliers({ suppliers = [], onSelectSupplier }) {
  return (
    <section className="content-table-card">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Supplier Management
        </h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Supplier workload and workflow status breakdown from active assignments. Click any supplier to view assigned demands and fulfillment details.
        </p>
      </div>

      <div className="portal-table-container">
        <table className="portal-data-table">
          <thead>
            <tr>
              <th>SUPPLIER NAME</th>
              <th>ASSIGNED DEMANDS</th>
              <th>STATUS BREAKDOWN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((sup) => (
              <tr
                key={sup.name}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectSupplier && onSelectSupplier(sup)}
              >
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Truck size={16} color="var(--brand-primary, #00a884)" />
                    <span>{sup.name}</span>
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{sup.assignedDemands}</td>
                <td>
                  <div className="status-breakdown-cell">
                    {sup.breakdown?.length > 0 ? (
                      sup.breakdown.map((b) => (
                        <span key={b.label} className="breakdown-pill">
                          {b.label}: {b.count}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>None assigned</span>
                    )}
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="table-action-btn"
                    title="View Supplier Dossier"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectSupplier) onSelectSupplier(sup);
                    }}
                  >
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card-footer">
        <span>Active EPC Solar Suppliers: {suppliers.length}</span>
        <span>Procurement synchronized with Ethiopian Ministry of Energy</span>
      </div>
    </section>
  );
}

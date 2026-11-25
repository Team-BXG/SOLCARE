import React, { useState } from 'react';
import FacilityHeader from './FacilityHeader';
import { Search, Eye, Edit2, Trash2 } from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';

export default function MyRequests({ onSelectRequest, onEditRequest }) {
  const { demands, deleteDemand } = useSolcare();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter demands for this facility (or display all facility requests)
  const filteredRequests = demands.filter((req) => {
    const matchesSearch =
      (req.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.facility || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.summary || req.requirement || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'newest') return (b.id || '').localeCompare(a.id || '');
    if (sortBy === 'oldest') return (a.id || '').localeCompare(b.id || '');
    if (sortBy === 'facility') return (a.facility || '').localeCompare(b.facility || '');
    return 0;
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete request ${id}?`)) {
      deleteDemand(id);
    }
  };

  return (
    <>
      <FacilityHeader />

      <section className="portal-panel-card" style={{ marginTop: 20 }}>
        <div className="panel-sub-label">MY REQUESTS</div>
        <h2 className="panel-main-title">Submitted requests</h2>
        <p className="panel-description">
          Track all facility demand submissions, search, filter, edit parameters, and review their latest workflow status.
        </p>

        {/* Search, Filter, Sort Controls */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 18, marginBottom: 16 }}>
          <div className="search-input-box" style={{ flex: '1 1 240px' }}>
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by Request ID, equipment summary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="table-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Under Verification">Under Verification</option>
            <option value="Technically Assessed">Technically Assessed</option>
            <option value="Released to Supplier">Released to Supplier</option>
            <option value="Supplier Accepted">Supplier Accepted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Returned">Returned</option>
          </select>

          <select
            className="table-filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort requests"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="facility">Sort: Facility Name</option>
          </select>
        </div>

        <div className="portal-table-container">
          <table className="portal-data-table">
            <thead>
              <tr>
                <th>REQUEST ID</th>
                <th>REQUIREMENT SUMMARY</th>
                <th>SUBMITTED DATE</th>
                <th>STATUS</th>
                <th>SUPPLY STAGE</th>
                <th>LAST UPDATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b' }}>
                    No matching demand requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="facility-cell">
                      <span className="code" style={{ fontWeight: 700, color: 'var(--brand-primary, #00a884)' }}>
                        {req.id}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                      {req.summary || req.requirement}
                    </td>
                    <td>{req.submittedDate || req.date}</td>
                    <td>
                      <span className={`badge-status ${req.statusClass || 'progress'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#334155' }}>
                        {req.supplyStage || 'Pending Review'}
                      </span>
                    </td>
                    <td>{req.lastUpdated || req.updatedDate}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          type="button"
                          className="table-action-btn"
                          title="View Details"
                          onClick={() => onSelectRequest && onSelectRequest(req)}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          className="table-action-btn"
                          title="Edit Request"
                          onClick={() => (onEditRequest ? onEditRequest(req) : onSelectRequest && onSelectRequest(req))}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="table-action-btn"
                          title="Delete Request"
                          style={{ color: '#ef4444' }}
                          onClick={(e) => handleDelete(e, req.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-card-footer" style={{ marginTop: 14 }}>
          <span>Showing {filteredRequests.length} of {demands.length} total facility requests</span>
          <span>Persistent in browser localStorage</span>
        </div>
      </section>
    </>
  );
}

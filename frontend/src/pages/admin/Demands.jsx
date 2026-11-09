import { useState } from 'react';
import {
  Search,
  Download,
  Zap,
  CheckCircle2,
  Eye,
  ClipboardList,
  Calendar,
} from 'lucide-react';

export default function Demands({
  demands = [],
  onSelectDemand,
  onExportCSV,
  isEmbedded = false,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All regions');
  const [statusFilter, setStatusFilter] = useState('All statuses');

  const filteredDemands = demands.filter((d) => {
    const matchesSearch =
      d.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All regions' || d.region.includes(regionFilter);
    const matchesStatus = statusFilter === 'All statuses' || d.status === statusFilter;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <section className="content-table-card" style={isEmbedded ? { marginTop: 10 } : {}}>
      <div className="table-card-header">
        <div className="table-title-area">
          <h3>Demand Tracking</h3>
          <p>Monitor facility submissions and workflow progress.</p>
        </div>
        <div className="table-actions-row">
          <div className="search-input-box">
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search facility or demand ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="table-filter-select"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            aria-label="Filter by region"
          >
            <option value="All regions">All regions</option>
            <option value="Sidama">Sidama</option>
            <option value="Oromia">Oromia</option>
            <option value="Amhara">Amhara</option>
            <option value="Tigray">Tigray</option>
            <option value="Dire Dawa">Dire Dawa</option>
          </select>

          <select
            className="table-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All statuses">All statuses</option>
            <option value="Technically Assessed">Technically Assessed</option>
            <option value="Under Verification">Under Verification</option>
            <option value="Verified">Verified</option>
            <option value="Released to Supplier">Released to Supplier</option>
            <option value="Supplier Accepted">Supplier Accepted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Returned">Returned</option>
          </select>

          <button
            type="button"
            className="btn-export"
            onClick={onExportCSV || (() => {})}
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="portal-table-container">
        <table className="portal-data-table">
          <thead>
            <tr>
              <th>FACILITY NAME</th>
              <th>FACILITY TYPE</th>
              <th>REGION / ZONE</th>
              <th>WOREDA</th>
              <th>REQUIREMENT</th>
              <th>CURRENT STATUS</th>
              <th>TECHNICAL ASSESSMENT</th>
              <th>SUPPLIER</th>
              <th>SUBMISSION / UPDATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredDemands.map((row) => (
              <tr key={row.id}>
                <td className="facility-cell">
                  <div className="name">{row.facility}</div>
                  <div className="code">{row.id}</div>
                </td>
                <td>{row.type}</td>
                <td>{row.regionZone}</td>
                <td>{row.woreda}</td>
                <td style={{ fontWeight: 500 }}>{row.requirement}</td>
                <td>
                  <span className={`badge-status ${row.statusClass}`}>{row.status}</span>
                </td>
                <td>
                  <span className={`tech-status-indicator ${row.techClass}`}>
                    {row.techClass === 'complete' ? <CheckCircle2 size={13} /> : <Zap size={13} />}
                    <span>{row.techAssessment}</span>
                  </span>
                </td>
                <td>{row.supplier}</td>
                <td>
                  <div>{row.date}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{row.updatedDate}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button
                      type="button"
                      className="table-action-btn"
                      title="View Demand Details"
                      onClick={() => onSelectDemand && onSelectDemand(row)}
                      aria-label={`View details for ${row.facility}`}
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      className="table-action-btn"
                      title="Assessment Checklist"
                      onClick={() => onSelectDemand && onSelectDemand(row)}
                      aria-label={`Assessment checklist for ${row.facility}`}
                    >
                      <ClipboardList size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer matching Screenshot 2 & 3 */}
      <div className="table-card-footer">
        <span>Showing {filteredDemands.length} of {demands.length} active demand records</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Calendar size={13} />
          <span>Reporting period: Q2 2024</span>
        </span>
      </div>
    </section>
  );
}


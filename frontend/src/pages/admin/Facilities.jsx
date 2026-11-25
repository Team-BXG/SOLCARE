import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';

export default function Facilities({ facilities = [], onSelectFacility }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');

  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch =
      (f.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.woreda || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All' || f.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <section className="content-table-card">
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Registered Facilities
        </h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>
          All healthcare facilities currently represented in the demand registry. Click any facility to inspect dossier and active requests.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <div className="search-input-box" style={{ flex: '1 1 240px' }}>
          <Search size={14} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search facility name or woreda..."
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
          <option value="All">All regions</option>
          <option value="Sidama">Sidama</option>
          <option value="Oromia">Oromia</option>
          <option value="Amhara">Amhara</option>
          <option value="Tigray">Tigray</option>
          <option value="Dire Dawa">Dire Dawa</option>
        </select>
      </div>

      <div className="portal-table-container">
        <table className="portal-data-table">
          <thead>
            <tr>
              <th>FACILITY NAME</th>
              <th>FACILITY LEVEL</th>
              <th>REGION</th>
              <th>ZONE</th>
              <th>WOREDA</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredFacilities.map((f) => (
              <tr
                key={f.name}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectFacility && onSelectFacility(f)}
              >
                <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{f.name}</td>
                <td>{f.type}</td>
                <td>{f.region}</td>
                <td>{f.zone || f.region}</td>
                <td>{f.woreda}</td>
                <td>
                  <button
                    type="button"
                    className="table-action-btn"
                    title="View Facility Details"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectFacility) onSelectFacility(f);
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
        <span>Showing {filteredFacilities.length} of {facilities.length} registered healthcare facilities</span>
        <span>Registry synchronized with Ministry of Health facility master list</span>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Shield,
  LayoutDashboard,
  Building2,
  FileSpreadsheet,
  ClipboardCheck,
  Truck,
  BarChart3,
  Settings,
  FileText,
  ShieldAlert,
  Gauge,
  ArrowRight,
  CheckCircle2,
  Activity,
  Check,
  Search,
  Download,
  Zap,
  Menu,
  X,
  Eye,
  ClipboardList,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All regions');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [selectedDemand, setSelectedDemand] = useState(null);

  const stats = [
    { label: 'Total Facilities', value: '48', trend: '↑ 8% vs last month', up: true, icon: Building2, color: 'blue' },
    { label: 'Total Demands', value: '134', trend: '↑ 12% vs last month', up: true, icon: FileText, color: 'blue' },
    { label: 'Pending Verification', value: '12', trend: '↓ 4% vs last month', up: false, icon: ShieldAlert, color: 'amber' },
    { label: 'Under Technical Assessment', value: '8', trend: '↑ 3% vs last month', up: true, icon: Gauge, color: 'amber' },
    { label: 'Technically Assessed', value: '23', trend: '↑ 6% vs last month', up: true, icon: ClipboardCheck, color: 'teal' },
    { label: 'Sent to Suppliers', value: '19', trend: '↑ 9% vs last month', up: true, icon: ArrowRight, color: 'teal' },
    { label: 'Accepted by Suppliers', value: '11', trend: '↑ 5% vs last month', up: true, icon: CheckCircle2, color: 'teal' },
    { label: 'In Progress', value: '9', trend: '↓ 2% vs last month', up: false, icon: Activity, color: 'blue' },
    { label: 'Completed', value: '47', trend: '↑ 14% vs last month', up: true, icon: Check, color: 'green' },
  ];

  // 8 Registered Facilities matching screenshot 1
  const facilities = [
    { name: 'Hawassa General Hospital', type: 'General Hospital', region: 'Sidama', zone: 'Hawassa', woreda: 'Hawassa City' },
    { name: 'Jimma Health Center', type: 'Health Center', region: 'Oromia', zone: 'Jimma', woreda: 'Jimma Town' },
    { name: 'Bahir Dar Clinic', type: 'Primary Clinic', region: 'Amhara', zone: 'West Gojjam', woreda: 'Bahir Dar' },
    { name: 'Mekelle Referral Hospital', type: 'Referral Hospital', region: 'Tigray', zone: 'Central Tigray', woreda: 'Mekelle' },
    { name: 'Adama Medical Center', type: 'Medical Center', region: 'Oromia', zone: 'East Shewa', woreda: 'Adama' },
    { name: 'Gondar University Hospital', type: 'Teaching Hospital', region: 'Amhara', zone: 'North Gondar', woreda: 'Gondar' },
    { name: 'Dire Dawa Regional Hospital', type: 'Regional Hospital', region: 'Dire Dawa', zone: 'Dire Dawa', woreda: 'Dire Dawa' },
    { name: 'Dessie Health Center', type: 'Health Center', region: 'Amhara', zone: 'South Wollo', woreda: 'Dessie' },
  ];

  // 8 Demand Records matching screenshots 2 & 3
  const demands = [
    {
      id: 'SED-24081',
      facility: 'Hawassa General Hospital',
      type: 'General Hospital',
      region: 'Sidama',
      regionZone: 'Sidama Hawassa',
      woreda: 'Hawassa City',
      requirement: '250 kWp solar PV + battery',
      status: 'Technically Assessed',
      statusClass: 'assessed',
      techAssessment: 'Complete',
      techClass: 'complete',
      supplier: 'SunGrid Ethiopia',
      date: '12 May 2024',
      updatedDate: 'Updated 28 May 2024',
    },
    {
      id: 'SED-24079',
      facility: 'Jimma Health Center',
      type: 'Health Center',
      region: 'Oromia',
      regionZone: 'Oromia Jimma',
      woreda: 'Jimma Town',
      requirement: '80 kWp solar PV system',
      status: 'Under Verification',
      statusClass: 'pending',
      techAssessment: 'Not Started',
      techClass: 'not-started',
      supplier: '—',
      date: '19 May 2024',
      updatedDate: 'Updated 27 May 2024',
    },
    {
      id: 'SED-24076',
      facility: 'Bahir Dar Clinic',
      type: 'Primary Clinic',
      region: 'Amhara',
      regionZone: 'Amhara West Gojjam',
      woreda: 'Bahir Dar',
      requirement: '45 kWp hybrid solar system',
      status: 'Verified',
      statusClass: 'verified',
      techAssessment: 'In Review',
      techClass: 'in-review',
      supplier: '—',
      date: '08 May 2024',
      updatedDate: 'Updated 25 May 2024',
    },
    {
      id: 'SED-24072',
      facility: 'Mekelle Referral Hospital',
      type: 'Referral Hospital',
      region: 'Tigray',
      regionZone: 'Tigray Central Tigray',
      woreda: 'Mekelle',
      requirement: '400 kWp solar PV + storage',
      status: 'Released to Supplier',
      statusClass: 'open',
      techAssessment: 'Complete',
      techClass: 'complete',
      supplier: 'Ethiopian Solar Works',
      date: '02 May 2024',
      updatedDate: 'Updated 24 May 2024',
    },
    {
      id: 'SED-24069',
      facility: 'Adama Medical Center',
      type: 'Medical Center',
      region: 'Oromia',
      regionZone: 'Oromia East Shewa',
      woreda: 'Adama',
      requirement: '120 kWp rooftop PV',
      status: 'Supplier Accepted',
      statusClass: 'assessed',
      techAssessment: 'Complete',
      techClass: 'complete',
      supplier: 'GreenRay Energy',
      date: '28 Apr 2024',
      updatedDate: 'Updated 23 May 2024',
    },
    {
      id: 'SED-24064',
      facility: 'Gondar University Hospital',
      type: 'Teaching Hospital',
      region: 'Amhara',
      regionZone: 'Amhara North Gondar',
      woreda: 'Gondar',
      requirement: '350 kWp PV + 900 kWh battery',
      status: 'In Progress',
      statusClass: 'progress',
      techAssessment: 'Complete',
      techClass: 'complete',
      supplier: 'Bright Solar PLC',
      date: '21 Apr 2024',
      updatedDate: 'Updated 22 May 2024',
    },
    {
      id: 'SED-24058',
      facility: 'Dire Dawa Regional Hospital',
      type: 'Regional Hospital',
      region: 'Dire Dawa',
      regionZone: 'Dire Dawa Dire Dawa',
      woreda: 'Dire Dawa',
      requirement: '200 kWp solar PV system',
      status: 'Completed',
      statusClass: 'completed',
      techAssessment: 'Complete',
      techClass: 'complete',
      supplier: 'SunGrid Ethiopia',
      date: '02 Apr 2024',
      updatedDate: 'Updated 17 May 2024',
    },
    {
      id: 'SED-24051',
      facility: 'Dessie Health Center',
      type: 'Health Center',
      region: 'Amhara',
      regionZone: 'Amhara South Wollo',
      woreda: 'Dessie',
      requirement: '60 kWp solar PV + water pump',
      status: 'Returned',
      statusClass: 'progress',
      techAssessment: 'Requires Revision',
      techClass: 'revision',
      supplier: '—',
      date: '30 Mar 2024',
      updatedDate: 'Updated 15 May 2024',
    },
  ];

  // 8 Technical Assessment items matching screenshot 4
  const technicalAssessments = [
    { facility: 'Hawassa General Hospital', status: 'Complete', techClass: 'complete', supplier: 'SunGrid Ethiopia', updated: '28 May 2024' },
    { facility: 'Jimma Health Center', status: 'Not Started', techClass: 'not-started', supplier: '—', updated: '27 May 2024' },
    { facility: 'Bahir Dar Clinic', status: 'In Review', techClass: 'in-review', supplier: '—', updated: '25 May 2024' },
    { facility: 'Mekelle Referral Hospital', status: 'Complete', techClass: 'complete', supplier: 'Ethiopian Solar Works', updated: '24 May 2024' },
    { facility: 'Adama Medical Center', status: 'Complete', techClass: 'complete', supplier: 'GreenRay Energy', updated: '23 May 2024' },
    { facility: 'Gondar University Hospital', status: 'Complete', techClass: 'complete', supplier: 'Bright Solar PLC', updated: '22 May 2024' },
    { facility: 'Dire Dawa Regional Hospital', status: 'Complete', techClass: 'complete', supplier: 'SunGrid Ethiopia', updated: '17 May 2024' },
    { facility: 'Dessie Health Center', status: 'Requires Revision', techClass: 'revision', supplier: '—', updated: '15 May 2024' },
  ];

  // 4 Supplier management records matching screenshot 5
  const suppliers = [
    {
      name: 'SunGrid Ethiopia',
      assignedDemands: 2,
      breakdown: [
        { label: 'Technically Assessed', count: 1 },
        { label: 'Completed', count: 1 },
      ],
    },
    {
      name: 'Ethiopian Solar Works',
      assignedDemands: 1,
      breakdown: [
        { label: 'Released to Supplier', count: 1 },
      ],
    },
    {
      name: 'GreenRay Energy',
      assignedDemands: 1,
      breakdown: [
        { label: 'Supplier Accepted', count: 1 },
      ],
    },
    {
      name: 'Bright Solar PLC',
      assignedDemands: 1,
      breakdown: [
        { label: 'In Progress', count: 1 },
      ],
    },
  ];

  const filteredDemands = demands.filter((d) => {
    const matchesSearch =
      d.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All regions' || d.region.includes(regionFilter);
    const matchesStatus = statusFilter === 'All statuses' || d.status === statusFilter;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'facilities': return 'ADMINISTRATION / FACILITIES';
      case 'demands': return 'ADMINISTRATION / DEMANDS';
      case 'technical': return 'ADMINISTRATION / TECHNICAL ASSESSMENTS';
      case 'suppliers': return 'ADMINISTRATION / SUPPLIERS';
      case 'reports': return 'ADMINISTRATION / REPORTS';
      case 'settings': return 'ADMINISTRATION / SETTINGS';
      default: return 'ADMINISTRATION / DASHBOARD';
    }
  };

  const handleExportCSV = () => {
    const headers = ['Facility Name', 'Facility ID', 'Type', 'Region/Zone', 'Woreda', 'Requirement', 'Current Status', 'Technical Assessment', 'Supplier', 'Submission Date', 'Updated Date'];
    const rows = filteredDemands.map(d => [
      d.facility, d.id, d.type, d.regionZone, d.woreda, d.requirement, d.status, d.techAssessment, d.supplier, d.date, d.updatedDate
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SOLCARE_Demands_Registry.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="portal-layout">
      {/* Mobile Top Bar */}
      <div className="mobile-header-bar">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
        <div className="mobile-brand-title">
          <span>Admin Portal</span>
          <span className="mobile-portal-badge">Admin</span>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`portal-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation menu"
        >
          <X size={18} />
        </button>

        <div className="sidebar-header">
          <div className="brand-badge">
            <div className="brand-icon-box yellow">
              <Sun size={22} />
            </div>
            <div className="brand-text">
              <h2>Hospital Solar Demand Tracking System</h2>
            </div>
          </div>
          <div className="role-badge">
            <Shield size={12} />
            <span>Administrator</span>
          </div>
        </div>

        <div className="sidebar-section-title">WORKSPACE</div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
          >
            {activeTab === 'dashboard' && <span className="active-dot" />}
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'facilities' ? 'active' : ''}`}
            onClick={() => { setActiveTab('facilities'); setSidebarOpen(false); }}
          >
            {activeTab === 'facilities' && <span className="active-dot" />}
            <Building2 size={16} />
            <span>Facilities</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'demands' ? 'active' : ''}`}
            onClick={() => { setActiveTab('demands'); setSidebarOpen(false); }}
          >
            {activeTab === 'demands' && <span className="active-dot" />}
            <FileSpreadsheet size={16} />
            <span>Demands</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => { setActiveTab('technical'); setSidebarOpen(false); }}
          >
            {activeTab === 'technical' && <span className="active-dot" />}
            <ClipboardCheck size={16} />
            <span>Technical Assessments</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'suppliers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('suppliers'); setSidebarOpen(false); }}
          >
            {activeTab === 'suppliers' && <span className="active-dot" />}
            <Truck size={16} />
            <span>Suppliers</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => { setActiveTab('reports'); setSidebarOpen(false); }}
          >
            {activeTab === 'reports' && <span className="active-dot" />}
            <BarChart3 size={16} />
            <span>Reports</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
          >
            {activeTab === 'settings' && <span className="active-dot" />}
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom Switch Portal Links (Matching Screenshot 1 & 2) */}
        <div className="sidebar-switch-portal">
          <div className="switch-portal-title">SWITCH PORTAL</div>
          <Link to="/facility-portal" className="switch-portal-link" onClick={() => setSidebarOpen(false)}>
            <span>Facility Portal</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/engineer" className="switch-portal-link" onClick={() => setSidebarOpen(false)}>
            <span>Tech Module</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/supplier-portal" className="switch-portal-link" onClick={() => setSidebarOpen(false)}>
            <span>Supplier Portal</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        {/* Topbar */}
        <header className="portal-topbar">
          <div className="topbar-left">
            <div className="breadcrumb">{getBreadcrumb()}</div>
            <h1 className="portal-title">Admin Dashboard</h1>
          </div>
          <div className="topbar-right">
            <div className="user-profile-pill">
              <div className="profile-avatar-circle">AK</div>
              <div className="profile-details">
                <div className="name">Amanuel K.</div>
                <div className="role">System Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD (Overview with 9 cards + Demands preview)                 */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>System overview</h2>
                <p style={{ fontSize: 13, color: '#64748b' }}>A live view of solar demand across registered facilities.</p>
              </div>
              <div className="status-timestamp-pill">
                <span className="pulse-dot" />
                <span>Updated 30 May 2024, 09:42 EAT</span>
              </div>
            </div>

            {/* 9 Metric Cards Grid */}
            <div className="admin-stats-grid">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="stat-metric-card">
                    <div className="stat-metric-info">
                      <div className="stat-label">{s.label}</div>
                      <div className="stat-value">{s.value}</div>
                      <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>{s.trend}</div>
                    </div>
                    <div className={`stat-icon-wrapper ${s.color}`}>
                      <Icon size={18} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: REGISTERED FACILITIES (Matching Screenshot 1)                      */}
        {/* ========================================================================= */}
        {activeTab === 'facilities' && (
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
                    <th>TYPE</th>
                    <th>REGION</th>
                    <th>ZONE</th>
                    <th>WOREDA</th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.map((fac) => (
                    <tr key={fac.name}>
                      <td style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{fac.name}</td>
                      <td>{fac.type}</td>
                      <td>{fac.region}</td>
                      <td>{fac.zone}</td>
                      <td>{fac.woreda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card-footer">
              <span>Showing {facilities.length} registered health facilities across Ethiopia</span>
              <span>Regional Coverage: 5 Regions</span>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DEMANDS (Matching Screenshots 2 & 3)                               */}
        {/* (Also shown on the main dashboard view)                                   */}
        {/* ========================================================================= */}
        {(activeTab === 'demands' || activeTab === 'dashboard') && (
          <section className="content-table-card" style={activeTab === 'dashboard' ? { marginTop: 10 } : {}}>
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

                <button type="button" className="btn-export" onClick={handleExportCSV}>
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
                            onClick={() => setSelectedDemand(row)}
                            aria-label={`View details for ${row.facility}`}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            className="table-action-btn"
                            title="Assessment Checklist"
                            onClick={() => setSelectedDemand(row)}
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
        )}

        {/* ========================================================================= */}
        {/* TAB 4: TECHNICAL ASSESSMENTS (Matching Screenshot 4)                      */}
        {/* ========================================================================= */}
        {activeTab === 'technical' && (
          <section className="content-table-card">
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Technical Assessment Status</h2>
              <p style={{ fontSize: 13, color: '#64748b' }}>Assessment progress, supplier assignment, and latest update by facility.</p>
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
                  {technicalAssessments.map((item) => (
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
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SUPPLIERS (Matching Screenshot 5)                                  */}
        {/* ========================================================================= */}
        {activeTab === 'suppliers' && (
          <section className="content-table-card">
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Supplier Management</h2>
              <p style={{ fontSize: 13, color: '#64748b' }}>Supplier workload and workflow status breakdown from active assignments.</p>
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
              <span>Active EPC Solar Suppliers: 4</span>
              <span>Total Active Jobs: 5</span>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: REPORTS (Matching Screenshot)                                      */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Analytics & Reports</h2>
              <p style={{ fontSize: 13, color: '#64748b' }}>Operational summary built from the active demand register.</p>
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
                  {demands.filter(d => d.status === 'Completed').length}
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: 16, padding: '22px 24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>In Progress</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#d97706', lineHeight: 1 }}>
                  {demands.filter(d => d.status === 'In Progress').length}
                </div>
              </div>
            </div>

            {/* Demand Count Per Status Card */}
            <section className="content-table-card">
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>
                Demand count per status
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  'Technically Assessed',
                  'Under Verification',
                  'Verified',
                  'Released to Supplier',
                  'Supplier Accepted',
                  'In Progress',
                  'Completed',
                  'Returned',
                ].map((status) => {
                  const count = demands.filter(d => d.status === status).length;
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
        )}

        {/* ========================================================================= */}
        {/* TAB 7: SETTINGS                                                           */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <section className="portal-panel-card" style={{ maxWidth: 700 }}>
            <div className="panel-sub-label">ADMINISTRATION</div>
            <h2 className="panel-main-title">System Settings</h2>
            <p className="panel-description">Configure facility registries, workflow rules, and supplier procurement thresholds.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>Database Connection</div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Configured for PostgreSQL engine (`solcare_db`) with fallback support.</div>
                <span className="badge-status verified">Connected: PostgreSQL</span>
              </div>

              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>Automatic Technical Assessment Routing</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Demands above 50 kWp are automatically routed to the Regional Senior Engineering Desk.</div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ========================================================================= */}
      {/* DEMAND DETAIL MODAL                                                       */}
      {/* ========================================================================= */}
      {selectedDemand && (
        <div className="portal-modal-overlay" onClick={() => setSelectedDemand(null)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary, #00a884)', letterSpacing: 0.8 }}>
                  DEMAND SPECIFICATION
                </span>
                <h3>{selectedDemand.facility}</h3>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
                  {selectedDemand.id} • {selectedDemand.type}
                </span>
              </div>
              <button
                type="button"
                className="sidebar-close-btn"
                style={{ position: 'static', display: 'flex' }}
                onClick={() => setSelectedDemand(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>REGION / WOREDA</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{selectedDemand.regionZone}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{selectedDemand.woreda}</div>
                </div>

                <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>WORKFLOW STATUS</div>
                  <div style={{ marginTop: 4 }}>
                    <span className={`badge-status ${selectedDemand.statusClass}`}>{selectedDemand.status}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 4 }}>SYSTEM REQUIREMENT</div>
                <div style={{ padding: 12, background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: 10, color: '#0f766e', fontWeight: 700, fontSize: 14 }}>
                  {selectedDemand.requirement}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 4 }}>TECHNICAL ASSESSMENT</div>
                  <div className={`tech-status-indicator ${selectedDemand.techClass}`} style={{ fontSize: 13 }}>
                    {selectedDemand.techClass === 'complete' ? <CheckCircle2 size={15} /> : <Zap size={15} />}
                    <span>{selectedDemand.techAssessment}</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 4 }}>ASSIGNED SUPPLIER</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{selectedDemand.supplier}</div>
                </div>
              </div>

              <div style={{ padding: 12, background: '#fffbeb', borderRadius: 10, border: '1px solid #fef3c7', fontSize: 12, color: '#92400e', display: 'flex', gap: 8, alignItems: 'center' }}>
                <AlertTriangle size={16} />
                <span>Critical loads protected: ICU, Operating Room, Blood Bank & Laboratory.</span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', color: '#334155', fontWeight: 600, fontSize: 12 }}
                onClick={() => setSelectedDemand(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-export"
                onClick={() => {
                  alert(`Verification report generated for ${selectedDemand.facility} (${selectedDemand.id})`);
                }}
              >
                <span>Generate Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

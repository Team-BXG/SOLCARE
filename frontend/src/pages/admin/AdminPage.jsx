import { useState } from 'react';
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
} from 'lucide-react';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All regions');
  const [statusFilter, setStatusFilter] = useState('All statuses');

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

  const demands = [
    {
      id: 'SED-24081',
      facility: 'Hawassa General Hospital',
      type: 'General Hospital',
      region: 'Sidama Hawassa',
      woreda: 'Hawassa City',
      requirement: '250 kWp solar PV + battery',
      status: 'Technically Assessed',
      statusClass: 'assessed',
      techAssessment: 'Complete',
      techClass: 'complete',
      supplier: 'SunGrid Ethiopia',
      date: '12 May 2024',
      dateSub: 'Updated 2024',
    },
    {
      id: 'SED-24079',
      facility: 'Jimma Health Center',
      type: 'Health Center',
      region: 'Oromia Jimma',
      woreda: 'Jimma Town',
      requirement: '80 kWp solar PV system',
      status: 'Under Verification',
      statusClass: 'pending',
      techAssessment: 'Not Started',
      techClass: 'not-started',
      supplier: '—',
      date: '19 May 2024',
      dateSub: 'Updated 2024',
    },
    {
      id: 'SED-24065',
      facility: 'Bahir Dar Clinic',
      type: 'Primary Clinic',
      region: 'Amhara West',
      woreda: 'Bahir Dar',
      requirement: '45 kWp hybrid solar system',
      status: 'Verified',
      statusClass: 'verified',
      techAssessment: 'In Review',
      techClass: 'in-review',
      supplier: '—',
      date: '08 May 2024',
      dateSub: 'Updated 2024',
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
          <a href="#dashboard" className="nav-item active" onClick={() => setSidebarOpen(false)}>
            <span className="active-dot" />
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </a>
          <a href="#facilities" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Building2 size={16} />
            <span>Facilities</span>
          </a>
          <a href="#demands" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <FileSpreadsheet size={16} />
            <span>Demands</span>
          </a>
          <a href="#technical" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <ClipboardCheck size={16} />
            <span>Technical Assessments</span>
          </a>
          <a href="#suppliers" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Truck size={16} />
            <span>Suppliers</span>
          </a>
          <a href="#reports" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <BarChart3 size={16} />
            <span>Reports</span>
          </a>
          <a href="#settings" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Settings size={16} />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        {/* Topbar */}
        <header className="portal-topbar">
          <div className="topbar-left">
            <div className="breadcrumb">ADMINISTRATION / DASHBOARD</div>
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

        {/* System Overview Subheader */}
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

        {/* Demand Tracking Table Card */}
        <section className="content-table-card">
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
              >
                <option value="All regions">All regions</option>
                <option value="Sidama">Sidama</option>
                <option value="Oromia">Oromia</option>
                <option value="Amhara">Amhara</option>
              </select>

              <select
                className="table-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All statuses">All statuses</option>
                <option value="Technically Assessed">Technically Assessed</option>
                <option value="Under Verification">Under Verification</option>
                <option value="Verified">Verified</option>
              </select>

              <button type="button" className="btn-export">
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
                  <th>SUBMISSION UPDATED</th>
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
                    <td>{row.region}</td>
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
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{row.dateSub}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

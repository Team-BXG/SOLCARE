import { useState } from 'react';
import {
  Zap,
  LayoutDashboard,
  Briefcase,
  Layers,
  CheckCircle2,
  FolderOpen,
  PanelLeft,
  Menu,
  X,
} from 'lucide-react';

export default function SupplierPortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fulfillmentStats = [
    { label: 'OPEN OPPORTUNITIES', value: '2', hint: 'Ready to claim' },
    { label: 'ACTIVE JOBS', value: '1', hint: 'Accepted or in progress' },
    { label: 'COMPLETED', value: '1', hint: 'Closed with ratings' },
    { label: 'DOCUMENTS', value: '3', hint: 'Managed files' },
  ];

  const recentActivity = [
    {
      reqId: 'REQ-2025-008',
      status: 'Open',
      statusClass: 'open',
      title: 'Gondar University Hospital Solar Resilience Upgrade',
      desc: 'Released by administration after technical assessment.',
    },
    {
      reqId: 'REQ-2025-014',
      status: 'Open',
      statusClass: 'open',
      title: 'Bahir Dar Regional Blood Bank Backup Power',
      desc: 'New opportunity matched to supplier logistics coverage.',
    },
    {
      reqId: 'REQ-2025-003',
      status: 'In Progress',
      statusClass: 'progress',
      title: 'Jimma Outpatient Wing Installation',
      desc: 'Equipment staging confirmed; delivery route assigned.',
    },
    {
      reqId: 'REQ-2025-001',
      status: 'Completed',
      statusClass: 'completed',
      title: 'Adama Emergency Department Power Stabilization',
      desc: 'Completion report approved with excellent handover score.',
    },
  ];

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
          <span>Supplier Portal</span>
          <span className="mobile-portal-badge">Supplier</span>
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
            <div className="brand-icon-box cyan">
              <Zap size={20} />
            </div>
            <div className="brand-text">
              <h2>SUPPLIER PORTAL</h2>
              <p>Hospital Solar Fulfillment</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active-white" onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard size={16} />
            <div className="nav-item-subtext">
              <span>Dashboard</span>
              <span className="sub">Overview</span>
            </div>
          </a>
          <a href="#demands" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Briefcase size={16} />
            <div className="nav-item-subtext">
              <span>Available Demands</span>
              <span className="sub">Claim work</span>
            </div>
          </a>
          <a href="#active-jobs" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Layers size={16} />
            <div className="nav-item-subtext">
              <span>My Active Jobs</span>
              <span className="sub">In motion</span>
            </div>
          </a>
          <a href="#completed" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <CheckCircle2 size={16} />
            <div className="nav-item-subtext">
              <span>Completed</span>
              <span className="sub">History</span>
            </div>
          </a>
          <a href="#documents" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <FolderOpen size={16} />
            <div className="nav-item-subtext">
              <span>Documents</span>
              <span className="sub">Files</span>
            </div>
          </a>
        </nav>

        {/* Operating As Card at Sidebar Bottom */}
        <div className="sidebar-bottom">
          <div className="user-identity-card" style={{ marginBottom: 0 }}>
            <div className="user-identity-info">
              <div className="sub-label">OPERATING AS</div>
              <div className="user-name" style={{ fontSize: 13 }}>EthioSolar Solutions PLC</div>
              <div className="user-desc" style={{ fontSize: 10, marginTop: 2 }}>Direct access enabled · no authentication gate</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        {/* Topbar */}
        <header className="portal-topbar" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div className="topbar-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00a884', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
              <PanelLeft size={14} />
              <span>DIRECT SUPPLIER WORKSPACE</span>
            </div>
            <h1 className="portal-title">Dashboard</h1>
          </div>
          <div className="topbar-right" style={{ maxWidth: 450 }}>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
              A fixed left navigation keeps each section in its own calm, full-panel view for fast demand review, fulfillment tracking, and document control.
            </p>
          </div>
        </header>

        {/* Two-Column Grid */}
        <div className="portal-two-col-layout">
          {/* Left Dark Card */}
          <section className="dark-hero-card">
            <div className="milestone-tag">OVERVIEW STATS</div>
            <h2 className="hero-heading" style={{ fontSize: 32 }}>Fulfillment at a glance.</h2>

            <div className="dark-stats-grid-2x2">
              {fulfillmentStats.map((stat) => (
                <div key={stat.label} className="dark-stat-cell">
                  <div className="stat-title">{stat.label}</div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-hint">{stat.hint}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Right White Card */}
          <section className="portal-panel-card">
            <h3 className="section-heading-sm" style={{ fontSize: 18, marginBottom: 20 }}>
              Recent activity
            </h3>

            <div>
              {recentActivity.map((act) => (
                <div key={act.reqId} className="activity-card-item">
                  <div className="activity-card-header">
                    <span className="req-id">{act.reqId}</span>
                    <span className={`badge-status ${act.statusClass}`}>{act.status}</span>
                  </div>
                  <div className="item-title">{act.title}</div>
                  <div className="item-desc">{act.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

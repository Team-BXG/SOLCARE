import { useState } from 'react';
import {
  Sun,
  Building2,
  LayoutDashboard,
  User,
  FilePlus,
  ListTodo,
  FolderOpen,
  Bell,
  LogOut,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react';

export default function FacilityPortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const horizontalStats = [
    { label: 'ACTIVE REQUESTS', value: '03', sub: 'Two under technical review' },
    { label: 'APPROVED CAPACITY', value: '35kWp', sub: 'Ready for supplier release' },
    { label: 'DOCUMENTS', value: '12', sub: 'Four uploaded this month' },
    { label: 'CRITICAL LOAD', value: '25kW', sub: 'ICU, OR, laboratory protected' },
  ];

  const activities = [
    {
      date: 'JAN 22',
      title: '35kWp system technically assessed',
      desc: 'Supplier release is the next workflow milestone for REQ-2025-001.',
    },
    {
      date: 'JAN 18',
      title: 'Supporting documents reviewed',
      desc: 'Load calculation and site plan were verified by the assessment team.',
    },
    {
      date: 'JAN 10',
      title: 'New demand submitted',
      desc: 'Solar demand for ICU, OR, laboratory, and emergency loads entered review.',
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
          <span>Facility Portal</span>
          <span className="mobile-portal-badge">Facility</span>
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
              <Sun size={22} />
            </div>
            <div className="brand-text">
              <h2>Hospital Solar Portal</h2>
              <p>Demand tracking system</p>
            </div>
          </div>
        </div>

        {/* User Identity Card */}
        <div className="user-identity-card">
          <div className="user-identity-avatar">
            <Building2 size={18} />
          </div>
          <div className="user-identity-info">
            <div className="sub-label">Signed in as</div>
            <div className="user-name">Facility User</div>
            <div className="user-desc">Hawassa General Hospital</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active" onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard size={16} />
            <span>My Dashboard</span>
          </a>
          <a href="#profile" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <User size={16} />
            <span>My Profile</span>
          </a>
          <a href="#submit" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <FilePlus size={16} />
            <span>Submit Demand</span>
          </a>
          <a href="#requests" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <ListTodo size={16} />
            <span>My Requests</span>
          </a>
          <a href="#documents" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <FolderOpen size={16} />
            <span>Documents</span>
          </a>
          <a href="#notifications" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <Bell size={16} />
            <span>Notifications</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <button type="button" className="logout-btn">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        {/* Top Banner Card */}
        <section className="banner-workspace-card">
          <div>
            <div className="sub-header">HAWASSA GENERAL HOSPITAL</div>
            <h2>Facility demand workspace</h2>
            <p>Switch between portal pages from the fixed sidebar. Each panel opens independently without scrolling through a long dashboard.</p>
          </div>
          <div className="header-badge-pill verified">
            <CheckCircle size={14} />
            <span>VERIFIED FACILITY</span>
          </div>
        </section>

        {/* Split Two-Column Grid */}
        <div className="portal-two-col-layout">
          {/* Left White Panel */}
          <section className="portal-panel-card">
            <div className="panel-sub-label">MY DASHBOARD</div>
            <h2 className="panel-main-title">Solar demand at a glance</h2>
            <p className="panel-description">
              A clean overview of active requests, current workflow status, document readiness, and critical load coverage for the facility.
            </p>

            {/* Horizontal Stats Row */}
            <div className="horizontal-stats-row">
              {horizontalStats.map((stat) => (
                <div key={stat.label} className="horizontal-stat-box">
                  <div className="label">{stat.label}</div>
                  <div className="value">{stat.value}</div>
                  <div className="sub">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <h3 className="section-heading-sm">Recent activity</h3>
            <div className="timeline-list">
              {activities.map((item) => (
                <div key={item.date + item.title} className="timeline-item">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-content">
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Dark Card */}
          <section className="dark-hero-card">
            <div className="milestone-tag">CURRENT MILESTONE</div>
            <h2 className="hero-heading">Technically assessed</h2>
            <p className="hero-desc">
              REQ-2025-001 has completed technical assessment. Supplier release is the next expected step.
            </p>

            <div className="dark-card-inner-box">
              <div className="box-label">Primary request</div>
              <div className="box-val">35kWp Solar System</div>
            </div>

            <div className="dark-card-inner-box">
              <div className="box-label">Critical departments</div>
              <div className="box-val">ICU, Operating Room, Laboratory, Emergency</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

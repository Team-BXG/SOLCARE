import { useState } from 'react';
import {
  Sun,
  Wrench,
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  BarChart3,
  LogOut,
  TrendingUp,
  Calendar,
  Clock,
  Menu,
  X,
} from 'lucide-react';

export default function EngineerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const overviewStats = [
    { label: 'OPEN DEMAND', value: '18', desc: '4 high priority facilities' },
    { label: 'DUE THIS WEEK', value: '7', desc: 'Sidama and Oromia cluster' },
    { label: 'AVG. READINESS', value: '82%', desc: 'Across completed assessments' },
    { label: 'RECOMMENDED CAPACITY', value: '412 kWp', desc: 'Approved technical sizing' },
  ];

  const upcomingAssessments = [
    {
      facility: 'Hawassa General Hospital',
      region: 'Sidama',
      scope: '35 kWp review',
      time: 'Today · 11:30',
      active: true,
    },
    {
      facility: 'Gondar University Hospital',
      region: 'Amhara',
      scope: '60 kWp design brief',
      time: 'Tomorrow · 09:00',
      active: false,
    },
    {
      facility: 'Jimma Health Center',
      region: 'Oromia',
      scope: '15 kWp validation',
      time: 'Fri · 14:00',
      active: false,
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
          <span>Engineer Portal</span>
          <span className="mobile-portal-badge">Engineer</span>
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
              <h2>SOLAR DEMAND</h2>
              <p>Technical Assessment Module</p>
            </div>
          </div>
        </div>

        {/* Engineer User Card */}
        <div className="user-identity-card">
          <div className="user-identity-avatar">
            <Wrench size={18} />
          </div>
          <div className="user-identity-info">
            <div className="sub-label">TECHNICAL PROFESSIONAL</div>
            <div className="user-name">Eng. Solomon Bekele</div>
            <div className="user-desc">Assessment desk · Ethiopia</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active" onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard size={16} />
            <span>My Dashboard</span>
          </a>
          <a href="#queue" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <ClipboardList size={16} />
            <span>Assessment Queue</span>
            <span className="nav-item-badge">4</span>
          </a>
          <a href="#completed" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <CheckCircle2 size={16} />
            <span>Completed Assessments</span>
          </a>
          <a href="#reports" className="nav-item" onClick={() => setSidebarOpen(false)}>
            <BarChart3 size={16} />
            <span>Reports</span>
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
        {/* Topbar */}
        <header className="portal-topbar">
          <div className="topbar-left">
            <div className="breadcrumb">FIELD COMMAND CENTER</div>
            <h1 className="portal-title">My Dashboard</h1>
            <p className="portal-subtitle">A calm daily overview for demand load, deadlines, and upcoming site decisions.</p>
          </div>
          <div className="topbar-right">
            <div className="header-badge-pill dark">
              <Clock size={12} style={{ color: '#00a884' }} />
              <span>TODAY • Jan 18 · 7 open decisions</span>
            </div>
          </div>
        </header>

        {/* Two-Column Equal Grid */}
        <div className="portal-two-col-equal">
          {/* Overview Stats Card */}
          <section className="portal-panel-card">
            <div className="section-heading-sm">
              <span style={{ fontSize: 18, fontWeight: 800 }}>Overview stats</span>
              <TrendingUp size={18} color="#00a884" />
            </div>

            <div className="light-stats-grid-2x2">
              {overviewStats.map((stat) => (
                <div key={stat.label} className="light-stat-box">
                  <div className="title">{stat.label}</div>
                  <div className="num">{stat.value}</div>
                  <div className="desc">{stat.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Assessments Card */}
          <section className="portal-panel-card">
            <div className="section-heading-sm">
              <span style={{ fontSize: 18, fontWeight: 800 }}>Upcoming assessments</span>
              <Calendar size={18} color="#64748b" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              {upcomingAssessments.map((item) => (
                <div
                  key={item.facility}
                  className="activity-card-item"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}
                >
                  <div>
                    <div className="item-title">{item.facility}</div>
                    <div className="item-desc">{item.region} · {item.scope}</div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      background: item.active ? '#eff6ff' : '#f1f5f9',
                      color: item.active ? '#1d4ed8' : '#475569',
                      padding: '4px 10px',
                      borderRadius: 16,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

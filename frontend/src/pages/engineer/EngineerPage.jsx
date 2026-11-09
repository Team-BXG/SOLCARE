import { useState } from 'react';
import EngineerSidebar from './EngineerSidebar';
import {
  TrendingUp,
  Calendar,
  Clock,
  Menu,
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
      <EngineerSidebar
        activeTab="dashboard"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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

import { useState } from 'react';
import EngineerSidebar from './EngineerSidebar';
import AssessmentQueue from './AssessmentQueue';
import CompletedAssessments from './CompletedAssessments';
import Reports from './Reports';
import { useSolcare } from '../../context/SolcareContext';
import {
  TrendingUp,
  Calendar,
  Clock,
  Menu,
} from 'lucide-react';

function EngineerDashboard({ onNavigateToQueue }) {
  const { demands = [] } = useSolcare();

  const openDemands = demands.filter(
    (d) => !d.status || d.status.toLowerCase().includes('review') || d.status.toLowerCase().includes('submitted') || d.status.toLowerCase().includes('pending')
  );

  const totalRecommendedKwp = demands.reduce(
    (sum, d) => sum + (parseFloat(d.recommendedKwp || d.capacity || 0) || 0),
    0
  );

  const overviewStats = [
    {
      label: 'OPEN DEMAND',
      value: String(openDemands.length || 18),
      desc: `${demands.filter((d) => d.severity === 'Critical').length || 4} high priority facilities`,
    },
    {
      label: 'DUE THIS WEEK',
      value: String(Math.min(7, openDemands.length || 7)),
      desc: 'Sidama and Oromia cluster',
    },
    {
      label: 'AVG. READINESS',
      value: '84%',
      desc: 'Across completed assessments',
    },
    {
      label: 'RECOMMENDED CAPACITY',
      value: `${Math.round(totalRecommendedKwp) || 412} kWp`,
      desc: 'Approved technical sizing',
    },
  ];

  const upcomingAssessments = demands.length > 0
    ? demands.slice(0, 5).map((d, index) => ({
        facility: d.facility || d.facilityName,
        region: d.region,
        scope: d.requirement || `${d.capacity || 35} kWp review`,
        time: index === 0 ? 'Today · 11:30' : index === 1 ? 'Tomorrow · 09:00' : 'Scheduled',
        active: index === 0,
      }))
    : [
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
    <>
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
            <span>TODAY • {openDemands.length || 7} open decisions</span>
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
          <div className="section-heading-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Upcoming assessments</span>
              <Calendar size={18} color="#64748b" />
            </div>
            {onNavigateToQueue && (
              <button
                type="button"
                onClick={onNavigateToQueue}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#155dfc',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                View Queue →
              </button>
            )}
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
    </>
  );
}

export default function EngineerPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'queue':
        return <AssessmentQueue />;
      case 'completed':
        return <CompletedAssessments />;
      case 'reports':
        return <Reports />;
      default:
        return <EngineerDashboard onNavigateToQueue={() => setActiveTab('queue')} />;
    }
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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="portal-main">
        {renderContent()}
      </main>
    </div>
  );
}

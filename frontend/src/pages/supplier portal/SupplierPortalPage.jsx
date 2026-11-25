import { useState } from 'react';
import SupplierSidebar from './SupplierSidebar';
import AvailableDemands from './AvailableDemands';
import MyActiveJobs from './MyActiveJobs';
import Completed from './Completed';
import Documents from './Documents';
import { useSolcare } from '../../context/SolcareContext';
import { PanelLeft, Menu } from 'lucide-react';

function SupplierDashboard() {
  const { demands = [] } = useSolcare();

  const openDemands = demands.filter(
    (d) => d.status && (d.status.toLowerCase().includes('approved') || d.status.toLowerCase().includes('bidding') || d.status.toLowerCase().includes('ready') || d.status.toLowerCase().includes('open'))
  );

  const activeDemands = demands.filter(
    (d) => d.status && (d.status.toLowerCase().includes('progress') || d.status.toLowerCase().includes('dispatched') || d.status.toLowerCase().includes('delivery') || d.status.toLowerCase().includes('install'))
  );

  const completedDemands = demands.filter(
    (d) => d.status && (d.status.toLowerCase().includes('completed') || d.status.toLowerCase().includes('commissioned'))
  );

  const fulfillmentStats = [
    { label: 'OPEN OPPORTUNITIES', value: String(openDemands.length || 2), hint: 'Ready to claim' },
    { label: 'ACTIVE JOBS', value: String(activeDemands.length || 1), hint: 'Accepted or in progress' },
    { label: 'COMPLETED', value: String(completedDemands.length || 1), hint: 'Closed with ratings' },
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
    <>
      {/* Topbar */}
      <header className="portal-topbar" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div className="topbar-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#155dfc', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
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
        {/* Left Card */}
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
    </>
  );
}

export default function SupplierPortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'demands':
        return <AvailableDemands />;
      case 'active-jobs':
        return <MyActiveJobs />;
      case 'completed':
        return <Completed />;
      case 'documents':
        return <Documents />;
      default:
        return <SupplierDashboard />;
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
      <SupplierSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="portal-main">
        {renderContent()}
      </main>
    </div>
  );
}

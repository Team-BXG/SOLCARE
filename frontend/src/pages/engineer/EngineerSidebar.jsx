import {
  Sun,
  Wrench,
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  BarChart3,
  LogOut,
  X,
} from 'lucide-react';

export default function EngineerSidebar({
  activeTab = 'dashboard',
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
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
        <button
          type="button"
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('dashboard');
            setSidebarOpen(false);
          }}
        >
          <LayoutDashboard size={16} />
          <span>My Dashboard</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('queue');
            setSidebarOpen(false);
          }}
        >
          <ClipboardList size={16} />
          <span>Assessment Queue</span>
          <span className="nav-item-badge">4</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('completed');
            setSidebarOpen(false);
          }}
        >
          <CheckCircle2 size={16} />
          <span>Completed Assessments</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('reports');
            setSidebarOpen(false);
          }}
        >
          <BarChart3 size={16} />
          <span>Reports</span>
        </button>
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="logout-btn"
          onClick={() => alert('Signing out of Technical Module...')}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}


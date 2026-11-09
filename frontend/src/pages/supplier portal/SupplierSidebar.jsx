import {
  Zap,
  LayoutDashboard,
  Briefcase,
  Layers,
  CheckCircle2,
  FolderOpen,
  X,
} from 'lucide-react';

export default function SupplierSidebar({
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
            <Zap size={20} />
          </div>
          <div className="brand-text">
            <h2>SUPPLIER PORTAL</h2>
            <p>Hospital Solar Fulfillment</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          type="button"
          className={`nav-item ${activeTab === 'dashboard' ? 'active-white' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('dashboard');
            setSidebarOpen(false);
          }}
        >
          <LayoutDashboard size={16} />
          <div className="nav-item-subtext">
            <span>Dashboard</span>
            <span className="sub">Overview</span>
          </div>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'demands' ? 'active-white' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('demands');
            setSidebarOpen(false);
          }}
        >
          <Briefcase size={16} />
          <div className="nav-item-subtext">
            <span>Available Demands</span>
            <span className="sub">Claim work</span>
          </div>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'active-jobs' ? 'active-white' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('active-jobs');
            setSidebarOpen(false);
          }}
        >
          <Layers size={16} />
          <div className="nav-item-subtext">
            <span>My Active Jobs</span>
            <span className="sub">In motion</span>
          </div>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'completed' ? 'active-white' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('completed');
            setSidebarOpen(false);
          }}
        >
          <CheckCircle2 size={16} />
          <div className="nav-item-subtext">
            <span>Completed</span>
            <span className="sub">History</span>
          </div>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'documents' ? 'active-white' : ''}`}
          onClick={() => {
            if (setActiveTab) setActiveTab('documents');
            setSidebarOpen(false);
          }}
        >
          <FolderOpen size={16} />
          <div className="nav-item-subtext">
            <span>Documents</span>
            <span className="sub">Files</span>
          </div>
        </button>
      </nav>

      {/* Operating As Card at Sidebar Bottom */}
      <div className="sidebar-bottom">
        <div className="user-identity-card" style={{ marginBottom: 0 }}>
          <div className="user-identity-info">
            <div className="sub-label">OPERATING AS</div>
            <div className="user-name" style={{ fontSize: 13 }}>
              EthioSolar Solutions PLC
            </div>
            <div className="user-desc" style={{ fontSize: 10, marginTop: 2 }}>
              Direct access enabled · no authentication gate
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}


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
  ArrowRight,
  X,
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'facilities', label: 'Facilities', icon: Building2 },
    { id: 'demands', label: 'Demands', icon: FileSpreadsheet },
    { id: 'technical', label: 'Technical Assessments', icon: ClipboardCheck },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

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
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
            >
              {isActive && <span className="active-dot" />}
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Switch Portal Links */}
      <div className="sidebar-switch-portal">
        <div className="switch-portal-title">SWITCH PORTAL</div>
        <Link
          to="/facility-portal"
          className="switch-portal-link"
          onClick={() => setSidebarOpen(false)}
        >
          <span>Facility Portal</span>
          <ArrowRight size={13} />
        </Link>
        <Link
          to="/engineer"
          className="switch-portal-link"
          onClick={() => setSidebarOpen(false)}
        >
          <span>Tech Module</span>
          <ArrowRight size={13} />
        </Link>
        <Link
          to="/supplier-portal"
          className="switch-portal-link"
          onClick={() => setSidebarOpen(false)}
        >
          <span>Supplier Portal</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </aside>
  );
}


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
  X,
} from 'lucide-react';

export default function FacilitySidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'submit', label: 'Submit Demand', icon: FilePlus },
    { id: 'requests', label: 'My Requests', icon: ListTodo },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
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
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="logout-btn"
          onClick={() => alert('Signing out of Facility Workspace...')}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}


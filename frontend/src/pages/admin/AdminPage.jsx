import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';
import Facilities from './Facilities';
import Demands from './Demands';
import TechnicalAssessments from './TechnicalAssessments';
import Suppliers from './Suppliers';
import Reports from './Reports';
import Settings from './Settings';
import DemandModal from './DemandModal';
import {
  initialStats,
  initialFacilities,
  initialDemands,
  initialTechnicalAssessments,
  initialSuppliers,
} from './mockData';
import { Menu } from 'lucide-react';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDemand, setSelectedDemand] = useState(null);

  const stats = initialStats;
  const facilities = initialFacilities;
  const demands = initialDemands;
  const technicalAssessments = initialTechnicalAssessments;
  const suppliers = initialSuppliers;

  const handleExportCSV = () => {
    const headers = ['Facility,ID,Type,Region,Requirement,Status,TechnicalAssessment,Supplier,Date\n'];
    const rows = demands.map((d) =>
      `"${d.facility}","${d.id}","${d.type}","${d.region}","${d.requirement}","${d.status}","${d.techAssessment}","${d.supplier}","${d.date}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'solcare_solar_demands.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'facilities': return 'ADMINISTRATION / FACILITIES';
      case 'demands': return 'ADMINISTRATION / DEMANDS';
      case 'technical': return 'ADMINISTRATION / TECHNICAL ASSESSMENTS';
      case 'suppliers': return 'ADMINISTRATION / SUPPLIERS';
      case 'reports': return 'ADMINISTRATION / REPORTS';
      case 'settings': return 'ADMINISTRATION / SETTINGS';
      default: return 'ADMINISTRATION / DASHBOARD';
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
          <span>Admin Portal</span>
          <span className="mobile-portal-badge">Admin</span>
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

      {/* Standalone Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="portal-main">
        {/* Topbar */}
        <header className="portal-topbar">
          <div className="topbar-left">
            <div className="breadcrumb">{getBreadcrumb()}</div>
            <h1 className="portal-title">Admin Dashboard</h1>
          </div>
          <div className="topbar-right">
            <div className="user-profile-pill">
              <div className="profile-avatar-circle">AK</div>
              <div className="profile-details">
                <div className="name">Amanuel K.</div>
                <div className="role">System Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Subcomponents */}
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            demands={demands}
            onSelectDemand={setSelectedDemand}
            onExportCSV={handleExportCSV}
          />
        )}

        {activeTab === 'facilities' && (
          <Facilities facilities={facilities} />
        )}

        {activeTab === 'demands' && (
          <Demands
            demands={demands}
            onSelectDemand={setSelectedDemand}
            onExportCSV={handleExportCSV}
          />
        )}

        {activeTab === 'technical' && (
          <TechnicalAssessments assessments={technicalAssessments} />
        )}

        {activeTab === 'suppliers' && (
          <Suppliers suppliers={suppliers} />
        )}

        {activeTab === 'reports' && (
          <Reports demands={demands} />
        )}

        {activeTab === 'settings' && (
          <Settings />
        )}
      </main>

      {/* Demand Detail Modal Component */}
      <DemandModal
        selectedDemand={selectedDemand}
        onClose={() => setSelectedDemand(null)}
      />
    </div>
  );
}

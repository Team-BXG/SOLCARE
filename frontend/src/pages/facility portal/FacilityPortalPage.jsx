import { useState } from 'react';
import FacilitySidebar from './FacilitySidebar';
import FacilityDashboard from './FacilityDashboard';
import MyProfile from './MyProfile';
import MyRequests from './MyRequests';
import Documents from './Documents';
import Notifications from './Notifications';
import SubmitDemand from './SubmitDemand';
import RequestModal from './RequestModal';
import { initialProfileData, documentsList } from './mockData';
import { useSolcare } from '../../context/SolcareContext';
import { Menu } from 'lucide-react';

export default function FacilityPortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [profileData, setProfileData] = useState(initialProfileData);

  // Synchronized Solcare Context
  const { demands, notifications, registerDemand } = useSolcare();

  // Dynamically calculate horizontal metrics for this facility
  const activeDemandsCount = demands.filter(
    (d) => d.status !== 'Completed' && d.status !== 'Returned'
  ).length;

  const totalCapacityKwp = demands.reduce((acc, d) => {
    const kw = parseFloat((d.capacity || d.requirement || '0').replace(/[^0-9.]/g, '')) || 0;
    return acc + kw;
  }, 0);

  const horizontalStats = [
    {
      label: 'ACTIVE REQUESTS',
      value: String(activeDemandsCount).padStart(2, '0'),
      sub: `${demands.filter((d) => d.techAssessment === 'In Review' || d.status.includes('Verification')).length} under technical review`,
    },
    {
      label: 'APPROVED CAPACITY',
      value: `${totalCapacityKwp || 35}kWp`,
      sub: 'Ready for supplier release',
    },
    {
      label: 'DOCUMENTS',
      value: '12',
      sub: 'Synchronized with health bureau',
    },
    {
      label: 'CRITICAL LOAD',
      value: '25kW',
      sub: 'ICU, OR, laboratory protected',
    },
  ];

  // Derive workflow activities from actual demands
  const activities = demands.slice(0, 4).map((d) => ({
    date: d.date?.slice(0, 6)?.toUpperCase() || 'RECENT',
    title: `${d.facility}: ${d.requirement || d.summary}`,
    desc: `Status: ${d.status} · Supply stage: ${d.supplyStage || 'Pending'}`,
  }));

  const handleDemandSubmitted = (newDemandData) => {
    registerDemand(newDemandData);
    setActiveTab('requests');
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

      {/* Standalone Facility Sidebar */}
      <FacilitySidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="portal-main">
        {activeTab === 'dashboard' && (
          <FacilityDashboard
            stats={horizontalStats}
            activities={activities}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'profile' && (
          <MyProfile
            profileData={profileData}
            setProfileData={setProfileData}
          />
        )}

        {activeTab === 'submit' && (
          <SubmitDemand
            onNavigate={setActiveTab}
            onDemandSubmitted={handleDemandSubmitted}
          />
        )}

        {activeTab === 'requests' && (
          <MyRequests
            onSelectRequest={setSelectedRequest}
            onEditRequest={setSelectedRequest}
          />
        )}

        {activeTab === 'documents' && (
          <Documents
            documents={documentsList}
          />
        )}

        {activeTab === 'notifications' && (
          <Notifications
            notifications={notifications}
          />
        )}
      </main>

      {/* Request Details Modal */}
      <RequestModal
        selectedRequest={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
}

import { useState } from 'react';
import FacilitySidebar from './FacilitySidebar';
import FacilityDashboard from './FacilityDashboard';
import MyProfile from './MyProfile';
import MyRequests from './MyRequests';
import Documents from './Documents';
import Notifications from './Notifications';
import SubmitDemand from './SubmitDemand';
import RequestModal from './RequestModal';
import {
  initialProfileData,
  horizontalStats,
  activities,
  submittedRequests,
  documentsList,
  notificationsList,
} from './mockData';
import { Menu } from 'lucide-react';

export default function FacilityPortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [profileData, setProfileData] = useState(initialProfileData);

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
          />
        )}

        {activeTab === 'requests' && (
          <MyRequests
            requests={submittedRequests}
            onSelectRequest={setSelectedRequest}
          />
        )}

        {activeTab === 'documents' && (
          <Documents
            documents={documentsList}
          />
        )}

        {activeTab === 'notifications' && (
          <Notifications
            notifications={notificationsList}
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

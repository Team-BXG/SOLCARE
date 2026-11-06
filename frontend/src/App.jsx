import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PortalSwitcher from './components/PortalSwitcher';
import AdminPage from './pages/admin';
import FacilityPortalPage from './pages/facility portal';
import EngineerPage from './pages/engineer';
import SupplierPortalPage from './pages/supplier portal';
import './styles/portals.css';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <PortalSwitcher />
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/facility-portal" element={<FacilityPortalPage />} />
          <Route path="/engineer" element={<EngineerPage />} />
          <Route path="/supplier-portal" element={<SupplierPortalPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

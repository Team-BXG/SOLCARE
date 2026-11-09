import { CheckCircle } from 'lucide-react';

export default function FacilityHeader() {
  return (
    <section className="banner-workspace-card">
      <div>
        <div className="sub-header">HAWASSA GENERAL HOSPITAL</div>
        <h2>Facility demand workspace</h2>
        <p>
          Switch between portal pages from the fixed sidebar. Each panel opens independently without scrolling through a long dashboard.
        </p>
      </div>
      <div className="header-badge-pill verified">
        <CheckCircle size={14} />
        <span>VERIFIED FACILITY</span>
      </div>
    </section>
  );
}


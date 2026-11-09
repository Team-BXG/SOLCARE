import { CheckCircle } from 'lucide-react';

export default function FacilityDashboard({
  stats = [],
  activities = [],
  onNavigate,
}) {
  return (
    <>
      {/* Top Banner Card matching original design */}
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

      {/* Split Two-Column Grid */}
      <div className="portal-two-col-layout">
        {/* Left White Panel */}
        <section className="portal-panel-card">
          <div className="panel-sub-label">MY DASHBOARD</div>
          <h2 className="panel-main-title">Solar demand at a glance</h2>
          <p className="panel-description">
            A clean overview of active requests, current workflow status, document readiness, and critical load coverage for the facility.
          </p>

          {/* Horizontal Stats Row */}
          <div className="horizontal-stats-row">
            {stats.map((stat) => (
              <div key={stat.label} className="horizontal-stat-box">
                <div className="label">{stat.label}</div>
                <div className="value">{stat.value}</div>
                <div className="sub">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <h3 className="section-heading-sm">Recent activity</h3>
          <div className="timeline-list">
            {activities.map((item) => (
              <div key={item.date + item.title} className="timeline-item">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-content">
                  <div className="title">{item.title}</div>
                  <div className="desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Dark Card */}
        <section className="dark-hero-card">
          <div className="milestone-tag">CURRENT MILESTONE</div>
          <h2 className="hero-heading">Technically assessed</h2>
          <p className="hero-desc">
            REQ-2025-001 has completed technical assessment. Supplier release is the next expected step.
          </p>

          <div className="dark-card-details">
            <div className="dark-detail-row">
              <span className="detail-label">Scope</span>
              <span className="detail-value">35 kWp solar PV + battery backup</span>
            </div>
            <div className="dark-detail-row">
              <span className="detail-label">Critical Departments</span>
              <span className="detail-value">ICU, Operating Room, Laboratory</span>
            </div>
            <div className="dark-detail-row">
              <span className="detail-label">Assigned Engineer</span>
              <span className="detail-value">Eng. Solomon Bekele</span>
            </div>
            <div className="dark-detail-row">
              <span className="detail-label">Next Action</span>
              <span className="detail-value highlight">Ready for supplier bidding</span>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onNavigate && onNavigate('requests')}
            >
              View Request Details
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

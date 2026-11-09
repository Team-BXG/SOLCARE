import FacilityHeader from './FacilityHeader';
import { Bell } from 'lucide-react';

export default function Notifications({ notifications = [] }) {
  return (
    <>
      <FacilityHeader />

      <section className="portal-panel-card" style={{ marginTop: 20 }}>
        <div className="panel-sub-label">NOTIFICATIONS</div>
        <h2 className="panel-main-title">Workflow feed</h2>
        <p className="panel-description">
          Review current alerts, engineering notes, and next-step reminders for facility requests.
        </p>

        <div style={{ marginTop: 20 }}>
          {notifications.map((n) => (
            <div key={n.id} className="notification-feed-card">
              <div className="notification-feed-left">
                <div className={`notification-feed-icon ${n.color}`}>
                  <Bell size={18} />
                </div>
                <div className="notification-feed-content">
                  <div className="title">{n.title}</div>
                  <div className="text">{n.text}</div>
                </div>
              </div>
              <div className="notification-feed-time">{n.time}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

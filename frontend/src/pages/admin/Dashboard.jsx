import {
  Building2,
  FileText,
  ShieldAlert,
  Gauge,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Activity,
  Check,
} from 'lucide-react';
import Demands from './Demands';

const iconMap = {
  Building2,
  FileText,
  ShieldAlert,
  Gauge,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Activity,
  Check,
};

export default function Dashboard({ stats = [], demands = [], onSelectDemand, onExportCSV }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>System overview</h2>
          <p style={{ fontSize: 13, color: '#64748b' }}>A live view of solar demand across registered facilities.</p>
        </div>
        <div className="status-timestamp-pill">
          <span className="pulse-dot" />
          <span>Updated 30 May 2024, 09:42 EAT</span>
        </div>
      </div>

      {/* 9 Metric Cards Grid */}
      <div className="admin-stats-grid">
        {stats.map((s) => {
          const Icon = typeof s.icon === 'string' ? iconMap[s.icon] || FileText : s.icon;
          return (
            <div key={s.label} className="stat-metric-card">
              <div className="stat-metric-info">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>{s.trend}</div>
              </div>
              <div className={`stat-icon-wrapper ${s.color}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard includes live Demands table overview */}
      <div style={{ marginTop: 20 }}>
        <Demands
          demands={demands}
          onSelectDemand={onSelectDemand}
          onExportCSV={onExportCSV}
          isEmbedded
        />
      </div>
    </>
  );
}


import React, { useState } from 'react';
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

export default function Dashboard({
  stats = [],
  demands = [],
  onSelectDemand,
  onExportCSV,
  onNavigateTab,
  onFilterStatus,
}) {
  const [activeFilterLabel, setActiveFilterLabel] = useState(null);

  const handleCardClick = (stat) => {
    setActiveFilterLabel(stat.label);

    if (stat.label === 'Total Facilities') {
      if (onNavigateTab) onNavigateTab('facilities');
      return;
    }

    if (stat.label === 'Under Technical Assessment' || stat.label === 'Technically Assessed') {
      if (onNavigateTab) {
        onNavigateTab('technical');
        return;
      }
    }

    if (stat.label === 'Sent to Suppliers' || stat.label === 'Accepted by Suppliers') {
      if (onNavigateTab) {
        onNavigateTab('suppliers');
        return;
      }
    }

    // Status filter maps for Demands
    const labelToStatusMap = {
      'Pending Verification': 'Under Verification',
      'In Progress': 'In Progress',
      'Completed': 'Completed',
    };

    if (labelToStatusMap[stat.label] && onFilterStatus) {
      onFilterStatus(labelToStatusMap[stat.label]);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>System overview</h2>
          <p style={{ fontSize: 13, color: '#64748b' }}>
            A live view of solar demand across registered facilities. Click any metric card to filter or navigate directly.
          </p>
        </div>
        <div className="status-timestamp-pill">
          <span className="pulse-dot" />
          <span>Live Synchronized with Local Storage</span>
        </div>
      </div>

      {/* 9 Metric Cards Grid - All Clickable */}
      <div className="admin-stats-grid">
        {stats.map((s) => {
          const Icon = typeof s.icon === 'string' ? iconMap[s.icon] || FileText : s.icon;
          const isSelected = activeFilterLabel === s.label;
          return (
            <div
              key={s.label}
              className="stat-metric-card"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isSelected ? '1.5px solid var(--brand-primary, #00a884)' : undefined,
                boxShadow: isSelected ? '0 4px 14px rgba(0, 168, 132, 0.18)' : undefined,
                transform: isSelected ? 'translateY(-2px)' : undefined,
              }}
              onClick={() => handleCardClick(s)}
              title={`Click to inspect ${s.label}`}
            >
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

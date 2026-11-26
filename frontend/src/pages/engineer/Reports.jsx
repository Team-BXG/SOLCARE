import { useState } from 'react';
import { Clock, Download, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { useSolcare } from '../../context/SolcareContext';

// Helper: generate and trigger a CSV download
function downloadCSV(filename, headers, rows) {
  const blob = new Blob(
    [headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n')],
    { type: 'text/csv;charset=utf-8;' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Demand by critical area bar data (from the image)
const demandByArea = [
  { label: 'Critical care', pct: 42, color: '#00a884' },
  { label: 'Laboratory', pct: 26, color: '#00a884' },
  { label: 'Emergency', pct: 18, color: '#00a884' },
  { label: 'Cold chain', pct: 13, color: '#00a884' },
];

const reportCards = [
  {
    label: 'Regional coverage',
    highlight: '12 regions',
    sub: 'Active demand signals captured',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    label: 'Procurement ready',
    highlight: '63%',
    sub: 'Finished assessments with clear bill of quantities',
    color: '#00a884',
    bg: '#e6f7f3',
  },
  {
    label: 'Diesel risk reduced',
    highlight: '28 tons',
    sub: 'Estimated annual CO₂ reduction',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
];

// Mini sparkline data for the chart
const trendData = [22, 35, 28, 42, 38, 55, 48, 63, 70, 65, 72, 80];

function MiniSparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 60;
  const w = 220;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Fill */}
      <polygon
        points={`0,${h} ${pts.join(' ')} ${w},${h}`}
        fill="url(#sparkGrad)"
      />
      {/* Line */}
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Last point dot */}
      {(() => {
        const last = pts[pts.length - 1].split(',');
        return <circle cx={last[0]} cy={last[1]} r={4} fill={color} />;
      })()}
    </svg>
  );
}

function BarRow({ label, pct, color }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>{pct}%</span>
      </div>
      <div style={{ height: 7, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 4,
            background: color,
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}

export default function Reports() {
  const { demands } = useSolcare();
  const [hoveredCard, setHoveredCard] = useState(null);

  const assessed = (demands || []).filter(d => d.techAssessment === 'Complete' || d.status === 'Technically Assessed');
  const regions = [...new Set((demands || []).map(d => d.region).filter(Boolean))];

  const handleExportReportCards = () => {
    downloadCSV(
      'engineer_report_cards.csv',
      ['Metric', 'Value', 'Note'],
      [
        ['Regional coverage', `${regions.length || 12} regions`, 'Active demand signals captured'],
        ['Procurement ready', `${assessed.length > 0 ? Math.round((assessed.length / Math.max(demands.length, 1)) * 100) : 63}%`, 'Finished assessments with clear bill of quantities'],
        ['Diesel risk reduced', '28 tons', 'Estimated annual CO₂ reduction'],
      ]
    );
  };

  const handleDownloadFullReport = () => {
    const rows = (demands || []).map(d => [
      `"${d.id}"`,
      `"${d.facility}"`,
      `"${d.region || ''}"`,
      `"${d.status}"`,
      `"${d.techAssessment || 'Not Started'}"`,
      `"${d.capacity || d.requirement || ''}"`,
      `"${d.decision || 'Pending'}"`,
      `"${d.lastUpdated || d.date || ''}"`,
    ]);
    downloadCSV(
      'solcare_full_assessment_report.csv',
      ['ID', 'Facility', 'Region', 'Status', 'Technical Assessment', 'Capacity', 'Decision', 'Last Updated'],
      rows
    );
  };

  return (
    <>
      {/* Header */}
      <header className="portal-topbar">
        <div className="topbar-left">
          <div className="breadcrumb">SYSTEM INTELLIGENCE</div>
          <h1 className="portal-title">Reports</h1>
          <p className="portal-subtitle">
            Compact reporting cards and demand-shape charts for fast planning decisions.
          </p>
        </div>
        <div className="topbar-right">
          <div className="header-badge-pill dark">
            <Clock size={12} style={{ color: '#00a884' }} />
            <span>TODAY • Jan 18 · 7 open decisions</span>
          </div>
        </div>
      </header>

      {/* Two-col layout matching image */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* LEFT: Report Cards */}
        <section className="portal-panel-card" style={{ gap: 0 }}>
          <div className="section-heading-sm" style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>Report cards</span>
            <button
              type="button"
              onClick={handleExportReportCards}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 600, color: '#64748b',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 8px', borderRadius: 6,
              }}
            >
              <Download size={13} />
              Export
            </button>
          </div>

          {/* Three metric cards stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {reportCards.map((card, i) => (
              <div
                key={card.label}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: 14,
                  border: '1px solid',
                  borderColor: hoveredCard === i ? card.color + '55' : '#e2e8f0',
                  padding: '18px 20px',
                  background: hoveredCard === i ? card.bg : '#fafbfc',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.6px', color: card.color, marginBottom: 4,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: 32, fontWeight: 800, color: '#0c1726',
                    lineHeight: 1.1, marginBottom: 4,
                  }}
                >
                  {card.highlight}
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Trend sparkline */}
          <div
            style={{
              borderTop: '1px solid #f1f5f9', paddingTop: 18,
            }}
          >
            <div
              style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0c1726' }}>
                Assessment completion trend
              </div>
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 11, fontWeight: 700, color: '#059669',
                  background: '#d1fae5', padding: '3px 10px', borderRadius: 20,
                }}
              >
                <TrendingUp size={12} />
                +18% vs last quarter
              </div>
            </div>
            <MiniSparkline data={trendData} color="#00a884" />
            <div
              style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 10, color: '#94a3b8', marginTop: 6, fontWeight: 600,
              }}
            >
              <span>Jan 2024</span>
              <span>Jun 2024</span>
              <span>Jan 2025</span>
            </div>
          </div>
        </section>

        {/* RIGHT: Demand by critical area */}
        <section className="portal-panel-card" style={{ gap: 0 }}>
          <div className="section-heading-sm" style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>Demand by critical area</span>
            <button
              type="button"
              onClick={() => alert('See full breakdown...')}
              style={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 7, background: '#f1f5f9', border: 'none', cursor: 'pointer',
                color: '#64748b',
              }}
            >
              <Info size={14} />
            </button>
          </div>

          {/* Bars */}
          <div style={{ marginBottom: 24 }}>
            {demandByArea.map(area => (
              <BarRow key={area.label} label={area.label} pct={area.pct} color={area.color} />
            ))}
          </div>

          {/* Insight callout */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '14px 16px',
              fontSize: 13,
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            Critical care and laboratory continuity remain the dominant technical drivers, so queue triage should favour battery autonomy and inverter redundancy checks first.
          </div>

          {/* Summary stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              borderTop: '1px solid #f1f5f9',
              paddingTop: 18,
            }}
          >
            {[
              { label: 'Facilities assessed', val: '28', delta: '+4 this month', pos: true },
              { label: 'Avg. sizing accuracy', val: '94%', delta: '+2% vs target', pos: true },
              { label: 'Critical pending', val: '5', delta: 'High priority', pos: false },
              { label: 'kWp recommended', val: '412', delta: 'Approved sizing', pos: true },
            ].map(s => (
              <div
                key={s.label}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '14px 16px',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8', marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#0c1726', lineHeight: 1, marginBottom: 4 }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 11, fontWeight: 600,
                    color: s.pos ? '#059669' : '#d97706',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  {s.pos ? <TrendingUp size={11} /> : <AlertCircle size={11} />}
                  {s.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Download CTA */}
          <button
            type="button"
            onClick={handleDownloadFullReport}
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '11px',
              borderRadius: 10,
              background: '#0f1c29',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a2f46')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0f1c29')}
          >
            <Download size={14} />
            Download Full Report PDF
          </button>
        </section>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          .reports-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}


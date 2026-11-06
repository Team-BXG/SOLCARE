import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Building2, Wrench, Truck, Palette } from 'lucide-react';

export default function PortalSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('solcare-theme') || 'emerald';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('solcare-theme', theme);
  }, [theme]);

  const portals = [
    { to: '/admin', label: 'Admin Portal', icon: ShieldCheck, role: 'Administrator' },
    { to: '/facility-portal', label: 'Facility Portal', icon: Building2, role: 'Facility User' },
    { to: '/engineer', label: 'Engineer Portal', icon: Wrench, role: 'Technical Professional' },
    { to: '/supplier-portal', label: 'Supplier Portal', icon: Truck, role: 'Supplier' },
  ];

  const themes = [
    { id: 'emerald', label: 'Emerald' },
    { id: 'cobalt', label: 'Cobalt' },
    { id: 'nordic', label: 'Nordic' },
  ];

  return (
    <header className="top-portal-switcher">
      <div className="switcher-brand">
        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-primary, #00a884)' }} />
        <span><strong>SOLCARE</strong> • Hospital Solar Portals</span>
      </div>

      <nav className="switcher-pills">
        {portals.map((p) => {
          const Icon = p.icon;
          return (
            <NavLink
              key={p.to}
              to={p.to}
              className={({ isActive }) => `switcher-pill ${isActive ? 'active' : ''}`}
            >
              <Icon size={14} />
              <span>{p.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Live Color Palette Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <Palette size={14} color="#94a3b8" />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          aria-label="Color Palette"
          style={{
            background: '#13202e',
            color: '#e2e8f0',
            border: '1px solid #1e3146',
            borderRadius: 14,
            padding: '4px 8px',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

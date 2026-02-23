import React from 'react';

const NAV_ITEMS = [
  { section: 'Overview', items: [
    { id: 'dashboard', icon: '◈', label: 'Dashboard' },
    { id: 'playbook', icon: '◉', label: 'Playbook' },
  ]},
  { section: 'Trades', items: [
    { id: 'log', icon: '▤', label: 'Trade Log' },
    { id: 'grader', icon: '◎', label: 'Setup Grader' },
    { id: 'checklist', icon: '☑', label: 'Pre-Trade Check' },
  ]},
  { section: 'Review', items: [
    { id: 'stats', icon: '▦', label: 'Statistics' },
    { id: 'weekly', icon: '◫', label: 'Weekly Review' },
    { id: 'mistakes', icon: '⚠', label: 'Mistake Tracker' },
    { id: 'mindset', icon: '◐', label: 'Mindset' },
  ]},
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: 3, color: 'var(--accent)', textTransform: 'uppercase', display: 'block' }}>
          ⬡ TRADEFLOW
        </span>
        <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: 1, marginTop: 3, display: 'block' }}>
          BACKTESTING JOURNAL
        </span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        {NAV_ITEMS.map(group => (
          <div key={group.section}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', padding: '8px 8px 6px', marginTop: 12 }}>
              {group.section}
            </div>
            {group.items.map(item => (
              <div
                key={item.id}
                onClick={() => onNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: active === item.id ? 'var(--accent)' : 'var(--text2)',
                  background: active === item.id ? 'rgba(0,212,170,0.08)' : 'transparent',
                  border: `1px solid ${active === item.id ? 'rgba(0,212,170,0.2)' : 'transparent'}`,
                  marginBottom: 2,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)' }}>
        PLAYBOOK v1.0 // EST
      </div>
    </aside>
  );
}

import React from 'react';

const s = {
  card: {
    background: 'var(--card, #0d1117)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '20px 24px',
  },
  cardTitle: {
    fontFamily: 'var(--mono)',
    fontSize: 10,
    letterSpacing: 2,
    color: 'var(--text3)',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
};

export function Card({ children, style, title }) {
  return (
    <div style={{ ...s.card, ...style }}>
      {title && <div style={s.cardTitle}>{title}</div>}
      {children}
    </div>
  );
}

export function CardTitle({ children, style }) {
  return <div style={{ ...s.cardTitle, ...style }}>{children}</div>;
}

export function StatCard({ label, value, sub, accentColor = 'var(--accent)' }) {
  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: accentColor }} />
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 26, fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5, fontFamily: 'var(--mono)' }}>{sub}</div>}
    </div>
  );
}

export function Btn({ children, onClick, variant = 'primary', size = 'md', style }) {
  const base = {
    fontFamily: 'var(--mono)',
    fontSize: size === 'sm' ? 10 : 11,
    letterSpacing: 1,
    fontWeight: 500,
    padding: size === 'sm' ? '6px 12px' : '10px 20px',
    borderRadius: 5,
    border: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.15s',
  };
  const variants = {
    primary: { background: 'var(--accent)', color: '#000' },
    outline: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border2)' },
    danger: { background: 'rgba(255,71,87,0.1)', color: 'var(--red)', border: '1px solid rgba(255,71,87,0.2)' },
    ghost: { background: 'transparent', color: 'var(--text3)', border: '1px solid transparent' },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick}>
      {children}
    </button>
  );
}

export function Badge({ children, type = 'green' }) {
  const types = {
    green: { background: 'rgba(0,212,170,0.1)', color: 'var(--green)', border: '1px solid rgba(0,212,170,0.2)' },
    blue: { background: 'rgba(0,153,255,0.1)', color: 'var(--accent2)', border: '1px solid rgba(0,153,255,0.2)' },
    red: { background: 'rgba(255,71,87,0.1)', color: 'var(--red)', border: '1px solid rgba(255,71,87,0.2)' },
    yellow: { background: 'rgba(255,211,42,0.1)', color: 'var(--yellow)', border: '1px solid rgba(255,211,42,0.2)' },
  };
  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '4px 10px', borderRadius: 3, letterSpacing: 1, ...types[type] }}>
      {children}
    </span>
  );
}

export function SetupTag({ name }) {
  return (
    <span style={{
      display: 'inline-block',
      background: 'rgba(0,153,255,0.08)',
      border: '1px solid rgba(0,153,255,0.2)',
      borderRadius: 3,
      padding: '2px 8px',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--accent2)',
    }}>
      {name}
    </span>
  );
}

export function TypeTag({ type }) {
  const styles = {
    reversal: { background: 'rgba(255,107,53,0.1)', color: 'var(--orange)', border: '1px solid rgba(255,107,53,0.2)' },
    trend: { background: 'rgba(0,153,255,0.1)', color: 'var(--accent2)', border: '1px solid rgba(0,153,255,0.2)' },
    breakout: { background: 'rgba(255,211,42,0.1)', color: 'var(--yellow)', border: '1px solid rgba(255,211,42,0.2)' },
    transition: { background: 'rgba(0,212,170,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,212,170,0.2)' },
  };
  const labels = { reversal: 'REVERSAL', trend: 'TREND', breakout: 'BREAKOUT', transition: 'TRANSITION' };
  return (
    <span style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1, padding: '2px 8px', borderRadius: 3, ...(styles[type] || {}) }}>
      {labels[type] || type}
    </span>
  );
}

export function BarRow({ label, value, max = 100, color = 'var(--accent)', suffix = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', width: 160, minWidth: 160 }}>{label}</div>
      <div style={{ flex: 1, background: 'var(--bg3)', height: 8, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 4, background: color, transition: 'width 0.6s ease' }} />
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text2)', width: 60, textAlign: 'right' }}>{value}{suffix}</div>
    </div>
  );
}

export function EmotionBtn({ label, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? 'rgba(0,212,170,0.08)' : 'var(--bg3)',
        border: `1px solid ${selected ? 'rgba(0,212,170,0.4)' : 'var(--border)'}`,
        borderRadius: 20,
        color: selected ? 'var(--accent)' : 'var(--text2)',
        fontSize: 12,
        padding: '6px 14px',
        cursor: 'pointer',
        transition: 'all 0.15s',
        fontFamily: 'var(--mono)',
        userSelect: 'none',
      }}
    >
      {label}
    </div>
  );
}

export function GradeBtn({ grade, active, onClick }) {
  const colors = {
    'A+': 'var(--green)', 'A': 'var(--green)', 'B': 'var(--accent2)',
    'C': 'var(--yellow)', 'D': 'var(--orange)', 'F': 'var(--red)'
  };
  const c = colors[grade] || 'var(--text3)';
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 11,
        padding: '6px 14px',
        borderRadius: 4,
        cursor: 'pointer',
        border: `1px solid ${active ? c : 'var(--border)'}`,
        background: active ? `${c}22` : 'var(--bg3)',
        color: active ? c : 'var(--text3)',
        transition: 'all 0.1s',
        outline: active ? `2px solid ${c}` : 'none',
        outlineOffset: 2,
      }}
    >
      {grade}
    </button>
  );
}

export function FormGroup({ label, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

export function Divider({ style }) {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0', ...style }} />;
}

export function EmptyState({ icon = '◈', message }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: 1 }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div>{message}</div>
    </div>
  );
}

export function Modal({ open, onClose, title, children, width = 640 }) {
  if (!open) return null;
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border2)',
        borderRadius: 10,
        padding: 28,
        width,
        maxWidth: '95vw',
        maxHeight: '90vh',
        overflowY: 'auto',
        animation: 'fadeIn 0.2s ease',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

export function Toast({ message, show }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      background: 'var(--bg2)',
      border: '1px solid var(--accent)',
      borderRadius: 6,
      padding: '12px 20px',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--accent)',
      zIndex: 9999,
      transform: show ? 'translateY(0)' : 'translateY(80px)',
      opacity: show ? 1 : 0,
      transition: 'all 0.3s',
      letterSpacing: 1,
      pointerEvents: 'none',
    }}>
      {message}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 24 }}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: 1,
            padding: '10px 16px',
            cursor: 'pointer',
            color: active === tab.id ? 'var(--accent)' : 'var(--text3)',
            borderBottom: `2px solid ${active === tab.id ? 'var(--accent)' : 'transparent'}`,
            marginBottom: -1,
            transition: 'all 0.15s',
            textTransform: 'uppercase',
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

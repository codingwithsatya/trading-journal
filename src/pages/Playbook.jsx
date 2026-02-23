import React from 'react';
import { PLAYBOOK_SETUPS, TypeTag } from '../data/playbook';
import { TypeTag as TT } from '../components/UI';

export default function Playbook({ trades }) {
  return (
    <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
      {PLAYBOOK_SETUPS.map(setup => {
        const st = trades.filter(t => t.setup === setup.name);
        const wins = st.filter(t => t.result === 'Win').length;
        const wr = st.length ? Math.round((wins / st.length) * 100) : 0;
        const rrList = st.filter(t => t.rr);
        const avgRR = rrList.length ? (rrList.reduce((s, t) => s + parseFloat(t.rr), 0) / rrList.length).toFixed(1) : '—';

        return (
          <div key={setup.name} style={{
            background: '#0d1117',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 18,
            transition: 'all 0.2s',
            cursor: 'default',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,170,0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>
              {setup.name}
            </div>
            <div style={{ marginBottom: 10 }}>
              <TT type={setup.tagType} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 14 }}>
              {setup.desc}
            </div>

            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 10 }}>
              <div style={{ marginBottom: 4 }}><span style={{ color: 'var(--accent2)' }}>ENTRY</span> {setup.entry}</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: 'var(--red)' }}>RISK</span> {setup.risk}</div>
              <div><span style={{ color: 'var(--green)' }}>TARGET</span> {setup.target}</div>
            </div>

            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 14, padding: '8px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 3, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1, color: 'var(--text3)', textTransform: 'uppercase' }}>Condition</div>
              {setup.condition}
            </div>

            <div style={{ display: 'flex', gap: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{st.length}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: 1 }}>TRADES</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600, color: wr >= 50 ? 'var(--green)' : st.length ? 'var(--red)' : 'var(--text3)' }}>{st.length ? `${wr}%` : '—'}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: 1 }}>WIN RATE</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{avgRR}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: 1 }}>AVG R:R</div>
              </div>
            </div>

            {/* Rules preview */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 1, color: 'var(--text3)', marginBottom: 8, textTransform: 'uppercase' }}>Rules Checklist ({setup.rules.length})</div>
              {setup.rules.map((r, i) => (
                <div key={i} style={{ fontSize: 11, color: 'var(--text3)', padding: '3px 0', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 10 }}>{i + 1}.</span>
                  {r}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

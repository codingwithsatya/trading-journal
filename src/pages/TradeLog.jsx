import React, { useState } from 'react';
import { Card, SetupTag, Btn } from '../components/UI';
import { SETUPS_NAMES, gradeColor } from '../data/playbook';

const td = { padding: '12px 14px', fontSize: 13, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', color: 'var(--text2)' };

export default function TradeLog({ trades, onDelete, onAdd }) {
  const [filterSetup, setFilterSetup] = useState('');
  const [filterResult, setFilterResult] = useState('');
  const [filterDir, setFilterDir] = useState('');

  const filtered = trades
    .filter(t => !filterSetup || t.setup === filterSetup)
    .filter(t => !filterResult || t.result === filterResult)
    .filter(t => !filterDir || t.dir === filterDir)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="animate-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Trade Log</div>
        <Btn size="sm" onClick={onAdd}>+ New Trade</Btn>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select style={{ width: 200 }} value={filterSetup} onChange={e => setFilterSetup(e.target.value)}>
            <option value="">All Setups</option>
            {SETUPS_NAMES.map(n => <option key={n}>{n}</option>)}
          </select>
          <select style={{ width: 160 }} value={filterResult} onChange={e => setFilterResult(e.target.value)}>
            <option value="">All Results</option>
            <option>Win</option><option>Loss</option><option>BE</option>
          </select>
          <select style={{ width: 140 }} value={filterDir} onChange={e => setFilterDir(e.target.value)}>
            <option value="">All Directions</option>
            <option>Long</option><option>Short</option>
          </select>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center' }}>
            {filtered.length} trades
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date','Time','Setup','Dir','Entry','Stop','Target','Exit','R:R','Result','Grade','Mindset',''].map(h => (
                  <th key={h} style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length ? filtered.map(t => (
                <tr key={t.id} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={td}>{t.date}</td>
                  <td style={td}>{t.time || '—'}</td>
                  <td style={td}><SetupTag name={t.setup} /></td>
                  <td style={{ ...td, color: t.dir === 'Long' ? 'var(--green)' : 'var(--red)' }}>{t.dir}</td>
                  <td style={td}>{t.entry || '—'}</td>
                  <td style={td}>{t.stop || '—'}</td>
                  <td style={td}>{t.target || '—'}</td>
                  <td style={td}>{t.exit || '—'}</td>
                  <td style={td}>{t.rr ? `${t.rr}R` : '—'}</td>
                  <td style={{ ...td, color: t.result === 'Win' ? 'var(--green)' : t.result === 'Loss' ? 'var(--red)' : 'var(--text3)' }}>{t.result}</td>
                  <td style={{ ...td, color: gradeColor(t.grade) }}>{t.grade || '—'}</td>
                  <td style={{ ...td, fontSize: 11, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={Array.isArray(t.mindset) ? t.mindset.join(', ') : t.mindset}>
                    {Array.isArray(t.mindset) ? t.mindset.join(', ') || '—' : t.mindset || '—'}
                  </td>
                  <td style={td}>
                    <Btn variant="danger" size="sm" onClick={() => onDelete(t.id)}>×</Btn>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={13} style={{ textAlign: 'center', padding: 40, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>No trades match filter</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

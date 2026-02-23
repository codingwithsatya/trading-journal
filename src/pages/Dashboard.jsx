import React from 'react';
import { StatCard, Card, CardTitle, SetupTag, BarRow, EmptyState } from '../components/UI';
import { PLAYBOOK_SETUPS, gradeColor, calcAvgGrade } from '../data/playbook';

export default function Dashboard({ trades, onAddTrade }) {
  const total = trades.length;
  const wins = trades.filter(t => t.result === 'Win').length;
  const losses = trades.filter(t => t.result === 'Loss').length;
  const wr = total ? Math.round((wins / total) * 100) : 0;
  const rrList = trades.filter(t => t.rr);
  const avgRR = rrList.length ? (rrList.reduce((s, t) => s + parseFloat(t.rr), 0) / rrList.length).toFixed(2) : '0.0';
  const avgGrade = calcAvgGrade(trades);

  // Setup win rates
  const setupData = PLAYBOOK_SETUPS.map(s => {
    const st = trades.filter(t => t.setup === s.name);
    const sw = st.filter(t => t.result === 'Win').length;
    return { name: s.name, count: st.length, wr: st.length ? Math.round((sw / st.length) * 100) : 0 };
  }).filter(s => s.count > 0);

  const best = setupData.length ? setupData.reduce((a, b) => a.wr > b.wr ? a : b) : null;
  const worst = setupData.length ? setupData.reduce((a, b) => a.wr < b.wr ? a : b) : null;

  const recent = [...trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const streakRecent = [...trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20);

  return (
    <div className="animate-in">
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
        <StatCard label="Total Trades" value={total} sub="backtested" accentColor="var(--green)" />
        <StatCard label="Win Rate" value={`${wr}%`} sub={`${wins}W / ${losses}L`} accentColor="var(--accent2)" />
        <StatCard label="Avg R:R" value={avgRR} sub="risk / reward" accentColor="var(--yellow)" />
        <StatCard label="Avg Grade" value={avgGrade} sub="playbook score" accentColor="var(--orange)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* Setup bars */}
        <Card title="Setup Win Rates">
          {setupData.length ? (
            <div>
              {setupData.map(s => (
                <BarRow
                  key={s.name}
                  label={`${s.name} (${s.count})`}
                  value={`${s.wr}%`}
                  color={s.wr >= 50 ? 'var(--green)' : 'var(--red)'}
                />
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Log trades to see setup stats</div>
          )}
        </Card>

        {/* Streak + insights */}
        <Card title="Recent Streak">
          {streakRecent.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {streakRecent.map((t, i) => (
                <div key={i} title={`${t.date} — ${t.result}`} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: t.result === 'Win' ? 'var(--green)' : t.result === 'Loss' ? 'var(--red)' : 'var(--border2)',
                }} />
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>No trades yet</div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

          <CardTitle>Best Setup</CardTitle>
          {best ? (
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>
              <span style={{ color: 'var(--green)' }}>{best.name}</span>
              <span style={{ color: 'var(--text3)' }}> — {best.wr}% WR</span>
            </div>
          ) : <div style={{ fontSize: 12, color: 'var(--text3)' }}>—</div>}

          <CardTitle style={{ marginTop: 14 }}>Worst Setup</CardTitle>
          {worst && worst.name !== best?.name ? (
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>
              <span style={{ color: 'var(--red)' }}>{worst.name}</span>
              <span style={{ color: 'var(--text3)' }}> — {worst.wr}% WR</span>
            </div>
          ) : <div style={{ fontSize: 12, color: 'var(--text3)' }}>—</div>}
        </Card>
      </div>

      {/* Recent trades table */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <CardTitle style={{ marginBottom: 0 }}>Recent Trades</CardTitle>
        </div>
        {recent.length ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Date','Setup','Dir','Entry','Exit','R:R','Result','Grade'].map(h => (
                    <th key={h} style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(t => (
                  <tr key={t.id}>
                    <td style={td}>{t.date}</td>
                    <td style={td}><SetupTag name={t.setup} /></td>
                    <td style={{ ...td, color: t.dir === 'Long' ? 'var(--green)' : 'var(--red)' }}>{t.dir}</td>
                    <td style={td}>{t.entry || '—'}</td>
                    <td style={td}>{t.exit || '—'}</td>
                    <td style={td}>{t.rr ? `${t.rr}R` : '—'}</td>
                    <td style={{ ...td, color: t.result === 'Win' ? 'var(--green)' : t.result === 'Loss' ? 'var(--red)' : 'var(--text3)' }}>{t.result}</td>
                    <td style={{ ...td, color: gradeColor(t.grade) }}>{t.grade || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon="▤" message="No trades logged yet — click + LOG TRADE to begin" />
        )}
      </Card>
    </div>
  );
}

const td = { padding: '12px 14px', fontSize: 13, borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', color: 'var(--text2)' };

import React, { useState } from 'react';
import { Card, Btn } from '../components/UI';
import { PLAYBOOK_SETUPS, SETUPS_NAMES } from '../data/playbook';

export default function SetupGrader() {
  const [selected, setSelected] = useState('');
  const [answers, setAnswers] = useState({});

  const setup = PLAYBOOK_SETUPS.find(s => s.name === selected);

  const setAnswer = (i, val) => setAnswers(a => ({ ...a, [i]: val }));

  const score = setup ? (() => {
    const total = setup.rules.length;
    const pts = Object.values(answers).reduce((s, v) => s + (v === 'yes' ? 1 : v === 'partial' ? 0.5 : 0), 0);
    const pct = Math.round((pts / total) * 100);
    let grade, color;
    if (pct >= 90) { grade = 'A+'; color = 'var(--green)'; }
    else if (pct >= 80) { grade = 'A'; color = 'var(--green)'; }
    else if (pct >= 70) { grade = 'B'; color = 'var(--accent2)'; }
    else if (pct >= 60) { grade = 'C'; color = 'var(--yellow)'; }
    else if (pct >= 50) { grade = 'D'; color = 'var(--orange)'; }
    else { grade = 'F'; color = 'var(--red)'; }
    const violations = Object.entries(answers).filter(([, v]) => v === 'no').map(([i]) => setup.rules[parseInt(i)]);
    return { pct, grade, color, violations, answered: Object.keys(answers).length, total };
  })() : null;

  const handleSetupChange = (name) => {
    setSelected(name);
    setAnswers({});
  };

  const aBtn = (idx, val, label, color) => (
    <button
      onClick={() => setAnswer(idx, val)}
      style={{
        fontFamily: 'var(--mono)', fontSize: 11, padding: '5px 12px', borderRadius: 4, cursor: 'pointer',
        border: `1px solid ${answers[idx] === val ? color : 'var(--border)'}`,
        background: answers[idx] === val ? `${color}18` : 'var(--bg3)',
        color: answers[idx] === val ? color : 'var(--text3)',
        transition: 'all 0.1s',
      }}
    >{label}</button>
  );

  return (
    <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Card>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 14 }}>Playbook Setup Grader</div>
        <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20, lineHeight: 1.6 }}>
          Select a setup and grade each rule — YES, PARTIAL, or NO. Get your playbook compliance score instantly.
        </p>

        <div style={{ marginBottom: 20 }}>
          <label>Select Setup</label>
          <select value={selected} onChange={e => handleSetupChange(e.target.value)}>
            <option value="">— Choose a setup —</option>
            {SETUPS_NAMES.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>

        {setup && (
          <div>
            {setup.rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', gap: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text2)', flex: 1 }}>{rule}</div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {aBtn(i, 'yes', 'YES', 'var(--green)')}
                  {aBtn(i, 'partial', 'PARTIAL', 'var(--yellow)')}
                  {aBtn(i, 'no', 'NO', 'var(--red)')}
                </div>
              </div>
            ))}
          </div>
        )}

        {!setup && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: 12 }}>
            Select a setup above to begin grading
          </div>
        )}
      </Card>

      <Card>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 14 }}>Score</div>

        <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg3)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 20 }}>
          {score && score.answered > 0 ? (
            <>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 56, fontWeight: 600, lineHeight: 1, color: score.color }}>{score.grade}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)', marginTop: 8, letterSpacing: 1 }}>{score.pct}% PLAYBOOK COMPLIANCE</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{score.answered}/{score.total} rules answered</div>
            </>
          ) : (
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)', letterSpacing: 2 }}>
              {selected ? 'ANSWER RULES TO SEE SCORE' : 'SELECT A SETUP TO GRADE'}
            </div>
          )}
        </div>

        {score && score.answered > 0 && (
          <div>
            {score.violations.length > 0 ? (
              <>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 1, color: 'var(--red)', marginBottom: 8, textTransform: 'uppercase' }}>Violations</div>
                {score.violations.map((v, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text3)', padding: '6px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--red)' }}>✕</span> {v}
                  </div>
                ))}
              </>
            ) : (
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)' }}>✓ No rule violations detected</div>
            )}
          </div>
        )}

        {setup && (
          <div style={{ marginTop: 20, padding: 16, background: 'var(--bg3)', borderRadius: 6, border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>Setup: {setup.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.8 }}>
              <div><span style={{ color: 'var(--accent2)' }}>Entry:</span> {setup.entry}</div>
              <div><span style={{ color: 'var(--red)' }}>Risk:</span> {setup.risk}</div>
              <div><span style={{ color: 'var(--green)' }}>Target:</span> {setup.target}</div>
              <div><span style={{ color: 'var(--yellow)' }}>Condition:</span> {setup.condition}</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

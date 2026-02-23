import React, { useState } from "react";
import {
  Card,
  Btn,
  StatCard,
  BarRow,
  EmptyState,
  Tabs,
  FormGroup,
  EmotionBtn,
} from "../components/UI";
import TradeChart from "../components/TradeChart";
import {
  PLAYBOOK_SETUPS,
  MINDSET_OPTIONS,
  gradeColor,
  calcAvgGrade,
} from "../data/playbook";

// =================== CHECKLIST ===================
export function PreTradeChecklist() {
  const [checks, setChecks] = useState(
    Array(6).fill({ checked: false, text: "" }),
  );

  const update = (i, key, val) => {
    setChecks((c) =>
      c.map((item, idx) => (idx === i ? { ...item, [key]: val } : item)),
    );
  };

  const score = checks.filter((c) => c.checked).length;
  const scoreColor =
    score === 6
      ? "var(--green)"
      : score >= 4
        ? "var(--yellow)"
        : "var(--text3)";

  const ITEMS = [
    { q: "What is the setup/thesis?", ph: "Describe the setup clearly..." },
    { q: "What's my trigger?", ph: "Exact trigger condition..." },
    { q: "What's my entry?", ph: "Entry price / level..." },
    { q: "What are my exits?", ph: "Target 1, Target 2, full exit..." },
    { q: "What is my technical stop?", ph: "Stop level..." },
    {
      q: "What is my sizing based on risk, entry, and stop?",
      ph: "Position size / contracts...",
    },
  ];

  const reset = () => setChecks(Array(6).fill({ checked: false, text: "" }));

  return (
    <div
      className="animate-in"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
    >
      <Card>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: 2,
            color: "var(--text3)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Pre-Trade Checklist
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text3)",
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          Complete this before every single trade. No exceptions.
        </p>

        {ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "10px 14px",
              background: "var(--bg3)",
              borderRadius: 6,
              border: `1px solid ${checks[i].checked ? "rgba(0,212,170,0.3)" : "var(--border)"}`,
              marginBottom: 8,
              transition: "border-color 0.15s",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--accent)",
                minWidth: 20,
                marginTop: 2,
              }}
            >
              {i + 1}.
            </span>
            <input
              type="checkbox"
              checked={checks[i].checked}
              onChange={(e) => update(i, "checked", e.target.checked)}
              style={{
                width: 16,
                height: 16,
                minWidth: 16,
                accentColor: "var(--accent)",
                marginTop: 2,
                cursor: "pointer",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: 13, color: "var(--text2)", marginBottom: 6 }}
              >
                <strong>{item.q}</strong>
              </div>
              <input
                type="text"
                placeholder={item.ph}
                value={checks[i].text}
                onChange={(e) => update(i, "text", e.target.value)}
                style={{ fontSize: 12 }}
              />
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Btn
            onClick={() => {
              if (score < 6) {
                alert("Complete all 6 items first!");
                return;
              }
              alert("✓ Pre-trade checklist complete. Trade with confidence.");
            }}
          >
            Confirm Ready to Trade
          </Btn>
          <Btn variant="outline" onClick={reset}>
            Reset
          </Btn>
        </div>
      </Card>

      <Card>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: 2,
            color: "var(--text3)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Checklist Score
        </div>
        <div
          style={{
            textAlign: "center",
            padding: 24,
            background: "var(--bg3)",
            borderRadius: 8,
            border: "1px solid var(--border)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 56,
              fontWeight: 600,
              color: scoreColor,
              lineHeight: 1,
            }}
          >
            {score}/6
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--text3)",
              letterSpacing: 2,
              marginTop: 8,
            }}
          >
            ITEMS CONFIRMED
          </div>
          {score === 6 && (
            <div
              style={{
                color: "var(--green)",
                fontFamily: "var(--mono)",
                fontSize: 11,
                marginTop: 8,
              }}
            >
              ✓ READY TO TRADE
            </div>
          )}
        </div>

        <div
          style={{
            padding: 16,
            background: "var(--bg3)",
            borderRadius: 6,
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            DAILY ROUTINE REMINDER
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 2 }}>
            ◦ 8:30am — Mark overnight / pre-market levels
            <br />
            ◦ 8:30am — Check Quant Data (SPX + Tech)
            <br />
            ◦ 8:45–9:30am — Mark opening trade plan
            <br />
            ◦ 9:40am — Mark 10min Open Range
            <br />
            ◦ Only trade CLEAR playbook setups
            <br />
            ◦ 12:30–3pm — Step away from charts
            <br />◦ 3–4pm — Trade only if setup is CLEAR
          </div>
        </div>
      </Card>
    </div>
  );
}

// =================== STATISTICS ===================
export function Statistics({ trades }) {
  const [tab, setTab] = useState("overview");
  const [tz, setTz] = useState("EST"); // timezone selector

  const wins = trades.filter((t) => t.result === "Win").length;
  const losses = trades.filter((t) => t.result === "Loss").length;
  const be = trades.filter((t) => t.result === "BE").length;
  const avgGrade = calcAvgGrade(trades);

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "bySetup", label: "By Setup" },
    { id: "timeOfDay", label: "Time of Day" },
  ];

  const longs = trades.filter((t) => t.dir === "Long");
  const shorts = trades.filter((t) => t.dir === "Short");
  const lWR = longs.length
    ? Math.round(
        (longs.filter((t) => t.result === "Win").length / longs.length) * 100,
      )
    : 0;
  const sWR = shorts.length
    ? Math.round(
        (shorts.filter((t) => t.result === "Win").length / shorts.length) * 100,
      )
    : 0;

  const graded = trades.filter((t) => t.grade);
  const grades = ["A+", "A", "B", "C", "D", "F"];
  const gradeColors = [
    "var(--green)",
    "var(--green)",
    "var(--accent2)",
    "var(--yellow)",
    "var(--orange)",
    "var(--red)",
  ];

  // helper for timezone-conversion (assume original times are Eastern)
  const TZ_OFFSETS = { EST: -5, CST: -6, MST: -7, PST: -8 };
  const baseOffset = TZ_OFFSETS["EST"];
  const offsetMinutes = ((TZ_OFFSETS[tz] || baseOffset) - baseOffset) * 60;

  const toMinutes = (timeStr) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  };
  const localMinutes = (m) =>
    m === null ? null : (m + offsetMinutes + 1440) % 1440;
  const formatMin = (m) => {
    if (m === null) return "--";
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };

  const timeSlots = [
    { start: toMinutes("9:30"), end: toMinutes("10:00"), label: "Open" },
    { start: toMinutes("10:00"), end: toMinutes("11:00"), label: "" },
    { start: toMinutes("11:00"), end: toMinutes("12:30"), label: "" },
    { start: toMinutes("15:00"), end: toMinutes("16:00"), label: "Close" },
  ].map((slot) => {
    const s = localMinutes(slot.start);
    const e = localMinutes(slot.end);
    return {
      label: `${formatMin(s)}–${formatMin(e)}${slot.label ? " " + slot.label : ""} (${tz})`,
      check: (t) => {
        const m = localMinutes(toMinutes(t.time));
        return m !== null && m >= s && m < e;
      },
    };
  });

  return (
    <div className="animate-in">
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {/* timezone picker for analysis */}
      <div style={{ margin: "12px 0", fontSize: 12 }}>
        <label style={{ marginRight: 8 }}>Timezone:</label>
        <select value={tz} onChange={(e) => setTz(e.target.value)}>
          {Object.keys(TZ_OFFSETS).map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>
      </div>

      {tab === "overview" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <StatCard
              label="Total Wins"
              value={wins}
              accentColor="var(--green)"
            />
            <StatCard
              label="Total Losses"
              value={losses}
              accentColor="var(--red)"
            />
            <StatCard
              label="Break Even"
              value={be}
              accentColor="var(--yellow)"
            />
            <StatCard
              label="Avg Grade"
              value={avgGrade}
              accentColor="var(--accent2)"
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Card title="Long vs Short">
              <BarRow
                label={`Long (${longs.length})`}
                value={`${lWR}%`}
                color="var(--green)"
              />
              <BarRow
                label={`Short (${shorts.length})`}
                value={`${sWR}%`}
                color="var(--red)"
              />
            </Card>
            <Card title="Grade Distribution">
              {grades.map((g, i) => {
                const cnt = graded.filter((t) => t.grade === g).length;
                return (
                  <BarRow
                    key={g}
                    label={g}
                    value={cnt}
                    max={graded.length || 1}
                    color={gradeColors[i]}
                  />
                );
              })}
            </Card>
          </div>

          {/* trade chart for visual analysis */}
          <div style={{ marginTop: 32 }}>
            <TradeChart trades={trades} />
          </div>
        </>
      )}

      {tab === "bySetup" && (
        <Card>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "Setup",
                    "Trades",
                    "Wins",
                    "Losses",
                    "Win Rate",
                    "Avg R:R",
                    "Avg Grade",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 9,
                        letterSpacing: 2,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        padding: "10px 14px",
                        textAlign: "left",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAYBOOK_SETUPS.map((s) => {
                  const st = trades.filter((t) => t.setup === s.name);
                  if (!st.length) return null;
                  const w = st.filter((t) => t.result === "Win").length;
                  const l = st.filter((t) => t.result === "Loss").length;
                  const wr = Math.round((w / st.length) * 100);
                  const rrList = st.filter((t) => t.rr);
                  const avgRR = rrList.length
                    ? (
                        rrList.reduce((a, t) => a + parseFloat(t.rr), 0) /
                        rrList.length
                      ).toFixed(2)
                    : "—";
                  const ag = calcAvgGrade(st);
                  const tdc = {
                    padding: "12px 14px",
                    fontSize: 13,
                    borderBottom: "1px solid var(--border)",
                    fontFamily: "var(--mono)",
                    color: "var(--text2)",
                  };
                  return (
                    <tr key={s.name}>
                      <td style={tdc}>
                        <span
                          style={{
                            background: "rgba(0,153,255,0.08)",
                            border: "1px solid rgba(0,153,255,0.2)",
                            borderRadius: 3,
                            padding: "2px 8px",
                            fontFamily: "var(--mono)",
                            fontSize: 10,
                            color: "var(--accent2)",
                          }}
                        >
                          {s.name}
                        </span>
                      </td>
                      <td style={tdc}>{st.length}</td>
                      <td style={{ ...tdc, color: "var(--green)" }}>{w}</td>
                      <td style={{ ...tdc, color: "var(--red)" }}>{l}</td>
                      <td
                        style={{
                          ...tdc,
                          color: wr >= 50 ? "var(--green)" : "var(--red)",
                        }}
                      >
                        {wr}%
                      </td>
                      <td style={tdc}>{avgRR}</td>
                      <td style={{ ...tdc, color: gradeColor(ag) }}>{ag}</td>
                    </tr>
                  );
                }).filter(Boolean)}
                {!PLAYBOOK_SETUPS.some((s) =>
                  trades.some((t) => t.setup === s.name),
                ) && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: 40,
                        color: "var(--text3)",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      No data yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "timeOfDay" && (
        <Card title="Performance By Time of Day">
          {timeSlots.map((slot) => {
            const st = trades.filter(slot.check);
            const wr = st.length
              ? Math.round(
                  (st.filter((t) => t.result === "Win").length / st.length) *
                    100,
                )
              : 0;
            return (
              <div key={slot.label} style={{ marginBottom: 16 }}>
                <BarRow
                  label={slot.label}
                  value={`${wr}%`}
                  color={wr >= 50 ? "var(--green)" : "var(--red)"}
                />
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--text3)",
                    marginLeft: 172,
                  }}
                >
                  {st.length} trades
                </div>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}

// =================== WEEKLY REVIEW ===================
export function WeeklyReview({ reviews, onSave }) {
  const [form, setForm] = useState({
    week: "",
    well: "",
    mistakes: "",
    focus: "",
    mindset: "Disciplined & Focused",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div
      className="animate-in"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
    >
      <Card title="Weekly Review Entry">
        <FormGroup label="Week Of" style={{ marginBottom: 12 }}>
          <input
            type="week"
            value={form.week}
            onChange={(e) => set("week", e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label="What did I do well this week?"
          style={{ marginBottom: 12 }}
        >
          <textarea
            placeholder="Setups I executed cleanly, discipline maintained..."
            value={form.well}
            onChange={(e) => set("well", e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label="What mistakes did I repeat?"
          style={{ marginBottom: 12 }}
        >
          <textarea
            placeholder="Chasing entries, ignoring stops, overtrading..."
            value={form.mistakes}
            onChange={(e) => set("mistakes", e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label="What will I focus on improving?"
          style={{ marginBottom: 12 }}
        >
          <textarea
            placeholder="Specific rule or behavior to work on..."
            value={form.focus}
            onChange={(e) => set("focus", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Overall Mindset" style={{ marginBottom: 16 }}>
          <select
            value={form.mindset}
            onChange={(e) => set("mindset", e.target.value)}
          >
            {[
              "Disciplined & Focused",
              "Good but Distracted",
              "Emotional & Impulsive",
              "Revenge Trading",
              "Fearful / Hesitant",
              "Overconfident",
            ].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </FormGroup>
        <Btn
          onClick={() => {
            onSave(form);
            setForm({
              week: "",
              well: "",
              mistakes: "",
              focus: "",
              mindset: "Disciplined & Focused",
            });
          }}
        >
          Save Review
        </Btn>
      </Card>

      <Card title="Past Weekly Reviews">
        {reviews.length ? (
          <div style={{ maxHeight: 600, overflowY: "auto" }}>
            {[...reviews].reverse().map((r) => (
              <div
                key={r.id}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: 14,
                  marginBottom: 10,
                  background: "var(--bg3)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--accent)",
                    }}
                  >
                    {r.week || "No date"}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "var(--text3)",
                    }}
                  >
                    {r.mindset}
                  </span>
                </div>
                {r.well && (
                  <div style={{ fontSize: 12, marginBottom: 6 }}>
                    <span
                      style={{
                        color: "var(--green)",
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                      }}
                    >
                      WELL:{" "}
                    </span>
                    {r.well}
                  </div>
                )}
                {r.mistakes && (
                  <div style={{ fontSize: 12, marginBottom: 6 }}>
                    <span
                      style={{
                        color: "var(--red)",
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                      }}
                    >
                      MISTAKES:{" "}
                    </span>
                    {r.mistakes}
                  </div>
                )}
                {r.focus && (
                  <div style={{ fontSize: 12 }}>
                    <span
                      style={{
                        color: "var(--yellow)",
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                      }}
                    >
                      FOCUS:{" "}
                    </span>
                    {r.focus}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="◫" message="No weekly reviews yet" />
        )}
      </Card>
    </div>
  );
}

// =================== MISTAKE TRACKER ===================
export function MistakeTracker({ trades, customMistakes, onAddCustom }) {
  const [custom, setCustom] = useState("");

  const allMistakes = trades.flatMap((t) =>
    Array.isArray(t.mistakes)
      ? t.mistakes
      : (t.mistakes || "").split(", ").filter(Boolean),
  );
  const freq = {};
  allMistakes.forEach((m) => (freq[m] = (freq[m] || 0) + 1));
  customMistakes.forEach((m) => {
    if (!freq[m]) freq[m] = 0;
  });

  const tdc = {
    padding: "12px 14px",
    fontSize: 13,
    borderBottom: "1px solid var(--border)",
    fontFamily: "var(--mono)",
    color: "var(--text2)",
  };

  return (
    <div className="animate-in">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card title="Mistake Frequency">
          {Object.keys(freq).length ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(freq)
                .sort((a, b) => b[1] - a[1])
                .map(([m, cnt]) => (
                  <span
                    key={m}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,71,87,0.08)",
                      border: "1px solid rgba(255,71,87,0.2)",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--red)",
                    }}
                  >
                    {m}
                    {cnt > 0 && (
                      <span
                        style={{
                          background: "rgba(255,71,87,0.2)",
                          borderRadius: 10,
                          padding: "0 6px",
                          fontSize: 10,
                        }}
                      >
                        {cnt}
                      </span>
                    )}
                  </span>
                ))}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: "var(--text3)" }}>
              No mistakes logged yet
            </div>
          )}
        </Card>

        <Card title="Add Custom Mistake Pattern">
          <FormGroup label="Mistake Description" style={{ marginBottom: 12 }}>
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="e.g. Entered before confirmation..."
            />
          </FormGroup>
          <Btn
            variant="outline"
            onClick={() => {
              if (custom.trim()) {
                onAddCustom(custom.trim());
                setCustom("");
              }
            }}
          >
            Add Pattern
          </Btn>
        </Card>
      </div>

      <Card title="Mistakes By Trade">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Date", "Setup", "Mistakes", "Result"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: 2,
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      padding: "10px 14px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades
                .filter(
                  (t) =>
                    t.mistakes &&
                    (Array.isArray(t.mistakes)
                      ? t.mistakes.length > 0
                      : t.mistakes.length > 0),
                )
                .map((t) => {
                  const m = Array.isArray(t.mistakes)
                    ? t.mistakes
                    : t.mistakes.split(", ").filter(Boolean);
                  return (
                    <tr key={t.id}>
                      <td style={tdc}>{t.date}</td>
                      <td style={tdc}>
                        <span
                          style={{
                            background: "rgba(0,153,255,0.08)",
                            border: "1px solid rgba(0,153,255,0.2)",
                            borderRadius: 3,
                            padding: "2px 8px",
                            fontFamily: "var(--mono)",
                            fontSize: 10,
                            color: "var(--accent2)",
                          }}
                        >
                          {t.setup}
                        </span>
                      </td>
                      <td style={tdc}>
                        {m.map((x) => (
                          <span
                            key={x}
                            style={{
                              display: "inline-block",
                              background: "rgba(255,71,87,0.08)",
                              border: "1px solid rgba(255,71,87,0.2)",
                              borderRadius: 20,
                              padding: "2px 8px",
                              fontFamily: "var(--mono)",
                              fontSize: 10,
                              color: "var(--red)",
                              margin: "2px",
                            }}
                          >
                            {x}
                          </span>
                        ))}
                      </td>
                      <td
                        style={{
                          ...tdc,
                          color:
                            t.result === "Win"
                              ? "var(--green)"
                              : t.result === "Loss"
                                ? "var(--red)"
                                : "var(--text3)",
                        }}
                      >
                        {t.result}
                      </td>
                    </tr>
                  );
                })}
              {!trades.some(
                (t) =>
                  t.mistakes &&
                  (Array.isArray(t.mistakes)
                    ? t.mistakes.length > 0
                    : t.mistakes.length > 0),
              ) && (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      textAlign: "center",
                      padding: 40,
                      color: "var(--text3)",
                      fontFamily: "var(--mono)",
                    }}
                  >
                    No mistakes logged yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// =================== MINDSET ===================
export function Mindset({ logs, onSave }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    emotions: [],
    sleep: 0,
    discipline: 0,
    notes: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleEmo = (e) =>
    set(
      "emotions",
      form.emotions.includes(e)
        ? form.emotions.filter((x) => x !== e)
        : [...form.emotions, e],
    );

  const avgDiscipline = logs.length
    ? Math.round(
        logs.reduce((a, m) => a + (m.discipline || 0), 0) / logs.length,
      )
    : 0;
  const avgSleep = logs.length
    ? (logs.reduce((a, m) => a + (m.sleep || 0), 0) / logs.length).toFixed(1)
    : 0;

  return (
    <div
      className="animate-in"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
    >
      <Card title="Daily Mindset Log">
        <FormGroup label="Date" style={{ marginBottom: 14 }}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </FormGroup>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Pre-Market State
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {MINDSET_OPTIONS.map((e) => (
              <EmotionBtn
                key={e}
                label={e}
                selected={form.emotions.includes(e)}
                onClick={() => toggleEmo(e)}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Sleep Quality (1–5)
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => set("sleep", n)}
                style={{
                  background:
                    form.sleep >= n ? "rgba(255,211,42,0.1)" : "var(--bg3)",
                  border: `1px solid ${form.sleep >= n ? "var(--yellow)" : "var(--border)"}`,
                  color: form.sleep >= n ? "var(--yellow)" : "var(--text3)",
                  borderRadius: 4,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  transition: "all 0.1s",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Discipline Score (1–10)
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <button
                key={n}
                onClick={() => set("discipline", n)}
                style={{
                  background:
                    form.discipline >= n ? "rgba(0,212,170,0.1)" : "var(--bg3)",
                  border: `1px solid ${form.discipline >= n ? "var(--accent)" : "var(--border)"}`,
                  color:
                    form.discipline >= n ? "var(--accent)" : "var(--text3)",
                  borderRadius: 4,
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  transition: "all 0.1s",
                  minWidth: 36,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <FormGroup label="Notes / Journal" style={{ marginBottom: 16 }}>
          <textarea
            placeholder="How are you feeling today? Any stress, distractions, or areas of focus?"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </FormGroup>
        <Btn
          onClick={() => {
            onSave(form);
            set("notes", "");
            set("emotions", []);
            set("sleep", 0);
            set("discipline", 0);
          }}
        >
          Save Mindset Log
        </Btn>
      </Card>

      <div>
        <Card title="Mindset Averages" style={{ marginBottom: 16 }}>
          {logs.length ? (
            <>
              <BarRow
                label="Avg Discipline"
                value={`${avgDiscipline}/10`}
                color="var(--accent2)"
              />
              <BarRow
                label="Avg Sleep"
                value={`${avgSleep}/5`}
                color="var(--yellow)"
              />
            </>
          ) : (
            <div style={{ fontSize: 12, color: "var(--text3)" }}>
              Log entries to see averages
            </div>
          )}
        </Card>

        <Card title="Mindset Logs">
          {logs.length ? (
            <div style={{ maxHeight: 440, overflowY: "auto" }}>
              {[...logs].reverse().map((m) => (
                <div
                  key={m.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: 12,
                    marginBottom: 8,
                    background: "var(--bg3)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        color: "var(--accent)",
                      }}
                    >
                      {m.date}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        color: "var(--text3)",
                      }}
                    >
                      Sleep: {m.sleep}/5 · Disc: {m.discipline}/10
                    </span>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    {(m.emotions || []).map((e) => (
                      <span
                        key={e}
                        style={{
                          display: "inline-block",
                          background: "rgba(0,212,170,0.08)",
                          border: "1px solid rgba(0,212,170,0.15)",
                          borderRadius: 12,
                          padding: "2px 8px",
                          margin: "2px",
                          color: "var(--accent)",
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                        }}
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  {m.notes && (
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>
                      {m.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon="◐" message="No mindset logs yet" />
          )}
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// chart component with multiple modes (daily count, setup breakout, pnl curve)
export default function TradeChart({ trades = [] }) {
  const [mode, setMode] = useState("daily");

  const toMinutes = (timeStr) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  };
  const TZ_OFFSETS = { EST: -5, CST: -6, MST: -7, PST: -8 };
  const baseOffset = TZ_OFFSETS["EST"];

  // convert a trade's reported time and timezone into a minute count in the
  // currently-selected view zone (assumes view zone is EST for this chart but
  // we support per-trade timezone).
  const convertTime = (t, viewTz = "EST") => {
    const m = toMinutes(t.time);
    if (m === null) return null;
    const tradeOff = TZ_OFFSETS[t.tz || "EST"] || baseOffset;
    const viewOff = TZ_OFFSETS[viewTz] || baseOffset;
    // first bring to EST reference
    const est = (m + (baseOffset - tradeOff) * 60 + 1440) % 1440;
    // then shift to view zone
    return (est + (viewOff - baseOffset) * 60 + 1440) % 1440;
  };

  // ---------- daily view ----------
  const daily = trades.reduce((acc, t) => {
    const d = t.date || "unknown";
    if (!acc[d]) acc[d] = { date: d, trades: 0, wins: 0 };
    acc[d].trades += 1;
    if (t.result === "Win") acc[d].wins += 1;
    return acc;
  }, {});

  const dailyData = Object.values(daily)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((d) => ({
      ...d,
      winRate: d.trades ? Math.round((d.wins / d.trades) * 100) : 0,
    }));

  // ---------- setup breakout ----------
  const setups = [...new Set(trades.map((t) => t.setup))];
  const breakdown = trades.reduce((acc, t) => {
    const d = t.date || "unknown";
    if (!acc[d]) acc[d] = { date: d };
    acc[d][t.setup] = (acc[d][t.setup] || 0) + 1;
    return acc;
  }, {});
  const breakdownData = Object.values(breakdown).sort((a, b) =>
    a.date > b.date ? 1 : -1,
  );

  // ---------- pnl curve ----------
  const getPnl = (t) => {
    const e = parseFloat(t.entry);
    const x = parseFloat(t.exit);
    if (isNaN(e) || isNaN(x)) return 0;
    const raw = t.dir === "Short" ? e - x : x - e;
    return raw;
  };
  const pnlByDate = trades.reduce((acc, t) => {
    const d = t.date || "unknown";
    if (!acc[d]) acc[d] = { date: d, pnl: 0 };
    acc[d].pnl += getPnl(t);
    return acc;
  }, {});
  const pnlData = Object.values(pnlByDate)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((d) => ({ ...d }));
  let running = 0;
  pnlData.forEach((d) => {
    running += d.pnl;
    d.cumPnl = running;
  });

  let displayData = dailyData;
  if (mode === "setup") displayData = breakdownData;
  else if (mode === "pnl") displayData = pnlData;

  if (!displayData.length) {
    return (
      <div style={{ textAlign: "center", color: "var(--text3)", padding: 20 }}>
        No trades to chart
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 12 }}>
        <button
          onClick={() => setMode("daily")}
          style={{ marginRight: 6, padding: "2px 6px" }}
        >
          Daily
        </button>
        <button
          onClick={() => setMode("setup")}
          style={{ marginRight: 6, padding: "2px 6px" }}
        >
          By Setup
        </button>
        <button onClick={() => setMode("pnl")} style={{ padding: "2px 6px" }}>
          P/L Curve
        </button>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={displayData}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
          {mode === "daily" && (
            <>
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Bar yAxisId="left" dataKey="trades" fill="var(--accent2)" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="winRate"
                stroke="var(--green)"
              />
            </>
          )}
          {mode === "setup" &&
            setups.map((s, i) => <Bar key={s} stackId="a" dataKey={s} />)}
          {mode === "pnl" && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="cumPnl"
              stroke="var(--accent)"
            />
          )}
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 10 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

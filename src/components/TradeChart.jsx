import React from "react";
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

// simple chart showing daily trade count and win rate
export default function TradeChart({ trades = [] }) {
  // aggregate by date (assumes trades have a .date string in YYYY-MM-DD format)
  const daily = trades.reduce((acc, t) => {
    const d = t.date || "unknown";
    if (!acc[d]) acc[d] = { date: d, trades: 0, wins: 0 };
    acc[d].trades += 1;
    if (t.result === "Win") acc[d].wins += 1;
    return acc;
  }, {});

  const data = Object.values(daily)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((d) => ({
      ...d,
      winRate: d.trades ? Math.round((d.wins / d.trades) * 100) : 0,
    }));

  if (!data.length) {
    return (
      <div style={{ textAlign: "center", color: "var(--text3)", padding: 20 }}>
        No trades to chart
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data}>
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis yAxisId="left" allowDecimals={false} tick={{ fontSize: 10 }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
        />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 10 }} />
        <Bar yAxisId="left" dataKey="trades" fill="var(--accent2)" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="winRate"
          stroke="var(--green)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

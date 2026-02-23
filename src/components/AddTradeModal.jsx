import React, { useState } from "react";
import { Modal, Btn, FormGroup, GradeBtn, EmotionBtn } from "./UI";
import { SETUPS_NAMES, MISTAKES_LIST, TRADE_MINDSET } from "../data/playbook";

const INITIAL = {
  date: new Date().toISOString().split("T")[0],
  time: "",
  tz: "EST",
  setup: "10 Min ORB",
  dir: "Long",
  entry: "",
  stop: "",
  target: "",
  exit: "",
  result: "Win",
  rr: "",
  grade: "",
  mindset: [],
  mistakes: [],
  notes: "",
};

export default function AddTradeModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(INITIAL);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggle = (key, val) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val)
        ? f[key].filter((x) => x !== val)
        : [...f[key], val],
    }));

  const handleSave = () => {
    // compute rr if missing
    let rr = form.rr ? parseFloat(form.rr) : null;
    if (!rr && form.entry && form.stop && form.exit) {
      const risk = Math.abs(parseFloat(form.entry) - parseFloat(form.stop));
      const reward = Math.abs(parseFloat(form.exit) - parseFloat(form.entry));
      if (risk > 0) rr = parseFloat((reward / risk).toFixed(2));
    }

    // convert time to EST for storage (keep original tz as well)
    const TZ_OFFSETS = { EST: -5, CST: -6, MST: -7, PST: -8 };
    const toMinutes = (str) => {
      if (!str) return null;
      const [h, m] = str.split(":").map(Number);
      return isNaN(h) || isNaN(m) ? null : h * 60 + m;
    };
    const normalize = (time, tz) => {
      const m = toMinutes(time);
      if (m === null) return "";
      const est =
        (m +
          (TZ_OFFSETS["EST"] - (TZ_OFFSETS[tz] || TZ_OFFSETS["EST"])) * 60 +
          1440) %
        1440;
      const hh = Math.floor(est / 60);
      const mm = est % 60;
      return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    };

    const estTime = normalize(form.time, form.tz);

    onSave({ ...form, rr: rr || "", estTime });
    setForm({ ...INITIAL, date: form.date });
    onClose();
  };

  const grid2 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginBottom: 14,
  };
  const grid3 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 14,
    marginBottom: 14,
  };
  // first row with date / time / zone uses three columns
  const gridTime = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 14,
    marginBottom: 14,
  };

  return (
    <Modal open={open} onClose={onClose} title="◈ Log Backtest Trade">
      <div style={gridTime}>
        <FormGroup label="Date">
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Time">
          <input
            type="time"
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Zone">
          <select value={form.tz} onChange={(e) => set("tz", e.target.value)}>
            <option>EST</option>
            <option>CST</option>
            <option>MST</option>
            <option>PST</option>
          </select>
        </FormGroup>
      </div>
      <div style={grid2}>
        <FormGroup label="Setup">
          <select
            value={form.setup}
            onChange={(e) => set("setup", e.target.value)}
          >
            {SETUPS_NAMES.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Direction">
          <select value={form.dir} onChange={(e) => set("dir", e.target.value)}>
            <option>Long</option>
            <option>Short</option>
          </select>
        </FormGroup>
      </div>
      <div style={grid3}>
        <FormGroup label="Entry">
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            value={form.entry}
            onChange={(e) => set("entry", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Stop Loss">
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            value={form.stop}
            onChange={(e) => set("stop", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Target">
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            value={form.target}
            onChange={(e) => set("target", e.target.value)}
          />
        </FormGroup>
      </div>
      <div style={grid3}>
        <FormGroup label="Exit Price">
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            value={form.exit}
            onChange={(e) => set("exit", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Result">
          <select
            value={form.result}
            onChange={(e) => set("result", e.target.value)}
          >
            <option>Win</option>
            <option>Loss</option>
            <option>BE</option>
          </select>
        </FormGroup>
        <FormGroup label="R:R Achieved">
          <input
            type="number"
            placeholder="e.g. 2.5"
            step="0.1"
            value={form.rr}
            onChange={(e) => set("rr", e.target.value)}
          />
        </FormGroup>
      </div>

      {/* Grade */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", marginBottom: 8 }}>Setup Grade</label>
        <div style={{ display: "flex", gap: 8 }}>
          {["A+", "A", "B", "C", "D", "F"].map((g) => (
            <GradeBtn
              key={g}
              grade={g}
              active={form.grade === g}
              onClick={() => set("grade", g)}
            />
          ))}
        </div>
      </div>

      {/* Mindset */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Mindset During Trade
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TRADE_MINDSET.map((m) => (
            <EmotionBtn
              key={m}
              label={m}
              selected={form.mindset.includes(m)}
              onClick={() => toggle("mindset", m)}
            />
          ))}
        </div>
      </div>

      {/* Mistakes */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Mistakes Made
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {MISTAKES_LIST.map((m) => (
            <EmotionBtn
              key={m}
              label={m}
              selected={form.mistakes.includes(m)}
              onClick={() => toggle("mistakes", m)}
            />
          ))}
        </div>
      </div>

      <FormGroup label="Trade Notes" style={{ marginBottom: 8 }}>
        <textarea
          placeholder="Describe the setup, what went right, what went wrong, market context..."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          style={{ minHeight: 80 }}
        />
      </FormGroup>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <Btn variant="outline" onClick={onClose}>
          Cancel
        </Btn>
        <Btn onClick={handleSave}>Save Trade</Btn>
      </div>
    </Modal>
  );
}

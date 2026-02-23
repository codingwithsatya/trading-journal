import React, { useState, useCallback } from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import AddTradeModal from "./components/AddTradeModal";
import { Toast, Badge, Btn } from "./components/UI";
import { useStore } from "./hooks/useStore";
import { useAuth } from "./AuthProvider";

import Dashboard from "./pages/Dashboard";
import Playbook from "./pages/Playbook";
import TradeLog from "./pages/TradeLog";
import SetupGrader from "./pages/SetupGrader";
import {
  PreTradeChecklist,
  Statistics,
  WeeklyReview,
  MistakeTracker,
  Mindset,
} from "./pages/OtherPages";

const PAGE_TITLES = {
  dashboard: "DASHBOARD",
  playbook: "PLAYBOOK",
  log: "TRADE LOG",
  grader: "SETUP GRADER",
  checklist: "PRE-TRADE CHECKLIST",
  stats: "STATISTICS",
  weekly: "WEEKLY REVIEW",
  mistakes: "MISTAKE TRACKER",
  mindset: "MINDSET TRACKER",
};

export default function App() {
  const { user, login, logout } = useAuth();

  const [page, setPage] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const store = useStore(user);

  const showToast = useCallback((msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }, []);

  const handleSaveTrade = useCallback(
    (trade) => {
      store.addTrade(trade);
      showToast("✓ Trade logged successfully");
    },
    [store, showToast],
  );

  const handleDeleteTrade = useCallback(
    (id) => {
      store.deleteTrade(id);
      showToast("Trade deleted");
    },
    [store, showToast],
  );

  const handleSaveWeekly = useCallback(
    (review) => {
      store.addWeeklyReview(review);
      showToast("✓ Weekly review saved");
    },
    [store, showToast],
  );

  const handleSaveMindset = useCallback(
    (log) => {
      store.addMindsetLog(log);
      showToast("✓ Mindset log saved");
    },
    [store, showToast],
  );

  const handleAddMistake = useCallback(
    (m) => {
      store.addCustomMistake(m);
      showToast("✓ Mistake pattern added");
    },
    [store, showToast],
  );

  const total = store.trades.length;
  const wins = store.trades.filter((t) => t.result === "Win").length;
  const wr = total ? Math.round((wins / total) * 100) : 0;

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            trades={store.trades}
            onAddTrade={() => setModalOpen(true)}
          />
        );
      case "playbook":
        return <Playbook trades={store.trades} />;
      case "log":
        return (
          <TradeLog
            trades={store.trades}
            onDelete={handleDeleteTrade}
            onAdd={() => setModalOpen(true)}
          />
        );
      case "grader":
        return <SetupGrader />;
      case "checklist":
        return <PreTradeChecklist />;
      case "stats":
        return <Statistics trades={store.trades} />;
      case "weekly":
        return (
          <WeeklyReview
            reviews={store.weeklyReviews}
            onSave={handleSaveWeekly}
          />
        );
      case "mistakes":
        return (
          <MistakeTracker
            trades={store.trades}
            customMistakes={store.customMistakes}
            onAddCustom={handleAddMistake}
          />
        );
      case "mindset":
        return <Mindset logs={store.mindsetLogs} onSave={handleSaveMindset} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar active={page} onNav={setPage} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "rgba(10,12,15,0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 100,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 1,
              color: "var(--text)",
            }}
          >
            {PAGE_TITLES[page]}
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {user ? (
              <>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text3)",
                  }}
                >
                  {user.email}
                </span>
                <Btn size="sm" variant="outline" onClick={logout}>
                  Sign out
                </Btn>
              </>
            ) : (
              <Btn size="sm" variant="outline" onClick={login}>
                Sign in
              </Btn>
            )}
            <Badge type="blue">{total} TRADES</Badge>
            <Badge type={wr >= 50 ? "green" : "red"}>{wr}% WR</Badge>
            <Btn size="sm" onClick={() => setModalOpen(true)}>
              + LOG TRADE
            </Btn>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          {renderPage()}
        </div>
      </div>

      <AddTradeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTrade}
      />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}

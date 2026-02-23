import { useState, useCallback } from 'react';

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });

  const set = useCallback((val) => {
    setValue(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return [value, set];
}

export function useStore() {
  const [trades, setTrades] = useLocalStorage('tf_trades', []);
  const [weeklyReviews, setWeeklyReviews] = useLocalStorage('tf_weekly', []);
  const [mindsetLogs, setMindsetLogs] = useLocalStorage('tf_mindset', []);
  const [customMistakes, setCustomMistakes] = useLocalStorage('tf_mistakes', []);

  const addTrade = useCallback((trade) => {
    setTrades(prev => [...prev, { ...trade, id: Date.now() }]);
  }, [setTrades]);

  const deleteTrade = useCallback((id) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  }, [setTrades]);

  const addWeeklyReview = useCallback((review) => {
    setWeeklyReviews(prev => [...prev, { ...review, id: Date.now() }]);
  }, [setWeeklyReviews]);

  const addMindsetLog = useCallback((log) => {
    setMindsetLogs(prev => [...prev, { ...log, id: Date.now() }]);
  }, [setMindsetLogs]);

  const addCustomMistake = useCallback((m) => {
    setCustomMistakes(prev => [...prev, m]);
  }, [setCustomMistakes]);

  return {
    trades, addTrade, deleteTrade,
    weeklyReviews, addWeeklyReview,
    mindsetLogs, addMindsetLog,
    customMistakes, addCustomMistake
  };
}

import { useState, useCallback } from "react";

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (val) => {
      setValue((prev) => {
        const next = typeof val === "function" ? val(prev) : val;
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  return [value, set];
}

export function useStore(user = null) {
  // namespaced keys; using UID prevents overlap between users when using
  // the browser local storage fallback.  In a production app you'd also
  // mirror these collections to a backend such as Firestore (see comments).
  const uid = user ? user.uid : null;
  const tradesKey = uid ? `tf_trades_${uid}` : "tf_trades";
  const weeklyKey = uid ? `tf_weekly_${uid}` : "tf_weekly";
  const mindsetKey = uid ? `tf_mindset_${uid}` : "tf_mindset";
  const mistakesKey = uid ? `tf_mistakes_${uid}` : "tf_mistakes";

  const [trades, setTrades] = useLocalStorage(tradesKey, []);
  const [weeklyReviews, setWeeklyReviews] = useLocalStorage(weeklyKey, []);
  const [mindsetLogs, setMindsetLogs] = useLocalStorage(mindsetKey, []);
  const [customMistakes, setCustomMistakes] = useLocalStorage(mistakesKey, []);

  // example firestore sync (requires firebase/db configuration):
  // import { db } from '../firebase';
  // import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
  // const syncRemote = async () => {
  //   if (user) {
  //     const q = query(collection(db, 'trades'), where('uid','==',user.uid));
  //     const snap = await getDocs(q);
  //     const remoteData = snap.docs.map(d=>d.data());
  //     setTrades(remoteData);
  //   }
  // };
  // useEffect(() => { syncRemote(); }, [user]);

  const addTrade = useCallback(
    (trade) => {
      setTrades((prev) => [...prev, { ...trade, id: Date.now() }]);
    },
    [setTrades],
  );

  const deleteTrade = useCallback(
    (id) => {
      setTrades((prev) => prev.filter((t) => t.id !== id));
    },
    [setTrades],
  );

  const addWeeklyReview = useCallback(
    (review) => {
      setWeeklyReviews((prev) => [...prev, { ...review, id: Date.now() }]);
    },
    [setWeeklyReviews],
  );

  const addMindsetLog = useCallback(
    (log) => {
      setMindsetLogs((prev) => [...prev, { ...log, id: Date.now() }]);
    },
    [setMindsetLogs],
  );

  const addCustomMistake = useCallback(
    (m) => {
      setCustomMistakes((prev) => [...prev, m]);
    },
    [setCustomMistakes],
  );

  return {
    trades,
    addTrade,
    deleteTrade,
    weeklyReviews,
    addWeeklyReview,
    mindsetLogs,
    addMindsetLog,
    customMistakes,
    addCustomMistake,
  };
}

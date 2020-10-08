import { useState, useEffect } from "react";

export default function useVisualHook(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(mode, replace = false) {
    if (replace) {
      setHistory([...history.slice(0, -1), mode]);
    } else {
      setHistory([...history, mode]);
    }
    setMode(mode);
  }

  function back() {
    if (history.length > 1) {
      const sliced = history.slice(0, -1);
      setHistory(sliced);
      setMode(sliced[sliced.length - 1]);
    } else {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };
}

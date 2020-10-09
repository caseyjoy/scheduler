import { useState } from "react";

// a custom hook for changing the current state of an Appointment component
export default function useVisualHook(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  // adds a new mode to the end of history, and replaces it in place if replace is true
  function transition(mode, replace = false) {
    if (replace) {
      // if replace is true, slice everything but the last element and add the new mode to the new list
      setHistory([...history.slice(0, -1), mode]);
    } else {
      // otherwise, just add it to the end
      setHistory([...history, mode]);
    }
    setMode(mode);
  }

  // a function for removing the most recent mode from history, and setting mode to the new last mode
  function back() {
    // can only go back if there's a mode to go back to
    if (history.length > 1) {
      // slice everything but the last element, and set the mode to the last element
      const sliced = history.slice(0, -1);
      setHistory(sliced);
      setMode(sliced[sliced.length - 1]);
    } else {
      // otherwise, just set the mode to the most recent mode in history, just in case
      setMode(history[0]);
    }
  }

  // this hook returns the current mode, as well as the functions for changing it
  return { mode, transition, back };
}

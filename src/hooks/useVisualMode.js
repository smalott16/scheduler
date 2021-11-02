import { useState } from 'react';

export default function useVisualMode(modeInit) {
  const [mode, setMode] = useState(modeInit);
  const [history, setHistory] = useState([modeInit]);
  let updatedHistory = [...history];

  const transition = (modeInit, replace = false) => {
    if(replace) {
      updatedHistory.splice(-1, 1, modeInit)
    } 
    
    if (!replace) {
      updatedHistory.push(modeInit);
    }
    console.log(replace, updatedHistory)
    setHistory(updatedHistory);
    //setHistory((prev) => ([...prev, modeInit]));
    return setMode(updatedHistory.slice(-1)[0]);
  };

  const back = () => {
    console.log("back", updatedHistory)
    if (updatedHistory.length > 1) {
      updatedHistory.pop()
      setHistory(updatedHistory)
      return setMode(updatedHistory.slice(-1)[0]);
    }
  };

  return { mode, transition, back }
};


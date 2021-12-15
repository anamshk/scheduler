import { useState } from 'react';

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory((prev) => {
      const historyCopy = [...prev];
      if (replace === true) {
        historyCopy.pop();
      }
      historyCopy.push(newMode);
      return historyCopy;
      });

    };

    const back = () => {

      if (history.length < 2) {
        return;
      }
      setHistory((prev) => {
        const historyCopy = [...prev];
        historyCopy.pop();
        return historyCopy;
      });



    };

    const mode = history[history.length - 1];

    return ({ transition, back, mode});
}
import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useInput from "./useInput";
import useCountdown from "./useCountdown";

import { NUMBER_OF_WORDS, COUNTDOWN_SECONDS, countErrors } from "../utils";

export type State = "start" | "run" | "finish";

function useApp() {
  const [state, setState] = useState<State>("start");
  const [errors, setErrors] = useState(0);

  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { input, cursor, clearInput, resetInput, totalTyped } = useInput(
    state !== "finish"
  );
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(COUNTDOWN_SECONDS);

  const isStarting = state === "start" && cursor > 0;
  const isWordsListEnded = cursor === words.length;

  // Calculating Errors

  const addErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(input, wordsReached));
  }, [input, words, cursor]);

  // Showing new words if previous list is finished

  useEffect(() => {
    if (isWordsListEnded) {
      addErrors();
      updateWords();
      clearInput();
    }
  }, [isWordsListEnded]);

  // Handling Countdown Timer

  useEffect(() => {
    if (isStarting) {
      console.log("Starting");
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  useEffect(() => {
    if (!timeLeft && state === "run") {
      console.log("Time's up");
      setState("finish");
      addErrors();
    }
  }, [timeLeft, state]);

  // Handling Refresh Button

  const refresh = useCallback(() => {
    console.log("Restarted");
    resetCountdown();
    resetInput();
    setState("start");
    setErrors(0);
    updateWords();
    clearInput();
  }, [resetCountdown, resetInput, updateWords, clearInput]);

  return {
    state,
    words,
    input,
    totalTyped,
    errors,
    timeLeft,
    refresh,
  };
}

export default useApp;

import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils";

function useInput(enabled: boolean) {
  const [cursor, setCursor] = useState(0);
  const [input, setInput] = useState<string>("");
  const totalTyped = useRef(0);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
          setInput((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          setInput((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    },
    [cursor, enabled]
  );

  const clearInput = () => {
    setInput("");
    setCursor(0);
  };

  const resetInput = () => {
    totalTyped.current = 0;
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    input,
    cursor,
    clearInput,
    resetInput,
    totalTyped: totalTyped.current,
  };
}

export default useInput;

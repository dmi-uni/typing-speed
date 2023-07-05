import React from "react";
import RefreshButton from "../components/RefreshButton";
import Results from "../components/Results";
import UserInput from "../components/UserInput";

import useApp from "../hooks/useApp";

function App() {
  const { state, words, input, totalTyped, errors, timeLeft, refresh } =
    useApp();

  return (
    <div className="App">
      <CountdownTimer timeLeft={timeLeft} />

      <WordsContainer>
        <GeneratedWords words={words} />
        <UserInput className="user-input" words={words} userInput={input} />
      </WordsContainer>

      <RefreshButton className={"refresh-btn"} onRefresh={refresh} />
      <Results
        className="results"
        state={state}
        total={totalTyped}
        errors={errors}
      />
    </div>
  );
}

function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  return <h2 className="timer accent">{timeLeft}</h2>;
}

function GeneratedWords({ words }: { words: string }) {
  return <div className="generated">{words}</div>;
}

function WordsContainer({ children }: { children: React.ReactNode }) {
  return <div className="words">{children}</div>;
}

export default App;

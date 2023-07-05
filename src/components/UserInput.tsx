import classNames from "classnames";
import Caret from "./Caret";

function UserInput({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className?: string;
  words: string;
}) {
  const typedChars = userInput.split("");

  return (
    <div className={className}>
      {typedChars.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
}

function Character({ actual, expected }: { actual: string; expected: string }) {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={classNames({
        "wrong-char error": !isCorrect && !isWhiteSpace,
        "correct-char": isCorrect && !isWhiteSpace,
        "wrong-space": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
}

export default UserInput;

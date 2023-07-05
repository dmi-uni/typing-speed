export const NUMBER_OF_WORDS = 15;
export const COUNTDOWN_SECONDS = 30;

export function isKeyboardCodeAllowed(code: string) {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
}

export function calculateWPM(total: number, errors: number) {
  const wpm = (total - errors) / 5 / (COUNTDOWN_SECONDS / 60);
  console.log(total);

  return wpm;
}

export function calculateAccuracy(total: number, errors: number) {
  if (total > 0) {
    const correct = total - errors;
    return (correct / total) * 100;
  }

  return 0;
}

export function countErrors(actual: string, expected: string) {
  return expected.split("").reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
}

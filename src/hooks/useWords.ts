import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker";

function useWords(count: number) {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
}

function generateWords(count: number) {
  return faker.random.words(count).toLowerCase();
}

export default useWords;

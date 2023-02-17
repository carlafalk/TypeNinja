// export const handleRestart = () => {

import { letterModel, wordModel } from "../pages/Game";

// build array of words for gamesession
export const buildArrayOfWordModel = (array: string[]): wordModel[] => {
  const wordModelArray: wordModel[] = [];

  array.forEach((word) => {
    const letterModelArray: letterModel[] = [];

    word.split("").forEach((letter) => {
      letterModelArray.push({
        value: letter,
        isCorrect: "default",
        active: false,
      });
    });
    wordModelArray.push({
      letters: letterModelArray,
    });
  });
  return wordModelArray;
};

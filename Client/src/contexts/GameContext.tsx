import { createContext, useContext, useState } from "react";
import words from "../assets/Words.json";
import { letterModel, wordModel } from "../pages/Game";

interface GameContext {
  points: number;
  shuffledWordList: string[];
  handleRestart: (array: wordModel[]) => void;
  handleBackspace: (array: wordModel[]) => void;
  handleSpace: (array: wordModel[]) => void;
  handleDefaultKeyPress: (e: React.KeyboardEvent<HTMLDivElement>, array: wordModel[]) => void;
  correctWord: (array: wordModel[]) => void;
}

interface GameProviderProps {
  children: React.ReactNode;
}

const GameContext = createContext<GameContext>({
  points: 0,
  shuffledWordList: words.sort(() => 0.5 - Math.random()).slice(0, 100),
  handleRestart: () => {},
  handleBackspace: () => {},
  handleSpace: () => {},
  handleDefaultKeyPress: () => {},
  correctWord: () => {},
});

const GameProvider = ({ children }: GameProviderProps) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [shuffledWordList, setShuffledWordList] = useState<string[]>(words.sort(() => 0.5 - Math.random()).slice(0, 100));

  const handleRestart = (array: wordModel[]) => {
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    array.forEach((word) => word.letters.forEach((letter) => (letter.isCorrect = "default")));
    // reset timer
    // reset all colors
  };

  const handleBackspace = (array: wordModel[]) => {
    //fix: if correct word is entered you can not go back and change it
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex((prev) => prev - 1);
      array[currentWordIndex].letters[currentLetterIndex - 1].isCorrect = "default";
    } else if (currentLetterIndex === 0 && currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1);
      setCurrentLetterIndex(shuffledWordList[currentWordIndex - 1].length);
    } else if (currentLetterIndex < 0 && currentWordIndex <= 0) {
      setCurrentLetterIndex(0);
      array[currentWordIndex].letters[currentLetterIndex - 1].isCorrect = "default";
    }
  };

  const handleSpace = (array: wordModel[]) => {
    if (array[currentWordIndex].letters.length === currentLetterIndex) {
      correctWord(array);
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentLetterIndex(0);
      //add point for correct word
    } else console.log("asdasd");
  };

  const handleDefaultKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, array: wordModel[]) => {
    //isCorrect should only be se as long as the player is NOT(!!!) inbetween words
    if (array[currentWordIndex].letters.length - 1 >= currentLetterIndex) {
      array[currentWordIndex].letters[currentLetterIndex].value === e.key
        ? (array[currentWordIndex].letters[currentLetterIndex].isCorrect = "correct")
        : (array[currentWordIndex].letters[currentLetterIndex].isCorrect = "incorrect");
      setCurrentLetterIndex((prev) => prev + 1);
    }
  };

  const correctWord = (array: wordModel[]) => {
    var nrOfIncorrectLetters: letterModel[] = [];
    array[currentWordIndex].letters.forEach((letter) => {
      if (letter.isCorrect === "incorrect") nrOfIncorrectLetters.push(letter);
    });
    nrOfIncorrectLetters.length === 0 ? setPoints((prev) => prev + 1) : console.log("no points");
  };

  return (
    <GameContext.Provider
      value={{
        points,
        shuffledWordList,
        handleRestart,
        handleBackspace,
        handleSpace,
        handleDefaultKeyPress,
        correctWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};

export default GameProvider;

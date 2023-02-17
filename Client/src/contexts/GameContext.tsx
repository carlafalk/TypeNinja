import { createContext, useContext, useState } from "react";
import words from "../assets/Words.json";
import { letterModel, wordModel } from "../pages/Game";

interface GameContext {
  WPM: number;
  correctKeyPressedCounter: number;
  keyPressCounter: number;
  accuracy: number;
  points: number;
  secondsLeft: number;
  timerStarted: boolean;
  gameTime: number;
  setGameTime: React.Dispatch<React.SetStateAction<number>>;
  setWPM: React.Dispatch<React.SetStateAction<number>>;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
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
  WPM: 0,
  keyPressCounter: 0,
  correctKeyPressedCounter: 0,
  accuracy: 0,
  points: 0,
  gameTime: 0,
  secondsLeft: 0,
  timerStarted: false,
  setGameTime: () => {},
  setWPM: () => {},
  setAccuracy: () => {},
  setTimerStarted: () => {},
  setSecondsLeft: () => {},
  handleRestart: () => {},
  handleBackspace: () => {},
  handleSpace: () => {},
  handleDefaultKeyPress: () => {},
  correctWord: () => {},
});

const GameProvider = ({ children }: GameProviderProps) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [gameTime, setGameTime] = useState(15);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(gameTime);
  const [points, setPoints] = useState<number>(0);
  const [keyPressCounter, setKeyPressCounter] = useState<number>(0);
  const [correctKeyPressedCounter, setCorrectKeyPressedCounter] = useState<number>(0);
  const [shuffledWordList, setShuffledWordList] = useState<string[]>(
    words.sort(() => 0.5 - Math.random()).slice(0, 100)
  );
  const [WPM, setWPM] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  const handleRestart = (array: wordModel[]) => {
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    array.forEach((word) => word.letters.forEach((letter) => (letter.isCorrect = "default")));
    setPoints(0);
    setSecondsLeft(gameTime);
  };

  const handleBackspace = (array: wordModel[]) => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex((prev) => prev - 1);
      array[currentWordIndex].letters[currentLetterIndex - 1].isCorrect = "default";
    } else if (currentLetterIndex === 0 && currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1);
      setCurrentLetterIndex(array[currentWordIndex - 1].letters.length);
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
    }
  };

  const handleDefaultKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, array: wordModel[]) => {
    if (array[currentWordIndex].letters.length - 1 >= currentLetterIndex) {
      if (array[currentWordIndex].letters[currentLetterIndex].value === e.key) {
        array[currentWordIndex].letters[currentLetterIndex].isCorrect = "correct";
        setCorrectKeyPressedCounter((prev) => prev + 1);
      } else array[currentWordIndex].letters[currentLetterIndex].isCorrect = "incorrect";
      setCurrentLetterIndex((prev) => prev + 1);
      setKeyPressCounter((prev) => prev + 1);
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
        correctKeyPressedCounter,
        keyPressCounter,
        setAccuracy,
        setWPM,
        setGameTime,
        gameTime,
        timerStarted,
        setTimerStarted,
        secondsLeft,
        points,
        setSecondsLeft,
        handleRestart,
        handleBackspace,
        handleSpace,
        handleDefaultKeyPress,
        correctWord,
        WPM,
        accuracy,
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

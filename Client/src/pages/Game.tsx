import { Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { useState } from "react";
import styled from "styled-components";
import words from "../assets/Words.json";
import MainContent from "../components/MainContent";

export const Game = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [shuffledWordList, setShuffledWordList] = useState<string[]>(words.sort(() => 0.5 - Math.random()).slice(0, 100));

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    // reset timer
    // reset all colors
  };

  const handleBackspace = () => {
    currentLetterIndex > 0 ? setCurrentLetterIndex((prev) => prev - 1) : setCurrentLetterIndex(0);
    // reset color on last character
  };
  const handleSpace = () => {
    if (shuffledWordList[currentWordIndex].length === currentLetterIndex) {
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentLetterIndex(0);
      //add point for correct word
    } else console.log("asdasd");
  };

  const handleKeyPress = (key: string): string => {
    switch (key) {
      case "Tab":
        handleRestart();
        break;
      case "Backspace":
        handleBackspace();
        break;
      case " ":
        handleSpace();
        break;

      default:
        setCurrentLetterIndex((prev) => prev + 1);
        break;
    }
    return key;
  };

  return (
    <>
      <MainContent>
        <WordsContainer
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (handleKeyPress(e.key) === shuffledWordList[currentWordIndex][currentLetterIndex]) {
              console.log("correct");
            } else if (e.key === " ") {
              console.log("space pressed");
            } else if (e.key === "Backspace") {
              console.log("backspace pressed");
            } else if (e.key === "Tab") {
              console.clear();
            } else {
              console.log("incorrect");
            }
            // handleKeyPress(e.key) === shuffledWordList[currentWordIndex][currentLetterIndex] ? console.log("correct") : console.log("incorrect");
            // console.log(e.key);
            // console.log(currentLetterIndex);

            e.preventDefault();
          }}
        >
          {shuffledWordList.map((element) => (
            <WordContainer>
              <>
                <Word sx={{ color: "#0009" }}>{element}</Word>
              </>
            </WordContainer>
          ))}
        </WordsContainer>
      </MainContent>
    </>
  );
};

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 300px;
  outline: none;
  overflow: hidden;
  max-height: 450px;
`;

const WordContainer = styled.div`
  margin: 3px 5px;
`;

const Word = styledMUI(Typography)`
  font-family: "Saira Condensed";
  font-size: 40px;
  letter-spacing: 4;
`;

const Test = styled.div`
  color: "#0009";
  font-family: "Saira Condensed";
  font-size: 40px;
  letter-spacing: 4;
`;

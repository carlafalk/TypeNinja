import { Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { useState } from "react";
import styled from "styled-components";
import words from "../assets/Words.json";
import MainContent from "../components/MainContent";

export const Game = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledWordList, setShuffledWordList] = useState<string[]>(words.sort(() => 0.5 - Math.random()).slice(0, 100));

  const handleRestart = () => {
    setCurrentIndex(0);
    // reset timer
    // reset all colors
  };

  const handleBackspace = () => {
    currentIndex > 0 ? setCurrentIndex((prev) => prev - 1) : setCurrentIndex(0);
    // reset color on last character
  };

  const handleKeyPress = (key: string): string => {
    switch (key) {
      case "Tab":
        handleRestart();
        break;
      case "Backspace":
        handleBackspace();
        break;

      default:
        setCurrentIndex((prev) => prev + 1);
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
            handleKeyPress(e.key) === shuffledWordList[currentIndex] ? console.log("correct") : console.log("incorrect");
            e.preventDefault();
          }}
        >
          {shuffledWordList.map((element) => (
            <WordContainer>
              <Word sx={{ color: "#0009" }}>{element}</Word>
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

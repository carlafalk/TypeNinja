import { Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import MainContent from "../components/MainContent";

export const Game = () => {
  const [keyPressed, setKeyPressed] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const teststring = "mitt namn aer carl och det haer aer ett test";

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
        setKeyPressed(key);
        setCurrentIndex((prev) => prev + 1);
        break;
    }
    return key;
  };

  return (
    <>
      <MainContent>
        <WordContainer
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            handleKeyPress(e.key) === teststring[currentIndex] ? console.log("correct") : console.log("incorrect");
            e.preventDefault();
          }}
        >
          <Typography sx={{ color: "#0009", fontFamily: "Saira Condensed", fontSize: 40, marginRight: 2, letterSpacing: 4 }}>{teststring}</Typography>
        </WordContainer>
      </MainContent>
    </>
  );
};

const WordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 300px;
  outline: none;
`;

const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 300px;
`;

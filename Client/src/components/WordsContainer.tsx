import { Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import React from "react";
import styled from "styled-components";
import { wordModel } from "../pages/Game";
import Letter from "./Letter";

type Props = {
  handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  wordModelArray: wordModel[];
  focus: boolean;
  currentLetterIndex: number;
  currentWordIndex: number;
};

const WordsContainer = ({
  focus,
  currentWordIndex,
  currentLetterIndex,
  handleKeyPress,
  setTimerStarted,
  wordModelArray,
  setFocus,
}: Props) => {
  return (
    <OuterContainer>
      <StyledWordsContainer
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        focused={focus}
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          handleKeyPress(e);
          e.key === "Tab" ? setTimerStarted(false) : setTimerStarted(true);
          e.preventDefault();
        }}
      >
        {/* {wordModelArray.map((word, index) => (
          <WordContainer key={"word " + index}>
            {word.letters.map((letter, index) =>
              letter.isCorrect === "correct" ? (
                <Letter key={"letter " + index} style={{ color: "#a2a6ab" }}>
                  {letter.value}
                </Letter>
              ) : letter.isCorrect === "incorrect" ? (
                <Letter key={"letter " + index} style={{ color: "#c6243f9e" }}>
                  {letter.value}
                </Letter>
              ) : (
                <Letter key={"letter " + index} style={{ color: "#424549" }}>
                  {letter.value}
                </Letter>
              )
            )}
          </WordContainer>
        ))} */}
        {wordModelArray.map((word, index2) => (
          <>
            <WordContainer key={"word " + index2}>
              {word.letters.map((letter, index) =>
                letter.isCorrect === "correct" ? (
                  <Letter
                    index2={index2}
                    currentWordIndex={currentWordIndex}
                    currentLetterIndex={currentLetterIndex}
                    index={index}
                    key={index}
                    children={letter.value}
                    correct
                  />
                ) : letter.isCorrect === "incorrect" ? (
                  <Letter
                    index2={index2}
                    currentWordIndex={currentWordIndex}
                    currentLetterIndex={currentLetterIndex}
                    index={index}
                    key={index}
                    children={letter.value}
                    incorrect
                  />
                ) : (
                  <Letter
                    index2={index2}
                    currentWordIndex={currentWordIndex}
                    currentLetterIndex={currentLetterIndex}
                    index={index}
                    key={index}
                    children={letter.value}
                    default2
                  />
                )
              )}
            </WordContainer>
            <div
              className={
                index2 === currentWordIndex && currentLetterIndex === word.letters.length
                  ? "border-pulse"
                  : "invisible-border"
              }
              style={{ width: "8px" }}
            ></div>
          </>
        ))}
      </StyledWordsContainer>
      {!focus && <FocusText>press to focus</FocusText>}
    </OuterContainer>
  );
};

export default WordsContainer;

const FocusText = styledMUI(Typography)`
  font-family: "Saira Condensed";
  font-size: 20px;
  color: #e2b714;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
`;

const WordContainer = styled.div`
  /* margin: 0 5px; */
  display: flex;
  flex-direction: row;
`;
const OuterContainer = styled.div`
  position: relative;
`;

// const Letter = styledMUI(Typography)`
// font-family: "Saira Condensed";
// font-size: 40px;
// margin-right: 1px;
// flex-direction: row;
// }
// `;

const StyledWordsContainer = styled.div<{ focused: boolean }>`
  display: flex;
  flex-wrap: wrap;
  outline: none;
  overflow: hidden;
  max-height: 450px;
  ${({ focused }) => (focused ? "" : "transition: all 0.25 ease 0s;")}
  ${({ focused }) => (focused ? "" : "-webkit-filter: blur(5px);")}
  ${({ focused }) => (focused ? "" : "-moz-filter: blur(5px);")}
  ${({ focused }) => (focused ? "" : "-o-filter: blur(5px);")}
  ${({ focused }) => (focused ? "" : "-ms-filter: blur(5px);")}
  ${({ focused }) => (focused ? "" : "filter: blur(5px);")}
`;

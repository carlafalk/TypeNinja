import { Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import { useGame } from "../contexts/GameContext";
import { buildArrayOfWordModel as buildWordModelArray } from "../Services/GameServices";

type isCorrectType = "correct" | "incorrect" | "default";

export type wordModel = {
  letters: letterModel[];
};

export type letterModel = {
  isCorrect: isCorrectType;
  value: string;
};

export const Game = () => {
  const [wordModelArray, setWordModelArray] = useState<wordModel[]>([]);
  const { shuffledWordList, handleRestart, handleBackspace, handleSpace, handleDefaultKeyPress, points } = useGame();

  useEffect(() => {
    const array: wordModel[] = buildWordModelArray(shuffledWordList);
    setWordModelArray(array);
  }, []);

  useEffect(() => {
    console.log(points);
  }, [points]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Tab": {
        handleRestart(wordModelArray);
        break;
      }
      case "Backspace": {
        handleBackspace(wordModelArray);
        break;
      }
      case " ": {
        handleSpace(wordModelArray);
        break;
      }

      default: {
        handleDefaultKeyPress(e, wordModelArray);
        break;
      }
    }
  };

  return (
    <>
      <MainContent>
        <Letter>{points}</Letter>
        <WordsContainer
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            handleKeyPress(e);

            e.preventDefault();
          }}
        >
          {wordModelArray.map((word, index) => (
            <WordContainer key={"word " + index}>
              {word.letters.map((letter, index) =>
                letter.isCorrect === "correct" ? (
                  <Letter key={"letter " + index} style={{ color: "#2f00ae" }}>
                    {letter.value}
                  </Letter>
                ) : letter.isCorrect === "incorrect" ? (
                  <Letter key={"letter " + index} style={{ color: "#8e1616" }}>
                    {letter.value}
                  </Letter>
                ) : (
                  <Letter key={"letter " + index} style={{ color: "#0000005b" }}>
                    {letter.value}
                  </Letter>
                )
              )}
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
  display: flex;
  flex-direction: row;
`;

const Letter = styledMUI(Typography)`
  font-family: "Saira Condensed";
  font-size: 40px;
  margin-right: 1px;
  flex-direction: row;
`;

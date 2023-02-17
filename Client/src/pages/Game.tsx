import { Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import words from "../assets/Words.json";
import CountdownTimer from "../components/CountdownTimer";
import MainContent from "../components/MainContent";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useGame } from "../contexts/GameContext";
import { buildArrayOfWordModel as buildWordModelArray } from "../Services/GameServices";
import { axiosAPI } from "../utils/APIutils";

type isCorrectType = "correct" | "incorrect" | "default";

export type wordModel = {
  letters: letterModel[];
};

export type letterModel = {
  isCorrect: isCorrectType;
  value: string;
  active: boolean; // if the letter is active it should render an insertion point infront of the letter, which is removed when the letter is no longer active
};

export type row = {
  words: wordModel[];
};

export const Game = () => {
  const [wordModelArray, setWordModelArray] = useState<wordModel[]>([]);
  const [restartGame, setRestartGame] = useState(false);
  // const [highscore, setHighscore] = useState<HighscoreModel>();
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    handleRestart,
    handleBackspace,
    handleSpace,
    handleDefaultKeyPress,
    // timerStarted,
    setTimerStarted,
    secondsLeft,
    WPM,
    accuracy,
    setWPM,
    setAccuracy,
    gameTime,
    points,
    keyPressCounter,
    correctKeyPressedCounter,
  } = useGame();

  const { mutate: postHighscore } = useMutation(
    ["highscore"],
    async () => {
      return await axiosAPI.post(
        "/highscore",
        {
          id: uuidv4(),
          userId: currentUser.id,
          wpm: WPM,
          accuracy: accuracy,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getHighscores"]);
      },
    }
  );

  useEffect(() => {
    const array: wordModel[] = buildWordModelArray(
      words
        .filter((word) => word.length > 2 && word.length < 6)
        .sort(() => 0.5 - Math.random())
        .slice(0, 100)
    );
    setWordModelArray(array);
  }, [restartGame]);

  useEffect(() => {
    const array: wordModel[] = buildWordModelArray(
      words
        .filter((word) => word.length > 2 && word.length < 6)
        .sort(() => 0.5 - Math.random())
        .slice(0, 100)
    );
    setWordModelArray(array);
    setTimerStarted(false);
    handleRestart(array);
  }, []);

  useEffect(() => {
    setAccuracy(Math.round((correctKeyPressedCounter / keyPressCounter) * 100));
    setWPM((60 / gameTime) * points);

    if (secondsLeft === 0) {
      postHighscore();
      navigate("score/");
    }
  }, [secondsLeft, points]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Tab": {
        handleRestart(wordModelArray);
        setRestartGame((prev) => !prev);
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
  // console.log(timerStarted);

  return (
    <>
      <MainContent>
        <CountdownTimer />
        <WordsContainer
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            handleKeyPress(e);
            e.key === "Tab" ? setTimerStarted(false) : setTimerStarted(true);
            e.preventDefault();
          }}
        >
          {wordModelArray.map((word, index) => (
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
          ))}
        </WordsContainer>
      </MainContent>
    </>
  );
};

const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background-color: red; */
  outline: none;
  overflow: hidden;
  max-height: 450px;
  transition: all 0.25 ease 0s;
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

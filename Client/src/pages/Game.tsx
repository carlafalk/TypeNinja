import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { buildArrayOfWordModel as buildWordModelArray } from "../Services/GameServices";
import words from "../assets/Words.json";
import CountdownTimer from "../components/CountdownTimer";
import MainContent from "../components/MainContent";
import WordsContainer from "../components/WordsContainer";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useGame } from "../contexts/GameContext";
import { HighscoreModel } from "../models/HighscoreModel";
import { axiosAPI } from "../utils/APIutils";

type isCorrectType = "correct" | "incorrect" | "default";

type decodedToken = {
  exp: number;
  jti: string;
  iss: string;
  aud: string;
};

export type wordModel = {
  letters: letterModel[];
};

export type letterModel = {
  isCorrect: isCorrectType;
  value: string;
  active: boolean;
};

export type row = {
  words: wordModel[];
};

export const Game = () => {
  const [wordModelArray, setWordModelArray] = useState<wordModel[]>([]);
  const [restartGame, setRestartGame] = useState(false);
  const [focus, setFocus] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    currentWordIndex,
    currentLetterIndex,
    handleRestart,
    handleBackspace,
    handleSpace,
    handleDefaultKeyPress,
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
        "highscore",
        {
          id: uuidv4(),
          userId: currentUser.id,
          wpm: WPM,
          accuracy: accuracy,
          username: currentUser.username,
        } as HighscoreModel,
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

  //LOG OUT USER IF TOKEN IS EXPIRED
  useEffect(() => {
    const decoded = jwtDecode<decodedToken>(currentUser.token);
    if (decoded.exp < Date.now() / 1000) {
      setCurrentUser({
        id: "",
        username: "",
        token: "",
        isLoggedIn: false,
      });
    }
  }, []);

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

  return (
    <>
      <MainContent>
        <CountdownTimer />
        <WordsContainer
          currentWordIndex={currentWordIndex}
          currentLetterIndex={currentLetterIndex}
          focus={focus}
          handleKeyPress={handleKeyPress}
          setTimerStarted={setTimerStarted}
          setFocus={setFocus}
          wordModelArray={wordModelArray}
        />
        <RestartContainer>
          <KeyboardTabIcon style={{ marginRight: 10, fontSize: 15 }} />
          <Typography>Press tab to restart</Typography>
        </RestartContainer>
      </MainContent>
    </>
  );
};

const RestartContainer = styled.div`
  display: flex;
  font-family: "Saira Condensed";
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-top: 50px;
  color: #e2b714;
`;

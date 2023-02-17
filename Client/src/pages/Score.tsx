import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import HighscoreCard from "../components/HighscoreCard";
import MainContent from "../components/MainContent";
import { useGame } from "../contexts/GameContext";
import { HighscoreModel } from "../models/HighscoreModel";
import { axiosAPI } from "../utils/APIutils";

const Score = () => {
  const { WPM, accuracy, setSecondsLeft, gameTime, keyPressCounter, correctKeyPressedCounter } =
    useGame();
  const { data: highscores } = useQuery<HighscoreModel[]>(
    ["getHighscores"],
    async () => await (await axiosAPI.get("/highscore")).data
  );

  useEffect(() => {
    setSecondsLeft(gameTime);
  }, []);

  return (
    <MainContent>
      <Container>
        <LeftContent>
          <Typography style={{ fontSize: 50, color: "white" }}>STATS</Typography>
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: 35, color: "white" }}>Accuracy:</Typography>
            <Typography
              style={{ fontSize: 35, color: "#e2b714", marginLeft: "auto", marginRight: "10rem" }}
            >
              {accuracy}%
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: 35, color: "white" }}>Words Per Minute:</Typography>
            <Typography
              style={{ fontSize: 35, color: "#e2b714", marginLeft: "auto", marginRight: "10rem" }}
            >
              {WPM}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: 35, color: "white" }}>Errors made:</Typography>
            <Typography
              style={{ fontSize: 35, color: "#e2b714", marginLeft: "auto", marginRight: "10rem" }}
            >
              {keyPressCounter - correctKeyPressedCounter}
            </Typography>
          </div>
        </LeftContent>

        <RightContent>
          <Typography style={{ fontSize: 50, textAlign: "center", color: "white" }}>
            HIGHSCORES
          </Typography>
          <WPMAndAccContainer>
            <Typography style={{ color: "white" }}>WPM</Typography>
            <Typography style={{ color: "white", marginLeft: "4rem" }}>ACC</Typography>
          </WPMAndAccContainer>
          {highscores?.map((highscore, index) =>
            (index + 1) % 2 === 0 ? (
              <HighscoreCard
                color=""
                wpm={highscore.wpm}
                accuracy={highscore.accuracy}
                index={index}
                playerName={highscore.playerName}
              />
            ) : (
              <HighscoreCard
                color="#3a3c3e"
                wpm={highscore.wpm}
                accuracy={highscore.accuracy}
                index={index}
                playerName={highscore.playerName}
              />
            )
          )}
        </RightContent>
      </Container>
    </MainContent>
  );
};

export default Score;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const LeftContent = styled.div`
  margin-top: 5rem;
  /* background-color: red; */
  width: 55%;
`;

const WPMAndAccContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  justify-content: flex-end;
`;

const RightContent = styled.div`
  background-color: #323334;
  padding: 2rem;
  margin-top: 5rem;
  width: 45%;
  overflow: scroll;
  margin-left: auto;

  //hides scrollbar in chrome,safar and opera
  ::-webkit-scrollbar {
    display: none;
  }
  //hides scrollbar in explorer, edge and firefox
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

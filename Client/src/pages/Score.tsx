import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import HighscoreCard from "../components/HighscoreCard";
import MainContent from "../components/MainContent";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useGame } from "../contexts/GameContext";
import { HighscoreModel } from "../models/HighscoreModel";
import { axiosAPI } from "../utils/APIutils";

const Score = () => {
  const { WPM, accuracy, setSecondsLeft, gameTime, keyPressCounter, correctKeyPressedCounter } =
    useGame();

  const { currentUser } = useCurrentUser();

  const { data: highscores } = useQuery<HighscoreModel[]>(
    ["getHighscores"],
    async () =>
      await (
        await axiosAPI.get("highscore", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
      ).data,
    {
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    // console.log(highscores![0].username);
    setSecondsLeft(gameTime);
  }, []);

  return (
    <MainContent>
      <Container>
        <LeftContent>
          <Typography style={{ fontSize: 50, color: "#e7eae0" }}>STATS</Typography>
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: 35, color: "#e7eae0" }}>Accuracy:</Typography>
            <Typography
              style={{ fontSize: 35, color: "#79a617", marginLeft: "auto", marginRight: "10rem" }}
            >
              {accuracy}%
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: 35, color: "#e7eae0" }}>Words Per Minute:</Typography>
            <Typography
              style={{ fontSize: 35, color: "#79a617", marginLeft: "auto", marginRight: "10rem" }}
            >
              {WPM}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: 35, color: "#e7eae0" }}>Errors made:</Typography>
            <Typography
              style={{ fontSize: 35, color: "#79a617", marginLeft: "auto", marginRight: "10rem" }}
            >
              {keyPressCounter - correctKeyPressedCounter}
            </Typography>
          </div>
        </LeftContent>

        <RightContent>
          <Typography style={{ fontSize: 50, textAlign: "center", color: "#e7eae0" }}>
            HIGHSCORES
          </Typography>
          <WPMAndAccContainer>
            <Typography style={{ color: "#e7eae0" }}>WPM</Typography>
            <Typography style={{ color: "#e7eae0", marginLeft: "4rem" }}>ACC</Typography>
          </WPMAndAccContainer>
          {highscores?.map((highscore, index) =>
            (index + 1) % 2 === 0 ? (
              <HighscoreCard
                key={index}
                color=""
                wpm={highscore.wpm}
                accuracy={highscore.accuracy}
                index={index}
                username={highscore.username}
              />
            ) : (
              <HighscoreCard
                key={index}
                color="#48494b"
                wpm={highscore.wpm}
                accuracy={highscore.accuracy}
                index={index}
                username={highscore.username}
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
  width: 55%;
`;

const WPMAndAccContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  justify-content: flex-end;
`;

const RightContent = styled.div`
  background-color: #191a1b;
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

import { Container, Typography } from "@mui/material";
import { useQuery } from "react-query";
import styled from "styled-components";
import HighscoreCard from "../components/HighscoreCard";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { HighscoreModel } from "../models/HighscoreModel";
import { axiosAPI } from "../utils/APIutils";

export const Profile = () => {
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
  return (
    <Container>
      <Content>
        <Typography style={{ fontSize: 50, textAlign: "center", color: "white" }}>
          {`${currentUser.username}'s`.toUpperCase()} HIGHSCORES
        </Typography>
        <WPMAndAccContainer>
          <Typography style={{ color: "white" }}>WPM</Typography>
          <Typography style={{ color: "white", marginLeft: "4rem" }}>ACC</Typography>
        </WPMAndAccContainer>
        {highscores
          ?.filter((x) => x.userId == currentUser.id)
          .map((highscore, index) =>
            (index + 1) % 2 === 0 ? (
              <HighscoreCard
                key={index}
                color=""
                wpm={highscore.wpm}
                accuracy={highscore.accuracy}
                index={index}
                playerName={highscore.playerName}
              />
            ) : (
              <HighscoreCard
                key={index}
                color="#3a3c3e"
                wpm={highscore.wpm}
                accuracy={highscore.accuracy}
                index={index}
                playerName={highscore.playerName}
              />
            )
          )}
        {/* {highscores?.map((highscore, index) =>
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
      )} */}
      </Content>
    </Container>
  );
};

const Content = styled.div`
  background-color: #323334;
  padding: 2rem;
  margin-top: 5rem;
  overflow: scroll;

  //hides scrollbar in chrome,safar and opera
  ::-webkit-scrollbar {
    display: none;
  }
  //hides scrollbar in explorer, edge and firefox
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const WPMAndAccContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  justify-content: flex-end;
`;

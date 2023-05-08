import { Typography } from "@mui/material";
import styled from "styled-components";

interface Props {
  color: string;
  wpm: number;
  accuracy: number;
  username: string;
  index: number;
}

const HighscoreCard = ({ color, wpm, accuracy, username, index }: Props) => {
  return (
    <HighscoreCardContainer style={{ backgroundColor: color }}>
      <IndexAndNameContainer>
        <WhiteText style={{ marginRight: "1rem", marginLeft: "1rem" }}>{index + 1} </WhiteText>
        <WhiteText>{username}</WhiteText>
      </IndexAndNameContainer>
      <ScoreContainer>
        <Scores>{wpm}</Scores>
        <Scores>{accuracy}</Scores>
        <Typography style={{ color: "#e2b714", marginTop: 25 }}>%</Typography>
      </ScoreContainer>
    </HighscoreCardContainer>
  );
};

export default HighscoreCard;

const HighscoreCardContainer = styled.div`
  display: flex; ;
`;

const IndexAndNameContainer = styled.div`
  display: flex;
  margin-right: auto !important;
`;

const ScoreContainer = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const WhiteText = styled(Typography)`
  font-size: 2.5rem !important;
  color: white;
`;

const Scores = styled(Typography)`
  font-size: 2.5rem !important;
  color: #e2b714;
  margin-left: 3rem !important;
`;

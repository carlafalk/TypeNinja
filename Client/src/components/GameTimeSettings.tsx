import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../contexts/GameContext";

const GameTimeSettings = () => {
  const { setGameTime, gameTime, setSecondsLeft, secondsLeft } = useGame();

  useEffect(() => {
    setSecondsLeft(gameTime);
  }, [gameTime]);

  return (
    <GameTimeOptionContainer>
      {secondsLeft > 0 && (
        <>
          <TimerOutlinedIcon style={{ color: "#e2b714", fontSize: 18, marginRight: 20 }} />
          <GameTimeOption onClick={() => setGameTime(15)}>15</GameTimeOption>
          <GameTimeOption onClick={() => setGameTime(30)}>30</GameTimeOption>
          <GameTimeOption onClick={() => setGameTime(60)}>60</GameTimeOption>
        </>
      )}
    </GameTimeOptionContainer>
  );
};

const GameTimeOption = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0.5rem;
  font-size: 1rem;
  color: #e2b714;
`;

const GameTimeOptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default GameTimeSettings;

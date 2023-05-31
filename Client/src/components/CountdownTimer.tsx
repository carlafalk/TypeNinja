import { useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../contexts/GameContext";

const CountdownTimer = () => {
  const { secondsLeft, setSecondsLeft, timerStarted } = useGame();
  useEffect(() => {
    if (timerStarted) {
      let timer = setInterval(() => {
        setSecondsLeft((prev) => {
          prev <= 0 && clearInterval(timer);

          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [secondsLeft, timerStarted]);

  return (
    <CountDownTimerContainer>
      {/* <span style={{ color: "#0000005b", fontSize: 200 }}>{secondsLeft}</span> */}
      <Timer>{secondsLeft}</Timer>
    </CountDownTimerContainer>
  );
};

export default CountdownTimer;

const CountDownTimerContainer = styled.div`
  display: flex;
  justify-content: start;
`;

const Timer = styled.h1`
  color: #79a617;
  font-size: 100px;
  align-self: flex-end;
  margin-top: 100px;
`;

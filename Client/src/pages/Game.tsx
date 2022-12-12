import { Box, Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import { arrayOfWords } from "../utils/WordArray";

export const Game = () => {
  const [keyPressed, setKeyPressed] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
  }, []);

  //if double letter (i.e "ll") then it will only log "l" once...
  useEffect(() => {
    console.log(keyPressed);
  }, [keyPressed]);

  const handleKeyPress = (event: KeyboardEvent) => {
    setKeyPressed(event.key);
    // handle double letters here with if statement
  };

  return (
    <>
      <MainContent>
        <WordContainer>
          {arrayOfWords.map((t) => (
            <Typography sx={{ color: "#0009", fontFamily: "Saira Condensed", fontSize: 40, marginRight: 2, letterSpacing: 4 }} key={t}>
              {t}
            </Typography>
          ))}
        </WordContainer>
      </MainContent>
    </>
  );
};

const WordContainer = styledMUI(Box)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 300px;
`;

const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 300px;
`;

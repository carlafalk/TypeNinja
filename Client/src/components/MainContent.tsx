import { Container } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const MainContent = ({ children }: Props) => {
  return (
    <Container maxWidth="lg" fixed>
      <MainStyled>{children}</MainStyled>
    </Container>
  );
};

export default MainContent;

const MainStyled = styled.main`
  margin-top: 104px;
  height: calc(100vh - 104px);
  /* margin-bottom: 6rem; */
  background-color: #191a1b;
`;

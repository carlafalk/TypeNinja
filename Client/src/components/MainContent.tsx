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
      margin-top: 85px;
      min-height: calc(100vh - 85px);
      margin-bottom: 6rem;
    
    `;
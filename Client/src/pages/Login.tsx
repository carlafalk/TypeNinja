import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useState } from "react";
import styled from "styled-components";
import { CustomButton } from "../components/CustomButton";
import { LoginForms } from "../components/LoginForms";
import { RegisterForm } from "../components/RegisterForm";
import { MatrixRainV12 } from "../components/test";

export const Login = () => {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const toggleRegisterForm = () => {
    setShowRegisterForm((prev) => !prev);
  };
  return (
    <Container>
      <MatrixRainV12 />
      <Container style={{ height: "60vh", width: "50vw", zIndex: 1 }}>
        <TitleContainer>
          <Title>TypeNinja</Title>
          <KeyboardIcon sx={{ color: "#e7eae0", position: "absolute", bottom: 38 }} />
        </TitleContainer>
        {showRegisterForm === false ? (
          <>
            <LoginForms />
            <CustomButton onClick={toggleRegisterForm}>Register</CustomButton>
          </>
        ) : (
          <>
            <RegisterForm />
            <CustomButton
              onClick={() => {
                toggleRegisterForm();
              }}
            >
              Sign in
            </CustomButton>
          </>
        )}
      </Container>
    </Container>
  );
};

const Container = styled.div`
  background-color: #191a1b;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
`;
const Title = styled.text`
  font-size: 100px;
  color: #79a617;
`;

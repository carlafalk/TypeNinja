import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useState } from "react";
import styled from "styled-components";
import { CustomButton } from "../components/CustomButton";
import { LoginForms } from "../components/LoginForms";
import { RegisterForm } from "../components/RegisterForm";

export const Login = () => {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const toggleRegisterForm = () => {
    setShowRegisterForm((prev) => !prev);
  };
  return (
    <Container>
      <TitleContainer>
        <Title>TypeNinja</Title>
        <KeyboardIcon sx={{ color: "#79a617", position: "absolute", bottom: 38 }} />
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
  color: #e7eae0;
`;

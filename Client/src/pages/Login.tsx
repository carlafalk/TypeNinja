import styled from "styled-components";
import * as yup from "yup";
import YupPassword from 'yup-password';
import { LoginForms } from "../components/LoginForms";


YupPassword(yup);
const LoginValidation = yup.object({
  username: yup.string().min(2).max(15,"username can not contain more than 15 characters").required(),
  password: yup.string().password().minNumbers(1).minUppercase(1).minLowercase(1).minSymbols(1).min(6).required()
})

export const Login = () => {

  return (
    <Container>
      <LoginForms/>
    </Container>
  )
}

const Container = styled.div`
  background-color: grey;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
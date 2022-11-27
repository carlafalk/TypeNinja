import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import YupPassword from 'yup-password';

YupPassword(yup);
const LoginValidation = yup.object({
  username: yup.string().min(2,"username must contain atleast 2 characters").max(15,"username can not contain more than 15 characters").required(),
  password: yup.string().password().minNumbers(1).minUppercase(1).minLowercase(1).minSymbols(1).min(6).required()
})

export const Login = () => {
  // const [showSignUp, setShowSignUp] = useState(false); conditional rendering on sign in and sign up form
  const [token, setToken] = useState<string>("");

  const SignIn = async(_username: string, _password: string) => {
    const response = await fetch("https://localhost:7220/Authenticate/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: _username,
        password: _password
      })
    })
    const json = await response.json();

    if (response.ok) {
      setToken(json.token)
      // store token in localStorage and navigate to gamepage, also make sure to set currentUser to loginModel.username
    }
  }
  return (
    <Container>

      <Formik
        validationSchema={LoginValidation}
        initialValues={{
          username:"",
          password:""
        }}
        onSubmit={() => {console.log("onSubmit")}}
      >
        {({handleChange, handleSubmit, values, errors}) => {
          return (
            <>
              <TextField variant="outlined" placeholder="Username" label="username" sx={{borderColor: "#000"}}/>
              <TextField variant="outlined" placeholder="Password" type="password" label="password" margin="normal"/>
              <Button
              sx={{backgroundColor: "#383038", margin: "10px", borderRadius: 5}} 
              variant="contained"
              onClick={() => handleSubmit}>Sign in</Button>
            </>
          )
        }}

      </Formik>
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

// const Test = styledMUI(Button)(
//   ({theme}) => `
//   color: ${theme.palette.background.paper}
//   `
// );
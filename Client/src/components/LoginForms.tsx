import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useCurrentUser } from '../contexts/CurrentUserContext';

export const LoginForms = () => {
//   const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {username:"", token:"", isLoggedIn:false});
  const { currentUser ,setCurrentUser } = useCurrentUser();
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.isLoggedIn) {    
        navigate("game/");
    }
  }, [currentUser.isLoggedIn])

  const axiosAPI = axios.create({
    baseURL: "https://localhost:7220/"
  })

  const SignIn = async(values : {username: string, password: string}) => {
    try {
      await axiosAPI.post(
        "Authenticate/Login",
        {
          username: values.username,
          password: values.password
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.status)
          setCurrentUser({
            username: response.data.username,
            token: response.data.token,
            isLoggedIn: true
          })
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Request failed with status code 401") {
          setCustomError("Invalid username/password");
        }
      }
    }
  }

  return (
    <Formik
        initialValues={{
          username:"",
          password:""
        }}
        onSubmit={(values) => {
            SignIn(values)
        }}
      >
        {({handleChange, handleSubmit}) => {
          return (
            <>
              <TextField 
              id="username" 
              onChange={e => {
                handleChange(e);
                setCustomError("");
              }} 
              variant="outlined" 
              placeholder="Username" 
              label="username" 
              sx={{borderColor: "#000"}}/>
              
              <TextField 
              id="password" 
              onChange={e => {
                handleChange(e);
                setCustomError("");
              }} 
              variant="outlined" 
              placeholder="Password" 
              type="password" 
              label="password" 
              margin="normal"/>
              {customError.length > 0 && <ErrorMessage>{customError}</ErrorMessage>}
                <Button
                sx={{backgroundColor: "#383038", margin: "10px", borderRadius: 5}} 
                variant="contained"
                onClick={() => handleSubmit()}>Sign in</Button>
            </>
          )
        }}
      </Formik>
  )
}

const ErrorMessage = styled(Typography)`
  color: red;
  background-color: #3e1f1f;
  padding:5px 10px;
  border-radius: 10px;
  font-size: 15px;
`;
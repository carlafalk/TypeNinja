import { Button, TextField } from "@mui/material";
import { styled as styledMUI } from '@mui/material/styles';
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { CustomButton } from "./CustomButton";

YupPassword(yup);
const RegistrationValidation = yup.object({
  username: yup.string().min(2).max(15,"username can not contain more than 15 characters").required(),
  password: yup.string().password().minNumbers(1).minUppercase(1).minLowercase(1).minSymbols(1).min(6).required(),
  email: yup.string().email().required()
})

export const RegisterForm = () => {

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


  const Register = async(values : {email:string, username: string, password: string}) => {
    try {
      await axiosAPI.post(
        "Authenticate/register",
        {
          username: values.username,
          email: values.email,
          password: values.password
        })
        .then(response => {
          if (response.status == 200) {
            setCurrentUser({
              username: response.data.username,
              token: response.data.token,
              isLoggedIn: true
            })
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  return (
    <Formik
      initialValues={{
        username:"",
        email: "",
        password: ""
      }}
      onSubmit={(values) => {
        Register(values)
      }}
      validationSchema={RegistrationValidation}
    >
      {({handleChange, handleSubmit, errors}) => {
        return (
          <>
            <TextField
              id="username"
              onChange={e => {
                handleChange(e)
              }}
              variant="outlined"
              placeholder="Username"
              
            />
            {errors.username}

            <TextField
            id="email"
            onChange={e => {
              handleChange(e)
            }}
            variant="outlined"
            placeholder="Email"
            sx={{margin: 1}}
            />
            {errors.email}
          
            <TextField
            id="password"
            onChange={e => {
              handleChange(e)
            }}
            type="password"
            variant="outlined"
            placeholder="Password"
            />
            
            <CustomButton onClick={() => handleSubmit()}>Register</CustomButton>
          </>
        )
      }}

    </Formik>
  )
}

const MUIButton = styledMUI(Button)`
  width: 200px;
  margin: 10px;
  color: #bfa5d7;
  background-color: #1f0438;
  border-radius: 5rem;
  &:hover {
    background-color: #42136e;
  }
`;

import { Button } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { RegisterModel } from "../models/RegisterModel";
import { axiosAPI } from "../utils/APIutils";
import { RegistrationValidation } from "../utils/YupValidations";
import { CustomButton } from "./CustomButton";

export const RegisterForm = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      navigate("game/");
    }
  }, [currentUser.isLoggedIn]);

  const Register = async (values: RegisterModel) => {
    try {
      await axiosAPI
        .post("Authenticate/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then(async (response) => {
          if (response.status == 200) {
            console.log("asdasd");
            await axiosAPI
              .post("Authenticate/Login", {
                username: values.username,
                password: values.password,
              })
              .then((response) => {
                setCurrentUser((prev) => ({
                  ...prev,
                  id: response.data.id,
                  username: response.data.username,
                  token: response.data.token,
                  isLoggedIn: true,
                }));
              });
          }
        });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        id: currentUser.id,
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        Register(values);
      }}
      validationSchema={RegistrationValidation}
    >
      {({ handleChange, handleSubmit, errors }) => {
        return (
          <>
            <RegisterInput
              id="username"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Username"
            />
            {errors.username}

            <RegisterInput
              id="email"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Email"
            />
            {errors.email}

            <RegisterInput
              id="password"
              onChange={(e) => {
                handleChange(e);
              }}
              type="password"
              placeholder="Password"
            />
            {errors.password}

            <CustomButton onClick={() => handleSubmit()}>Register</CustomButton>
          </>
        );
      }}
    </Formik>
  );
};

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

const RegisterInput = styled.input`
  border: 1px solid #424549;
  padding: 10px;
  border-radius: 7px;
  background-color: #424549;
  color: white;
  margin-bottom: 5px;

  ::placeholder {
    color: white;
    opacity: 0.6;
  }
`;

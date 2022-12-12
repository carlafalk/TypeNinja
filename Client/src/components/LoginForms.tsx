import { TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { LoginModel } from "../models/LoginModel";
import { axiosAPI } from "../utils/APIutils";
import { CustomButton } from "./CustomButton";

export const LoginForms = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      navigate("game/");
    }
  }, [currentUser.isLoggedIn]);

  const SignIn = async (values: LoginModel) => {
    try {
      await axiosAPI
        .post("Authenticate/Login", {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          if (response.status === 200) {
            setCurrentUser((prev) => ({
              ...prev,
              username: response.data.username,
              token: response.data.token,
              isLoggedIn: true,
            }));
          }
        });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Request failed with status code 401") {
          setCustomError("Invalid username/password");
        }
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values) => {
        SignIn(values);
      }}
    >
      {({ handleChange, handleSubmit }) => {
        return (
          <>
            <TextField
              id="username"
              onChange={(e) => {
                handleChange(e);
                setCustomError("");
              }}
              variant="outlined"
              placeholder="Username"
              sx={{ borderColor: "#000" }}
            />

            <TextField
              id="password"
              onChange={(e) => {
                handleChange(e);
                setCustomError("");
              }}
              variant="outlined"
              placeholder="Password"
              type="password"
              sx={{ margin: 1 }}
            />
            {customError.length > 0 && <ErrorMessage>{customError}</ErrorMessage>}
            <CustomButton onClick={() => handleSubmit()}>Sign in</CustomButton>
          </>
        );
      }}
    </Formik>
  );
};

const ErrorMessage = styled(Typography)`
  color: #1f0438;
  background-color: #dec8e9;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 15px;
`;

import KeyboardIcon from "@mui/icons-material/Keyboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar as MUIAppBar,
  Container,
  IconButton,
  styled as styledMUI,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useGame } from "../contexts/GameContext";
import GameTimeSettings from "./GameTimeSettings";

interface AppBarProps {}

export const AppBar = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { setWPM, setAccuracy } = useGame();

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      navigate("");
    }
  }, [currentUser.isLoggedIn]);

  const returnToGameScreen = () => {
    setAccuracy(0);
    setWPM(0);
    navigate("game/");
  };

  const LogOut = () => {
    setCurrentUser({
      id: "",
      username: "",
      token: "",
      isLoggedIn: false,
    });
  };

  return (
    <>
      {currentUser.isLoggedIn && (
        <CustomAppBar>
          <AppBarContainer maxWidth="lg">
            <LeftIconContainer onClick={() => returnToGameScreen()}>
              <Typography fontSize={40}>
                TommysMamma
                <KeyboardHomeIcon style={{ fontSize: 20, color: "#e2b714" }} />
              </Typography>
            </LeftIconContainer>
            <GameTimeSettings />
            <IconContainer>
              <IconButton size="large" aria-label="profile" onClick={() => navigate("profile/")}>
                <PersonIcon style={{ fontSize: 40, color: "#fff" }} />
              </IconButton>
              <IconButton size="large" aria-label="logout" onClick={() => LogOut()}>
                <LogoutIcon style={{ fontSize: 40, color: "#fff" }} />
              </IconButton>
            </IconContainer>
          </AppBarContainer>
        </CustomAppBar>
      )}
    </>
  );
};

const CustomAppBar = styledMUI(MUIAppBar)`
  background-color: #282b30;
  box-shadow: none;
  padding: 20px 0;
`;

const AppBarContainer = styledMUI(Container)`
  display: flex;
  justify-content: space-between;
  align-self: center;

`;

const KeyboardHomeIcon = styledMUI(KeyboardIcon)`

  font-size: 40px;
  color: #424549;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const LeftIconContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

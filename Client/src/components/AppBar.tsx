import KeyboardIcon from "@mui/icons-material/Keyboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar as MUIAppBar, Container, IconButton, styled as styledMUI } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserContext";

interface AppBarProps {}

export const AppBar = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      navigate("");
    }
  }, [currentUser.isLoggedIn]);

  const LogOut = () => {
    setCurrentUser({
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
            <KeyboardHomeIcon sx={{ alignSelf: "center" }} onClick={() => navigate("")} />
            <IconContainer>
              <IconButton size="large" aria-label="profile" onClick={() => navigate("profile/")}>
                <PersonIcon style={{ fontSize: 40 }} />
              </IconButton>
              <IconButton size="large" aria-label="logout" onClick={() => LogOut()}>
                <LogoutIcon style={{ fontSize: 40 }} />
              </IconButton>
            </IconContainer>
          </AppBarContainer>
        </CustomAppBar>
      )}
    </>
  );
};

const CustomAppBar = styledMUI(MUIAppBar)`
  background-color: #92749c;
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
  color: rgba(0,0,0,0.54);
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

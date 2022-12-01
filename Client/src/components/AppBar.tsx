import { AppBar as MUIAppBar, Button, styled as styledMUI, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserContext";

interface AppBarProps{
  
}

export const AppBar = () => {
  // const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser>("currentUser", {username:"", token:"", isLoggedIn:false});
  const { currentUser ,setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      navigate("");
    }
  },[currentUser.isLoggedIn])

  const LogOut = () => {
      setCurrentUser({
        username:"",
        token:"",
        isLoggedIn:false
      })
  }

  return (
    <>
        {currentUser.isLoggedIn &&
        <MUIAppBar sx={{backgroundColor:"grey", boxShadow:"none"}}>
          <AppBarContainer>  
            <AppBarTitle>
              KBW
            </AppBarTitle>
              <Button onClick={() => LogOut()}>log out</Button>
          </AppBarContainer>
        </MUIAppBar>
        }
    </>
  )
}

const AppBarTitle = styledMUI(Typography)`
  font-size: 30px;
  text-align: center;
  color: #000000;
`;

const AppBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  align-self: center;
`;
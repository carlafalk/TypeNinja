import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar as MUIAppBar, Container, IconButton, styled as styledMUI, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        <CustomAppBar>
          <AppBarContainer maxWidth="lg">  
            <AppBarTitle>
              KBW
            </AppBarTitle>
            <IconButton aria-label="delete" onClick={() => LogOut()}>
              <LogoutIcon />
            </IconButton>
          </AppBarContainer>
        </CustomAppBar>
        }
    </>
  )
}

const CustomAppBar = styledMUI(MUIAppBar)`
  background-color: #92749c;
  box-shadow: none;
  padding: 20px 0;
`;

const AppBarTitle = styledMUI(Typography)`
  font-size: 30px;
  text-align: center;
  color: #000000;
`;

const AppBarContainer = styledMUI(Container)`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;
import { AppBar as MUIAppBar, styled, Typography } from "@mui/material";

export const AppBar = () => {
  return (
    <>
        <MUIAppBar sx={{backgroundColor:"grey", boxShadow:"none"}}>
            <AppBarTitle>
                KEYBOARD WARRIOR
            </AppBarTitle>
        </MUIAppBar>
    </>
  )
}

const AppBarTitle = styled(Typography)`
font-size: 40px;
text-align: center;
color: black;
`;

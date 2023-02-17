import { Button } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const CustomButton = ({ onClick, children }: CustomButtonProps) => {
  return (
    <MUIButton variant="contained" onClick={onClick}>
      {children}
    </MUIButton>
  );
};
const MUIButton = styledMUI(Button)`
  width: 200px; 
  margin: 10px;
  color: #e2b714;
  background-color: #424549;
  border-radius: 5rem;
  &:hover {
    background-color: #606060;
  }
`;

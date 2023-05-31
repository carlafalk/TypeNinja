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
  color: #79a617;
  background-color: #191a1b;
  border-radius: 5rem;
  &:hover {
    background-color: #48494b;
  }
`;

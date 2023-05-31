import { Typography } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  default2?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  active?: boolean;
  currentWordIndex?: number;
  currentLetterIndex?: number;
  index?: number;
  index2?: number;
};

interface StyledTextProps {
  default2?: boolean;
  correct?: boolean;
  incorrect?: boolean;
}

const Letter = ({
  children,
  correct,
  incorrect,
  default2,
  index,
  currentWordIndex,
  index2,
  currentLetterIndex,
}: Props) => {
  return (
    <StyledLetter
      className={
        index === currentLetterIndex && index2 === currentWordIndex
          ? "border-pulse"
          : "invisible-border"
      }
      correct={correct}
      incorrect={incorrect}
      default2={default2}
    >
      {children}
    </StyledLetter>
  );
};

export default Letter;

const StyledLetter = styledMUI(
  ({
    correct,
    default2,
    incorrect,
    ...props
  }: StyledTextProps & React.ComponentProps<typeof Typography>) => <Typography {...props} />
)<StyledTextProps>`
font-family: "Saira Condensed" !important;
font-size: 30px;
flex-direction: row;
  color: ${(props) => {
    if (props.correct) {
      return "#e7eae0";
    } else if (props.default2) {
      return "#48494b";
    } else if (props.incorrect) {
      return "#a61717a7";
    }
  }};
`;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Saira Condensed', sans-serif;
}

body {
    overflow-x: hidden;
    background-color: #92749c;
    height: calc(100vh - 85px);
}
`;

export default GlobalStyle;

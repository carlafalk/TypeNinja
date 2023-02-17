import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Saira Condensed', sans-serif !important;
}

body {
    overflow-x: hidden;
    background-color: #282b30;
    height: calc(100vh - 104px);
}
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'DotGothic16', sans-serif !important;

    /* font-family: 'Saira Condensed', sans-serif !important; */
}
canvas {display: block;}
body {
    overflow-x: hidden;
    background-color: #191a1b;
    height: calc(100vh - 104px);
}
`;

export default GlobalStyle;

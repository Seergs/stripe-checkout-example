import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const { colors } = theme;

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: ${colors.background};
        padding: 2rem;
        
    }

    *,*::after,*::before{
        margin:0;
        box-sizing: border-box;
        font-family: 'Asap', sans-serif;
    }
`;

export default GlobalStyles;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font: inherit;
  }

  html {
    color-scheme: light;
  }

  body {
    min-height: 100vh;
  }
  
  #app {
    min-height: 100vh;
  }

  img, picture, svg, video {
    display: block;
    max-width: 100%;
  }

  ul {
    list-style: none;
  }

`;

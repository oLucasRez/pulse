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

  // temporary
  * {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #778;

    button {
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      border: none;
      border-bottom: 2px solid lightgray;
      color: #667;
      cursor: pointer;

      :hover {
        filter: brightness(0.95);
        transition: 0.1s;
      }

      :disabled {
        pointer-events: none;
        cursor: default;
        filter: grayscale(1);

        .emoji {
          opacity: 0.4;
        }
      }
    }

    input {
      height: 1.5rem;
      border-radius: 0.5rem;
      border: none;
      border-top: 2px solid lightgray;
      background: buttonface;
      padding: 0 0.5rem;
    }
  }
`;

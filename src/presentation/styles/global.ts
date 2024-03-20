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
    font-family: 'Poppins', sans-serif;
    color: #778;

    button {
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      border: none;
      border-bottom: 2px solid lightgray;
      color: gray;
      cursor: pointer;


      :hover {
        filter: brightness(0.95);
        transition: 0.1s;
      }

      :disabled {
        pointer-events: none;
        cursor: default;
        filter: grayscale(1);
        color: darkgray;

        .emoji {
          opacity: 0.4;
        }
      }
    }

    label {
      font-size: small;
      transform: translateY(0.25rem);
      color: darkgray;
    }

    input {
      height: 1.5rem;
      border-radius: 0.5rem;
      border: none;
      border-top: 2px solid lightgray;
      background: buttonface;
      padding: 0 0.5rem;
    }

    textarea {
      resize: none;
      min-height: 4rem;
      border-radius: 0.5rem;
      border: none;
      border-top: 2px solid lightgray;
      background: buttonface;
      padding: 0 0.5rem;
    }
  }

  .handwriting, input, textarea {
    font-family: "Shantell Sans", cursive;
    font-optical-sizing: auto;
    font-variation-settings:
      "BNCE" 0,
      "INFM" 0,
      "SPAC" 0;
  }

  .sans-serif {
    font-family: 'Poppins', sans-serif;
  }
`;

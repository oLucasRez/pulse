import { createGlobalStyle, css, keyframes } from 'styled-components';

import { Color } from '@domain/enums';
import { mapEnum } from '@domain/utils';

import { getColor } from './mixins';

const ripple = keyframes`
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(10);
  }
`;

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

  span.ripple {
    position: absolute;
    border-radius: 50rem;
    background-color: rgba(0, 0, 0, 0.1);

    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;

    animation: ${ripple} 1s;
    opacity: 0;
  }

  button {
    cursor: pointer;
  }

  // temporary
  * {
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }): string => theme.foreground.dark};

    /* button {
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
    } */

    /* label {
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
    } */
  }

  .handwriting {
    font-family: "Shantell Sans", cursive;
    font-optical-sizing: auto;
    font-variation-settings:
      "BNCE" 0,
      "INFM" 0,
      "SPAC" 0;
  }

  .sans-serif {
    font-family: 'Montserrat', sans-serif;
  }

  ${mapEnum(
    Color,
    (color) => css`
      em.${color} {
        color: ${getColor(color)};
      }
    `,
  )}

  em {
    font-family: inherit;
  }
`;

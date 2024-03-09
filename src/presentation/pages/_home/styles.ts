import styled, { keyframes } from 'styled-components';

const headerHeight = '3.5rem';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  font-weight: 500;
  min-height: 100vh;
  display: flex;

  span {
    display: inline-block;
  }

  .loading {
    transform-origin: center;
    animation: ${rotate} 2s linear infinite;
  }

  b {
    font-weight: 600;
  }

  .emoji {
    font-size: 0.75em;
    vertical-align: middle;
  }

  header {
    left: 0;
    top: 0;
    right: 0;
    min-height: ${headerHeight};
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 1.5rem;
    position: fixed;
    border-bottom: 1px solid lightgray;
    background: white;

    > .providers {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      > .linkWithProvider {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border-radius: 50rem;
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    h2 {
      font-size: 1.125rem;
    }

    .greetings {
      margin-left: auto;
    }
  }

  aside {
    width: 18rem;
    padding: 1rem;
    padding-top: calc(1rem + ${headerHeight});
    border-right: 1px solid lightgray;
    min-height: 100vh;

    h3 {
      font-weight: 600;
      line-height: 2;
      margin-bottom: 0.5rem;
    }

    ul.games {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      li {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-right: auto;
        }

        p.empty {
          font-size: 0.75rem;
          opacity: 0.75;
        }

        button.create {
          margin-top: 0.5rem;
        }
      }

      > span.loading {
        width: max-content;
      }
    }
  }

  main {
    padding-top: ${headerHeight};
    flex: 1;
  }

  > #return-to-game {
    background: lightblue;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    animation: ${fromBottom} 0.4s ease;

    > button:first-of-type {
      margin-left: auto;
    }

    > button {
      line-height: 1.1;
    }
  }
`;

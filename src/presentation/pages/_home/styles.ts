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

export const Container = styled.div`
  font-weight: 500;
  min-height: 100vh;
  display: flex;

  &.globalLoading {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

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
    }
  }

  main {
    padding-top: ${headerHeight};
    flex: 1;
  }
`;
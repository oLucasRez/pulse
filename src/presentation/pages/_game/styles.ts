import styled, { keyframes } from 'styled-components';

const grow = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  font-weight: 500;
  min-height: 100vh;
  display: flex;
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;

  > button.settings {
    position: absolute;
    left: 1rem;
    top: 1rem;
  }

  span.block {
    font-size: xx-large;
  }

  p.invite {
    font-size: 0.875rem;
    opacity: 0.75;
  }

  div.link {
    margin-top: -1rem;
    display: flex;
    align-items: stretch;
    gap: 0.5rem;

    input {
      height: auto;
      width: 20rem;
    }
  }

  .players {
    display: flex;
    gap: 1.5rem;

    .loading {
      font-size: xx-large;
    }

    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      gap: 0.5rem;

      .actions {
        display: flex;
        gap: 0.25rem;
        min-height: 2rem;

        span.loading {
          font-size: inherit;
        }
      }

      .avatar {
        font-size: 5rem;
        width: 6rem;
        height: 6rem;
        text-align: center;
        border-radius: 50rem;
        line-height: 1.3;
        animation: ${grow} 0.2s ease;
      }

      .name {
        text-align: center;
      }

      .me {
        font-weight: 600;
      }
    }
  }

  button.start {
    font-size: 1.5rem;
  }

  .legend {
    font-style: italic;
    color: darkgray;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2rem;
    text-align: center;
  }
`;

import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  > form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid lightgray;
    border-bottom: 3px solid lightgray;
    padding: 1rem;
    border-radius: 0.5rem;

    > h2 {
      margin-bottom: 0.5rem;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .loading {
        transform-origin: center;
        animation: ${rotate} 2s linear infinite;
      }
    }

    > button {
      margin-top: 0.5rem;
      width: 50%;
      margin-left: auto;
    }

    > .providers {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;

      > span {
        opacity: 0.7;
        font-size: small;
        flex: 1;
      }

      > button {
        padding: 0.25rem;
        border-radius: 50rem;

        > img {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    > span.toRegisterPage {
      opacity: 0.7;
      font-size: small;
      line-height: 2;
      text-align: center;
    }
  }
`;

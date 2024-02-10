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
  width: 100%;
  font-weight: 500;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;

  .loading {
    transform-origin: center;
    animation: ${rotate} 2s linear infinite;
  }
`;

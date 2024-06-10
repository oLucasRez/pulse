import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  backdrop-filter: blur(7px);
  inset: 0;
  z-index: 10;
`;

export const Container = styled.aside`
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.background.light};
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  ${({ theme }) => theme.elevation[1]}
  animation: ${slideIn} 0.2s;
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: 2rem auto;
  grid-template-areas:
    'header close'
    'body   body ';
  gap: 1rem;

  > .IconButton {
    grid-area: close;
    margin-right: -0.5rem;
  }
`;

export const Header = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  grid-area: header;
  align-self: center;
`;

export const Body = styled.div`
  grid-area: body;
`;

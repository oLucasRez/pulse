import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const Container = styled.div.attrs({ className: 'Loading' })`
  width: 1.25rem;
  padding: 0.2rem;
  aspect-ratio: 1;
  border-radius: 50rem;
  background: ${({ theme }) => theme.foreground.light};
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${rotate} 1s infinite linear;
`;

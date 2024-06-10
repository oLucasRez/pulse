import styled, { keyframes } from 'styled-components';

import { $ContainerProps } from './types';

const pop = keyframes`
  from {
    transform: translateX(-50%) scale(0);
  }

  to {
    transform: translateX(-50%) scale(1);
  }
`;

export const ClickAway = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

export const Container = styled.div<$ContainerProps>`
  ${({ theme }) => theme.elevation[1]}
  border: ${({ theme }) => theme.border};
  padding: 0.5rem;
  border-radius: 0.75rem;
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  transform: translateX(-50%);
  transform-origin: center top;
  animation: ${pop} 100ms;
  background: ${({ theme }) => theme.background.light};

  ::before {
    content: '';
    border: ${({ theme }) => theme.border};
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: ${({ theme }) => theme.background.light};
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    top: -0.5rem;
    border-bottom: none;
    border-right: none;
    clip-path: polygon(0 100%, 0 0, 100% 0);
  }
`;

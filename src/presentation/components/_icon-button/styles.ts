import styled from 'styled-components';

import { $ContainerProps } from './types';

export const Container = styled.button<$ContainerProps>`
  border-radius: 50rem;
  border: none;
  width: ${({ $size }) =>
    $size === 'small' ? '2rem' : $size === 'medium' ? '2.5rem' : '3rem'};
  height: ${({ $size }) =>
    $size === 'small' ? '2rem' : $size === 'medium' ? '2.5rem' : '3rem'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.1s;
  font-size: ${({ $size }) =>
    $size === 'small' ? '0.75rem' : $size === 'medium' ? '0.875rem' : '1rem'};
  background: none;
  backdrop-filter: blur(5px);
  ${({ theme }) => theme.elevation[0]}

  > .Icon {
    font-size: 1.25em;
    fill: ${({ theme }) => theme.foreground.normal};
  }

  :hover {
    background: ${({ theme }) => theme.transparent.light};

    > .Icon {
      fill: ${({ theme }) => theme.foreground.dark};
    }
  }
`;

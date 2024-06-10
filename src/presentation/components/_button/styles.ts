import styled, { css } from 'styled-components';

import { $ContainerProps } from './types';

export const Container = styled.button<$ContainerProps>`
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-weight: 500;
  color: ${({ theme, $color }) =>
    $color ? theme.background.light : theme.foreground.normal};
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 2px 5px 0px #00000026;
  background: ${({ theme, $color }) =>
    $color ? theme.color($color).normal : theme.background.light};
  transition: 0.1s;
  border: ${({ theme, $color }) => ($color ? 'none' : theme.border)};
  border-bottom: 2px solid
    ${({ theme, $color }) =>
      $color ? theme.color($color).dark : theme.background.dark};

  ${({ $disabled, theme, $color }) =>
    $disabled &&
    css`
      pointer-events: none;
      color: ${$color ? theme.color($color).light : theme.foreground.light};
    `}

  > .Loading {
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    left: calc(50% - 1.25rem / 2);
    top: calc(50% - 1.25rem / 2);
  }

  &:hover {
    background: ${({ theme, $color }) =>
      $color ? theme.color($color).dark : theme.background.normal};
    ${({ theme, $color }) =>
      !$color &&
      css`
        color: ${theme.foreground.dark};
      `}
  }
`;

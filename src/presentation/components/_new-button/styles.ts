import styled from 'styled-components';

import { lighten } from '@presentation/styles/mixins';

import { $ContainerProps } from './types';

function sizes(small: string, medium: string, large: string) {
  return ({ $size }: $ContainerProps) => {
    switch ($size) {
      case 'small':
        return small;
      case 'medium':
        return medium;
      case 'large':
        return large;
    }
  };
}

export const Container = styled.button<$ContainerProps>`
  padding: ${sizes('0.25rem 0.5rem', '0.5rem 0.75rem', '0.625rem 0.875rem')};
  box-shadow: rgba(0, 0, 0, 0.15) 0px ${sizes('4px', '6px', '8px')} 0px;
  border-radius: ${sizes('0.25rem', '0.5rem', '0.75rem')};
  height: fit-content;
  line-height: 1;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme, $color }) =>
    $color ? theme.color($color).contrast : theme.foreground.normal};
  background: linear-gradient(
    to top,
    ${({ theme, $color }) =>
      $color ? theme.color($color).normal : theme.background.normal},
    ${({ theme, $color }) =>
      $color ? theme.color($color).light : theme.background.light}
  );
  border: none;
  border-bottom-style: solid;
  border-bottom-width: ${sizes('2px', '4px', '6px')};
  border-bottom-color: ${({ theme, $color }) =>
    $color ? theme.color($color).dark : lighten(theme.foreground.light, 0.1)};
  outline: 3px solid
    ${({ $color }) => ($color ? '#36363b' : lighten('#36363b', 0.25))};
  z-index: 1;
  position: relative;
  font-size: ${sizes('0.5rem', '0.75rem', '1rem')};

  &:hover {
    border-bottom-width: ${sizes('4px', '6px', '8px')};
    box-shadow: rgba(0, 0, 0, 0.15) 0px ${sizes('4px', '7px', '10px')} 0px;
    margin-top: -2px;
  }

  &:active {
    border-bottom: 0;
    box-shadow: none;
    margin-top: 4px;
  }

  &:disabled {
    background: ${({ theme }) => lighten(theme.foreground.light, 0.15)};
    border-bottom-color: ${({ theme }) => theme.foreground.light};
    color: ${({ theme }) => theme.foreground.light};
    outline: 3px solid ${lighten('#36363b', 0.4)};
    pointer-events: none;
  }

  > .Loading {
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    left: calc(50% - 1.25rem / 2);
    top: calc(50% - 1.25rem / 2);
  }
`;

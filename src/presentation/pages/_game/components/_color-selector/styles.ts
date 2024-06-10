import { FaChevronDown } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

import { $ArrowIconProps, $ColorProps, $ContainerProps } from './types';

export const Container = styled.button<$ContainerProps>`
  cursor: pointer;
  border-radius: 50rem;
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  background: none;
  border: none;
  ${({ theme }) => theme.elevation[0]}
  transition: 0.1s;

  :hover {
    background: ${({ theme }) => theme.transparent.light};
  }

  > svg {
    fill: ${({ theme }) => theme.foreground.light};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      opacity: 0.75;
    `}
`;

const styledColor = css<$ColorProps>`
  background: ${({ $color, theme }) =>
    $color ? theme.color($color).normal : 'none'};
  box-shadow: ${({ $color }) =>
    $color ? 'none' : 'inset 0px 5px 10px 0px rgba(0, 0, 0, 0.1)'};
  border-radius: 50rem;
  width: 1.5rem;
  height: 1.5rem;
`;

export const SelectedColor = styled.div<$ColorProps>`
  ${styledColor}
`;

export const PopoverContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
`;

export const ColorOption = styled.button<$ColorProps>`
  ${styledColor}
  border: none;
  transition: 0.1s;

  :hover {
    transform: scale(1.1);
  }
`;

export const ArrowIcon = styled(FaChevronDown)<$ArrowIconProps>`
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  transition: 0.1s;

  ${({ $opened }) =>
    $opened &&
    css`
      transform: rotate(180deg);
    `}
`;

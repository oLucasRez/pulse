import styled, { css } from 'styled-components';

import { Input } from '@presentation/components';
import { darken, getColor } from '@presentation/styles/mixins';

import {
  StyledColorButtonProps,
  StyledDescriptionProps,
  StyledIconProps,
} from './types';

export const Content = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content min-content min-content;
  grid-template-areas:
    'icon   label'
    'icon   description'
    'colors colors';
  gap: 0.25rem 0.75rem;
  align-items: center;
  padding: 3rem;
`;

export const Icon = styled.div<StyledIconProps>`
  font-size: 2.5rem;
  line-height: 1;
  grid-area: icon;
  justify-items: center;
  cursor: default;
  pointer-events: none;

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      pointer-events: unset;

      transition: 0.2s;
      &:hover {
        transform: scale(1.2);
      }
    `}
`;

export const Label = styled.label.attrs({ className: 'handwriting' })`
  opacity: 0.75;
  grid-area: label;
  width: max-content;
`;

export const Description = styled(Input)<StyledDescriptionProps>`
  width: max-content;
  font-size: 1.5rem;
  color: ${({ color }) => getColor(color)};
  opacity: ${({ $loading }) => $loading && 0.5};
`;

export const Colors = styled.div`
  margin-top: 0.5rem;
  grid-area: colors;
`;

export const ColorButton = styled.button<StyledColorButtonProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50rem;
  background: ${({ value }) => getColor(value)};
  border-bottom-color: ${({ value }) => darken(getColor(value), 0.1)};
  opacity: ${({ selected = true }) => !selected && 0.2};

  margin: 0.25rem 0 0 0.25rem;
  transform: translate(-0.25rem, -0.25rem);
`;

import styled, { css } from 'styled-components';

import { IconButton } from '@presentation/components';

import { $IconSelectorProps } from './types';

export const IconSelector = styled(IconButton)<$IconSelectorProps>`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2.5rem;
  line-height: 1;
  grid-area: icon;

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      opacity: 0.75;
    `}

  ${({ $readOnly }) =>
    $readOnly &&
    css`
      pointer-events: none;
    `}
`;

export const PopoverContent = styled.div`
  line-height: 1.3;
  max-height: 10rem;
  overflow-y: scroll;
  margin: -0.5rem 0;
  padding: 0.5rem 0;

  &::before,
  &::after {
    content: '';
    height: 0.5rem;
    position: absolute;
    left: 0.5rem;
    right: 0.5rem;
  }

  &::before {
    top: 0;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.background.light},
      transparent
    );
  }

  &::after {
    bottom: 0;
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.background.light},
      transparent
    );
  }
`;

export const PopoverSectionTitle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1;
  margin-bottom: 0.625rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.foreground.light};

  &::after {
    content: '';
    flex: 1;
    border: ${({ theme }) => theme.border};
  }
`;

export const PopoverSection = styled.div`
  grid-template-columns: repeat(8, 1fr);
  gap: 0.25rem;
  display: grid;
`;

export const IconOption = styled.button`
  border: none;
  transition: 0.1s;
  background: none;

  :hover {
    transform: scale(1.1);
  }
`;

export const Content = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'icon  description edit'
    'color buttons     edit';
  gap: 0.5rem 0.75rem;
  align-items: center;
  padding: 3rem;

  > .Input {
    grid-area: description;
    font-size: 1.5rem;
    margin-top: 1rem;
    justify-self: stretch;
  }

  > .IconButton.edit {
    grid-area: edit;
    align-self: flex-start;
  }

  > .ColorSelector {
    grid-area: color;
  }
`;

export const Buttons = styled.div`
  grid-area: buttons;
  justify-self: end;
  display: flex;
  gap: 0.5rem;
`;

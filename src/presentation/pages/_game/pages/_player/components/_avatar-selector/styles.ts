import styled, { css } from 'styled-components';

import { IconButton } from '@presentation/components';

import { $ContainerProps } from './types';

export const Container = styled(IconButton)<$ContainerProps>`
  width: 3.5rem;
  height: 3.5rem;
  font-size: 2.5rem;
  line-height: 1;

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
  margin-top: 0.125rem;
  font-size: 0.75rem;

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

export const AvatarOption = styled.button`
  border: none;
  transition: 0.1s;
  background: none;

  :hover {
    transform: scale(1.1);
  }
`;

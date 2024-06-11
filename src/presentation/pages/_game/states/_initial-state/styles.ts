import styled, { css, keyframes } from 'styled-components';

import { IconButton } from '@presentation/components';

import { $AvatarProps, $ContainerProps, $NameProps } from './types';

export const Container = styled.div<$ContainerProps>`
  place-self: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  max-width: calc(-8rem + 100vw);

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0.25;
      pointer-events: none;
    `}
`;

export const InviteContainer = styled.div`
  display: flex;
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
`;

export const InviteLabel = styled.label`
  font-size: 0.875rem;
  opacity: 0.75;
  text-align: center;
`;

export const InviteLink = styled.input.attrs({
  autoFocus: true,
  readOnly: true,
})`
  height: auto;
  max-width: 20rem;
  border: none;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 0.5rem;
  padding: 0 0.5rem;
`;

export const Players = styled.div`
  display: flex;
  gap: 1rem;
`;

const grow = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: ${grow} 0.2s ease;
`;

export const Avatar = styled(IconButton)<$AvatarProps>`
  width: 6rem;
  height: 6rem;
  font-size: 4.5rem;
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.transparent.dark};
  }

  ${({ $empty }) =>
    $empty &&
    css`
      pointer-events: none;
      background: ${({ theme }) => theme.transparent.normal};
    `}
`;

export const Name = styled.p.attrs({ className: 'handwriting' })<$NameProps>`
  text-align: center;
  color: ${({ $color, theme }) => theme.color($color).normal};
  max-width: 10ch;
  line-height: 1.1;
`;

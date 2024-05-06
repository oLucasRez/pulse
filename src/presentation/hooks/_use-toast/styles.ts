import styled from 'styled-components';

import { ActionButtonStyledProps } from './types';

export const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const IconContainer = styled.div`
  font-size: 2.5rem;
  line-height: 1;
`;

export const TitleContainer = styled.div.attrs({ className: 'sans-serif' })`
  font-weight: 500;
  line-height: 1.2;
  font-size: 1rem;

  em {
    font-weight: 700;
  }
`;

export const DescriptionContainer = styled.div.attrs({
  className: 'sans-serif',
})`
  line-height: 1.3;
  font-size: 0.75rem;
  opacity: 0.75;
  gap: 0.5rem;
  display: grid;

  em {
    font-weight: 600;
  }
`;

export const ActionButton = styled.button<ActionButtonStyledProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1.6;
  padding: 0.25rem 0.75rem;
  background: ${({ color }) => color};
  color: white;
  font-weight: 500;
  margin-left: auto;
  border: none;
  box-shadow: 0px 2px 3px 0px #00000021;
`;

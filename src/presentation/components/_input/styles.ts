import styled from 'styled-components';

import { InputProps } from './types';

export const Container = styled.textarea<InputProps>`
  &::placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity ?? 1};
  }

  &::-ms-input-placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity};
  }
`;

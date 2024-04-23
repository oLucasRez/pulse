import styled, { css } from 'styled-components';

import { StyledContaienr } from './types';

const containerStyle = css<StyledContaienr>`
  &::placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity ?? 1};
  }

  &::-ms-input-placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity};
  }
`;

export const InputContainer = styled.input<StyledContaienr>`
  ${containerStyle}
`;

export const TextareaContainer = styled.textarea<StyledContaienr>`
  ${containerStyle}
`;

export const DivContainer = styled.div<StyledContaienr>`
  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    pointer-events: none;
    display: block; /* For Firefox */
    color: ${({ placeholderColor }) => placeholderColor};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity};
  }
`;

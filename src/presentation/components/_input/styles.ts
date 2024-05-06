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
  background: none;
  border: none;
  padding: 0;
  outline: none;
  margin: 0.5rem 0;

  &:focus {
    text-decoration: underline;
    text-decoration-color: #77778866;
    text-decoration-thickness: 1px;
  }

  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    pointer-events: none;
    display: block; /* For Firefox */
    color: ${({ placeholderColor }) => placeholderColor};
    opacity: ${({ placeholderOpacity }) => placeholderOpacity};
  }
`;

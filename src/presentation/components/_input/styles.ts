import styled, { css } from 'styled-components';

import { $StyledContaienr } from './types';

const containerStyle = css<$StyledContaienr>`
  &::placeholder {
    color: ${({ $placeholderColor }) => $placeholderColor};
    opacity: ${({ $placeholderOpacity }) => $placeholderOpacity ?? 1};
  }

  &::-ms-input-placeholder {
    color: ${({ $placeholderColor }) => $placeholderColor};
    opacity: ${({ $placeholderOpacity }) => $placeholderOpacity};
  }
`;

export const InputContainer = styled.input<$StyledContaienr>`
  ${containerStyle}
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;

  &:not([type='range']) {
    background: ${({ theme }) => theme.background.normal};
    padding: 0.325rem 0.75rem;
  }

  &[type='range'] {
    height: 27px;
    -webkit-appearance: none;
    width: 100%;
  }
  &[type='range']:focus {
    outline: none;
  }
  &[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    animate: 0.2s;
    background: ${({ theme }) => theme.background.dark};
    border-radius: 50px;
    border: 0px solid #000000;
  }
  &[type='range']::-webkit-slider-thumb {
    ${({ theme }) => theme.elevation[0]}
    border: 0px solid #000000;
    height: 19px;
    width: 19px;
    border-radius: 50px;
    background: ${({ theme }) => theme.background.light};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.5px;
  }
  &[type='range']:focus::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.background.dark};
  }
  &[type='range']::-moz-range-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    animate: 0.2s;
    background: ${({ theme }) => theme.background.dark};
    border-radius: 50px;
    border: 0px solid #000000;
  }
  &[type='range']::-moz-range-thumb {
    ${({ theme }) => theme.elevation[0]}
    border: 0px solid #000000;
    height: 19px;
    width: 19px;
    border-radius: 50px;
    background: ${({ theme }) => theme.background.light};
    cursor: pointer;
  }
  &[type='range']::-ms-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &[type='range']::-ms-fill-lower {
    background: ${({ theme }) => theme.background.dark};
    border: 0px solid #000000;
    border-radius: 100px;
  }
  &[type='range']::-ms-fill-upper {
    background: ${({ theme }) => theme.background.dark};
    border: 0px solid #000000;
    border-radius: 100px;
  }
  &[type='range']::-ms-thumb {
    margin-top: 1px;
    ${({ theme }) => theme.elevation[0]}
    border: 0px solid #000000;
    height: 19px;
    width: 19px;
    border-radius: 50px;
    background: ${({ theme }) => theme.background.light};
    cursor: pointer;
  }
  &[type='range']:focus::-ms-fill-lower {
    background: ${({ theme }) => theme.background.dark};
  }
  &[type='range']:focus::-ms-fill-upper {
    background: ${({ theme }) => theme.background.dark};
  }
`;

export const InputWrapper = styled.div.attrs({ className: 'Input' })`
  position: relative;
`;

export const InputLabel = styled.label`
  position: absolute;
  font-weight: 500;
  top: -1.125rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.foreground.light};
`;

export const TextareaContainer = styled.textarea<$StyledContaienr>`
  ${containerStyle}
`;

export const DivContainer = styled.div<$StyledContaienr>`
  background: none;
  border: none;
  padding: 0;
  outline: none;
  color: ${({ theme, $color }) =>
    $color ? theme.color($color).normal : theme.foreground.normal};
  line-height: 1.1;

  &:focus {
    text-decoration: underline;
    text-decoration-color: #77778866;
    text-decoration-thickness: 1px;
  }

  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    pointer-events: none;
    display: block; /* For Firefox */
    color: ${({ $placeholderColor }) => $placeholderColor};
    opacity: ${({ $placeholderOpacity }) => $placeholderOpacity};
    color: inherit;
  }
`;

export const DivWrapper = styled.div`
  position: relative;
`;

export const DivLabel = styled.label`
  position: absolute;
  font-weight: 500;
  top: -1.125rem;
  font-size: 0.75rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.foreground.light};
`;

export const DivInvisibleLabel = styled.div`
  font-size: 0.75rem;
  white-space: nowrap;
  margin-top: -0.75rem;
  color: transparent !important;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  * {
    color: transparent !important;
  }
`;

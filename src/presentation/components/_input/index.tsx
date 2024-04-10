import { forwardRef } from 'react';

import { Container } from './styles';

import { InputProps } from './types';

export const Input = forwardRef<HTMLTextAreaElement, InputProps>(function Input(
  props,
  ref,
) {
  return <Container ref={ref} {...props} />;
});

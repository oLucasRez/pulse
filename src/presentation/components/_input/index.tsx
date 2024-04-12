import { forwardRef } from 'react';

import { InputContainer, TextareaContainer } from './styles';

import { InputProps } from './types';

export const Input = forwardRef<
  HTMLTextAreaElement & HTMLInputElement,
  InputProps
>(function Input({ onChange, multiline, ...props }, ref) {
  if (multiline)
    return (
      <TextareaContainer
        ref={ref}
        onChange={(e) => onChange?.(e.target.value, e)}
        {...props}
      />
    );

  return (
    <InputContainer
      ref={ref}
      onChange={(e) => onChange?.(e.target.value, e)}
      {...props}
    />
  );
});

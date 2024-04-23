import { forwardRef } from 'react';

import { DivContainer, InputContainer, TextareaContainer } from './styles';

import { InputProps } from './types';

export const Input = forwardRef<
  HTMLTextAreaElement & HTMLDivElement & HTMLInputElement,
  InputProps
>(function Input({ onChange, variant = 'single-line', ...props }, ref) {
  if (variant === 'multiline')
    return (
      <TextareaContainer
        ref={ref}
        onChange={(e) => onChange?.(e.target.value, e)}
        {...props}
      />
    );

  if (variant === 'baking-paper')
    return (
      <DivContainer
        ref={ref}
        className='handwriting'
        onInput={(e: any) => onChange?.(e.target.innerText, e)}
        contentEditable={!props.disabled}
        {...props}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          outline: 'none',
          ...props.style,
        }}
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

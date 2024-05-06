import { forwardRef, useMemo } from 'react';

import { DivContainer, InputContainer, TextareaContainer } from './styles';

import { InputProps } from './types';

export const Input = forwardRef<Input.Element, InputProps>(function Input(
  { onChange, variant = 'single-line', ...props },
  ref,
) {
  const defaultValue = useMemo(() => props.defaultValue, []);

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
        onInput={(e: any) => onChange?.(e.target.innerText, e)}
        contentEditable={!props.disabled}
        suppressContentEditableWarning
        {...props}
        className={[props.className, 'handwriting'].join(' ')}
      >
        {defaultValue}
      </DivContainer>
    );

  return (
    <InputContainer
      ref={ref}
      onChange={(e) => onChange?.(e.target.value, e)}
      {...props}
    />
  );
});

export namespace Input {
  export type Element = HTMLTextAreaElement & HTMLDivElement & HTMLInputElement;
}

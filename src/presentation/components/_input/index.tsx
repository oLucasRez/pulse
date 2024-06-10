import { faker } from '@faker-js/faker';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { useStates } from '@presentation/hooks';

import {
  DivContainer,
  DivInvisibleLabel,
  DivLabel,
  DivWrapper,
  InputContainer,
  InputLabel,
  InputWrapper,
  TextareaContainer,
} from './styles';

import { InputProps } from './types';

export const Input = forwardRef<Input.Element, InputProps>(function Input(
  {
    onChange,
    variant = 'single-line',
    placeholderOpacity = 0.5,
    label,
    type = 'text',
    ...props
  },
  outerRef,
) {
  const innerRef = useRef<Input.Element>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(outerRef, () => innerRef.current!, []);

  const [s] = useStates({
    defaultValue: props.value ?? props.defaultValue,
  });

  useEffect(() => {
    if (props.disabled) s.defaultValue = props.value ?? props.defaultValue;
  }, [props.disabled, props.value, props.defaultValue]);

  const id = useMemo(() => props.id ?? faker.string.uuid(), [props.id]);

  if (variant === 'multiline')
    return (
      <TextareaContainer
        ref={innerRef}
        onChange={(e) => onChange?.(e.target.value, e)}
        $placeholderOpacity={placeholderOpacity}
        {...props}
        id={id}
      />
    );

  if (variant === 'baking-paper')
    return (
      <DivWrapper
        className={[props.className, 'Input'].filter((x) => x).join(' ')}
      >
        {!!label && <DivLabel htmlFor={id}>{label}</DivLabel>}
        {!!label && <DivInvisibleLabel>{label}</DivInvisibleLabel>}
        <DivContainer
          ref={innerRef}
          onInput={(e: any) => onChange?.(e.target.innerText, e)}
          contentEditable={!props.disabled}
          suppressContentEditableWarning
          {...props}
          $color={props.color}
          id={id}
          $placeholderOpacity={placeholderOpacity}
          // className={[props.className, 'handwriting'].join(' ')}
          className='handwriting'
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        >
          {s.defaultValue}
        </DivContainer>
      </DivWrapper>
    );

  return (
    <InputWrapper>
      {!!label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputContainer
        ref={innerRef}
        onChange={(e) => onChange?.(e.target.value, e)}
        $placeholderOpacity={placeholderOpacity}
        type={type}
        {...props}
        id={id}
      />
    </InputWrapper>
  );
});

export namespace Input {
  export type Element = HTMLTextAreaElement & HTMLDivElement & HTMLInputElement;
  export type Props = InputProps;
}

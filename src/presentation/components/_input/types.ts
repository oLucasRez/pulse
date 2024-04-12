import { ChangeEvent, CSSProperties, HTMLAttributes } from 'react';

export type InputProps = Omit<
  HTMLAttributes<HTMLTextAreaElement> & HTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  multiline?: boolean;
  placeholderColor?: CSSProperties['color'];
  placeholderOpacity?: CSSProperties['opacity'];
  disabled?: boolean;
  onChange?(
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
};

export type StyledContaienr = {
  placeholderColor?: CSSProperties['color'];
  placeholderOpacity?: CSSProperties['opacity'];
};

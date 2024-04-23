import { ChangeEvent, CSSProperties, HTMLAttributes } from 'react';

export type InputProps = Omit<
  HTMLAttributes<HTMLTextAreaElement> &
    HTMLAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  variant?: 'single-line' | 'multiline' | 'baking-paper';
  placeholderColor?: CSSProperties['color'];
  placeholderOpacity?: CSSProperties['opacity'];
  disabled?: boolean;
  onChange?(
    value: string,
    event: ChangeEvent<HTMLTextAreaElement | HTMLDivElement | HTMLInputElement>,
  ): void;
};

export type StyledContaienr = {
  placeholderColor?: CSSProperties['color'];
  placeholderOpacity?: CSSProperties['opacity'];
};

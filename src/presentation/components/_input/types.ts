import { ChangeEvent, CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { Color } from '@domain/enums';

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
  label?: ReactNode;
  color?: Color;
  type?: 'text' | 'range';
  min?: number;
  max?: number;
  step?: number;
  value?: string;
  onChange?(
    value: string,
    event: ChangeEvent<HTMLTextAreaElement | HTMLDivElement | HTMLInputElement>,
  ): void;
};

export type $StyledContaienr = {
  $placeholderColor?: CSSProperties['color'];
  $placeholderOpacity?: CSSProperties['opacity'];
  $color?: Color;
};

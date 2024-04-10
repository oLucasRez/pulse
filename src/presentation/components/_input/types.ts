import { CSSProperties, HTMLAttributes } from 'react';

export interface InputProps extends HTMLAttributes<HTMLTextAreaElement> {
  placeholderColor?: CSSProperties['color'];
  placeholderOpacity?: CSSProperties['opacity'];
}

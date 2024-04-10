import { HTMLAttributes } from 'react';

export interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  strokeWidth?: number;
  stroke?: string;
}

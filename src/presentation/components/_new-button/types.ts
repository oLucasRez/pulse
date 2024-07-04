import { HTMLAttributes } from 'react';

import { Color } from '@domain/enums';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface $ContainerProps {
  $color?: Color;
  $size: 'small' | 'medium' | 'large';
}

import { HTMLAttributes } from 'react';

import { Color } from '@domain/enums';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
}

export interface $ContainerProps {
  $color?: Color;
  $disabled?: boolean;
}

import { Color } from '@domain/enums';

export interface StyledIconProps {
  disabled?: boolean;
}

export interface StyledDescriptionProps {
  color?: Color;
  $loading?: boolean;
}

export interface StyledColorButtonProps {
  value: Color;
  selected?: boolean;
  $loading?: boolean;
}

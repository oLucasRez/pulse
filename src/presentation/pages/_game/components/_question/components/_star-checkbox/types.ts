import { Color } from '@domain/enums';

export interface StarCheckboxProps {
  checked?: boolean;
  expired?: boolean;
  color?: Color;
  onCheck?(): void;
}

import { Color } from '@domain/enums';

export interface ColorSelectorProps {
  defaultValue?: Color;
  disabled?: boolean;
  onChange?(color: Color): void;
}

export interface $ContainerProps {
  $disabled?: boolean;
}

export interface $ColorProps {
  $color?: Color;
}

export interface $ArrowIconProps {
  $opened?: boolean;
}

import { Color } from '@domain/enums';

import { IconButtonProps } from '@presentation/components/_icon-button/types';

export interface $ContainerProps {
  $hidden: boolean;
}

export interface $AvatarProps extends IconButtonProps {
  $empty?: boolean;
}

export interface $NameProps {
  $color: Color;
}

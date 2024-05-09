import { Color } from '@domain/enums';

import { Input } from '@presentation/components';

export interface StyledDescriptionProps extends Input.Props {
  color?: Color;
}

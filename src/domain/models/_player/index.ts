import { Color } from '@domain/enums';

import { Model } from '../_model';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
}

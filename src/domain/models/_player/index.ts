import { Color } from '@domain/enums';

import { Model } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  gameID: string;
  diceID: string;
  subjectID: string | null;
}

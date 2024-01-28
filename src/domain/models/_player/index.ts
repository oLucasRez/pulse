import { Color } from '@domain/enums';

import { Model } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  userID: string | null;
  diceID: string;
  subjectID: string | null;
}

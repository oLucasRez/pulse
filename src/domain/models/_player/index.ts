import { Color } from '@domain/enums';

import { DiceModel, Model, SubjectModel, UserModel } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  userID: UserModel['id'] | null;
  diceID: DiceModel['id'];
  subjectID: SubjectModel['id'] | null;
}

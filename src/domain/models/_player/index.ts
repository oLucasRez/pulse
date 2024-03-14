import { Color } from '@domain/enums';

import { DiceModel, Model, SubjectModel, UserModel } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  avatar: string;
  uid: UserModel['uid'];
  diceID: DiceModel['id'] | null;
  subjectID: SubjectModel['id'] | null;
  banned: boolean;
  order: number;
}

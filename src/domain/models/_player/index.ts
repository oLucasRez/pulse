import { Color } from '@domain/enums';

import { DiceModel, Model, SubjectModel, UserModel } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  avatar: string;
  uid: UserModel['uid'];
  dice: DiceModel | null;
  subject: SubjectModel | null;
  banned: boolean;
}

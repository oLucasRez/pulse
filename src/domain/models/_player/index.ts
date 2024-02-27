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

export namespace PlayerModel {
  export type JSON = Model.JSON & {
    name: string;
    color: Color;
    avatar: string;
    uid: UserModel['uid'];
    diceID: DiceModel['id'] | null;
    subjectID: SubjectModel['id'] | null;
    banned: boolean;
  };
}

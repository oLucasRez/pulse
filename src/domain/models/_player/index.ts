import { Color } from '@domain/enums';

import { Model, SubjectModel, UserModel } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  avatar: string;
  user: UserModel;
  subject: SubjectModel | null;
  banned: boolean;
}

export namespace PlayerModel {
  export type JSON = Model.JSON & {
    name: string;
    color: Color;
    avatar: string;
    uid: UserModel['id'];
    subjectID: SubjectModel['id'] | null;
    banned: boolean;
  };
}

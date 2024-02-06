import { Color } from '@domain/enums';

import { Model, SubjectModel, UserModel } from '..';

export interface PlayerModel extends Model {
  name: string;
  color: Color;
  userID: UserModel['id'] | null;
  subjectID: SubjectModel['id'] | null;
}

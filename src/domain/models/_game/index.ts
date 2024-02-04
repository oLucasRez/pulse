import { Model, UserModel } from '..';

export interface GameModel extends Model {
  hostID: UserModel['id'];
  title: string | null;
}

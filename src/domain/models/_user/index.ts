import { GameModel, Model } from '..';

export interface UserModel extends Model {
  uid: string;
  name: string;
  currentGameID: GameModel['id'] | null;
}

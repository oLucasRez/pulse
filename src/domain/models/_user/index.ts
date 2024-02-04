import { GameModel, Model } from '..';

export interface UserModel extends Model {
  name: string;
  currentGameID: GameModel['id'] | null;
}

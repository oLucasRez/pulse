import { Model, PlayerModel } from '..';

export interface RoundModel extends Model {
  playerIDs: PlayerModel['id'][];
  currentPlayerID: PlayerModel['id'] | null;
}

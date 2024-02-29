import { Model, PlayerModel } from '..';

export interface RoundModel extends Model {
  players: PlayerModel[];
  currentPlayer: PlayerModel | null;
}

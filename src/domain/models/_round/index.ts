import { Model, PlayerModel } from '..';

export interface RoundModel extends Model {
  players: PlayerModel[];
  currentPlayer: PlayerModel | null;
}

export namespace RoundModel {
  export type JSON = Model.JSON & {
    playerIDs: PlayerModel['id'][];
    currentPlayerID: PlayerModel['id'] | null;
  };
}

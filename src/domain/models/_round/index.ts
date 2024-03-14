import { Model, PlayerModel } from '..';

export interface RoundModel extends Model {
  i: number | null;
  clockwise: RoundModel.Clockwise | null;
  playerIDs: PlayerModel['id'][];
  started: boolean;
  finished: boolean;
}

export namespace RoundModel {
  export type Clockwise = 'clockwise' | 'counterclockwise';
}

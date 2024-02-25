import { Model, UserModel } from '..';

export interface GameModel extends Model {
  host: UserModel;
  title: string | null;
  config: {
    maxPlayers: number;
    withLightspot: boolean;
    dicesMode: GameModel.DicesMode;
  };
  started: boolean;
  state: GameModel.State;
}

export namespace GameModel {
  export type DicesMode = 'equal' | 'growing';

  export type State =
    | 'initial:state'
    | 'creating:subjects'
    | 'creating:centralFact';

  export type JSON = Model.JSON & {
    uid: UserModel['uid'];
    title: string | null;
    config: {
      maxPlayers: number;
      withLightspot: boolean;
      dicesMode: DicesMode;
    };
    started: boolean;
    state: GameModel.State;
  };
}

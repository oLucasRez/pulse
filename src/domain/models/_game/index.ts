import { Model, RoundModel, UserModel } from '..';

export interface GameModel extends Model {
  uid: UserModel['uid'];
  title: string | null;
  config: GameModel.Config;
  started: boolean;
  state: GameModel.State;
  round: RoundModel | null;
  lightspotRound: RoundModel | null;
}

export namespace GameModel {
  export type DicesMode = 'equal' | 'growing';

  export type State =
    | 'initial:state'
    | 'creating:subjects'
    | 'creating:centralFact';

  export type Config = {
    maxPlayers: number;
    withLightspot: boolean;
    dicesMode: DicesMode;
  };
}

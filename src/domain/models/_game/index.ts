import { Model, RoundModel, UserModel } from '..';

export interface GameModel extends Model {
  uid: UserModel['uid'];
  title: string | null;
  config: GameModel.Config;
  state: GameModel.State;
  roundID: RoundModel['id'] | null;
  lightSpotRoundID: RoundModel['id'] | null;
}

export namespace GameModel {
  export type DicesMode = 'equal' | 'growing';

  // export type State =
  //   | 'initial:state'
  //   | 'creating:subjects'
  //   | 'creating:centralFact'
  //   | 'creating:questions'
  //   | 'creating:answers'
  //   | 'creating:lightSpot'
  //   | 'final:state';

  export type State =
    | ['initial:state']
    | ['creating:subjects']
    | [
        'creating:centralFact',
        'change:centralFact' | 'roll:dice' | 'update:dice:position',
      ]
    | ['creating:questions']
    | ['creating:answers']
    | ['creating:lightSpot']
    | ['final:state'];

  export type Config = {
    maxPlayers: number;
    withLightSpot: boolean;
    dicesMode: DicesMode;
  };
}

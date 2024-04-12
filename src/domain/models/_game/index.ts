import { CentralPulseModel, Model, RoundModel, UserModel } from '..';

export interface GameModel extends Model {
  uid: UserModel['uid'];
  title: string | null;
  config: GameModel.Config;
  state: GameModel.State;
  voting: GameModel.Voting | null;
  centralPulseID: CentralPulseModel['id'] | null;
  roundID: RoundModel['id'] | null;
  lightSpotRoundID: RoundModel['id'] | null;
}

export namespace GameModel {
  export type DicesMode = 'equal' | 'growing';

  export type State =
    | ['initial:state']
    | ['creating:subjects']
    | [
        'creating:centralFact',
        'change:centralFact' | 'roll:dice' | 'update:dice:position',
      ]
    | [
        'creating:questions',
        (
          | 'roll:dice'
          | 'create:subjectPulse'
          | 'update:dice:position'
          | 'create:question'
        ),
      ]
    | ['creating:answers', 'create:answer' | 'vote:answer']
    | ['creating:lightSpot']
    | ['final:state'];

  export type Config = {
    maxPlayers: number;
    withLightSpot: boolean;
    dicesMode: DicesMode;
  };

  export type Voting = {
    answerID: string;
    votes: Record<string, boolean>;
  };

  export interface DTO extends Model.DTO {
    uid: string;
    title: string | null;
    config: GameModel.Config;
    state: GameModel.State;
    voting: GameModel.Voting | null;
    centralPulseID: string | null;
    roundID: string | null;
    lightSpotRoundID: string | null;
  }
}

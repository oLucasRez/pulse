import {
  AnswerModel,
  CentralPulseModel,
  Model,
  RoundModel,
  UserModel,
} from '..';

export interface GameModel extends Model {
  uid: UserModel['uid'];
  title: string | null;
  config: GameModel.Config;
  state: GameModel.State;
  centralPulseID: CentralPulseModel['id'] | null;
  roundID: RoundModel['id'] | null;
  lightSpotRoundID: RoundModel['id'] | null;
  votingAnswerID: AnswerModel['id'] | null;
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
    | ['creating:lightSpot', 'roll:dice' | 'create:subject']
    | ['final:state'];

  // export const STATES: {
  //   value: State[0];
  //   subState?: State[1][];
  // }[] = [
  //   { value: 'initial:state' },
  //   { value: 'creating:subjects' },
  //   {
  //     value: 'creating:centralFact',
  //     subState: ['change:centralFact', 'roll:dice', 'update:dice:position'],
  //   },
  //   {
  //     value: 'creating:questions',
  //     subState: [
  //       'roll:dice',
  //       'create:subjectPulse',
  //       'update:dice:position',
  //       'create:question',
  //     ],
  //   },
  //   { value: 'creating:answers', subState: ['create:answer', 'vote:answer'] },
  //   { value: 'creating:lightSpot', subState: ['roll:dice', 'create:subject'] },
  //   { value: 'final:state' },
  // ];

  export type Config = {
    maxPlayers: number;
    withLightSpot: boolean;
    dicesMode: DicesMode;
  };

  export interface DTO extends Model.DTO {
    uid: string;
    title: string | null;
    config: GameModel.Config;
    state: GameModel.State;
    centralPulseID: string | null;
    roundID: string | null;
    lightSpotRoundID: string | null;
    votingAnswerID: string | null;
  }
}

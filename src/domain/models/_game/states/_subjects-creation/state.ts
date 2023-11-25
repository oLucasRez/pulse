import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
  LightSpot,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { Round } from '../../_round';
import { CentralFactCreationGameState } from '../_central-fact-creation';
import { GameState } from '../state';
import { CreatingSubjectState, SubjectsCreationState } from './states';

export class SubjectsCreationGameState
  extends GameState
  implements Round.RoundFinishObserver
{
  private state: SubjectsCreationState;

  protected constructor(props: SubjectsCreationGameState.NewProps) {
    const { state, ...stateProps } = props;

    super(stateProps);

    this.state = state ?? CreatingSubjectState.create({ ctx: this });

    const round = this.ctx.getRound();

    round.subscribeRoundFinishObserver(this);

    round.startRound(Round.Rotation.CLOCKWISE);
  }
  public static create(
    props: SubjectsCreationGameState.CreateProps,
  ): SubjectsCreationGameState {
    return new SubjectsCreationGameState(props);
  }
  public static recreate(
    props: SubjectsCreationGameState.RecreateProps,
  ): SubjectsCreationGameState {
    return new SubjectsCreationGameState(props);
  }

  public getState(): SubjectsCreationGameState['state'] {
    return this.state;
  }

  public setState(state: SubjectsCreationGameState['state']): void {
    this.state = state;
  }

  public onRoundFinish(): void {
    this.ctx.setState(CentralFactCreationGameState.create({ ctx: this.ctx }));
  }

  public createSubject(
    props: SubjectsCreationGameState.CreateSubjectProps,
  ): Subject {
    return this.state.createSubject(props);
  }

  public passTurn(): void {
    return this.state.passTurn();
  }
  // --------------------------------------------------------------------------
  public start(): void {
    throw 'Method not allowed';
  }
  public updateCentralFactDescription(): CentralFact {
    throw 'Method not allowed';
  }
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public updateCentralPulseAmount(): CentralPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public createSubjectPulse(): SubjectPulse {
    throw 'Method not allowed';
  }
  public getCrossings(): crossing[] {
    throw 'Method not allowed';
  }
  public createQuestion(): Question {
    throw 'Method not allowed';
  }
  public answerQuestion(): Answer {
    throw 'Method not allowed';
  }
  public playerVote(): void {
    throw 'Method not allowed';
  }
  public finishVoting(): boolean {
    throw 'Method not allowed';
  }
  public createLightSpot(): LightSpot {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace SubjectsCreationGameState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = GameState.CreateProps;

  export type RecreateProps = GameState.RecreateProps &
    Required<CreateProps> & {
      state: SubjectsCreationGameState['state'];
    };

  export type CreateSubjectProps = GameState.CreateSubjectProps;
}

import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
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

  public constructor(props: SubjectsCreationGameState.NewProps) {
    const { state, ...stateProps } = props;

    super(stateProps);

    this.state = state ?? new CreatingSubjectState({ ctx: this });

    const round = this.ctx.getRound();

    round.subscribeRoundFinishObserver(this);

    round.startRound(Round.Rotation.CLOCKWISE);
  }

  public getState(): SubjectsCreationGameState['state'] {
    return this.state;
  }

  public setState(state: SubjectsCreationGameState['state']): void {
    this.state = state;
  }

  public onRoundFinish(): void {
    this.ctx.setState(new CentralFactCreationGameState({ ctx: this.ctx }));
  }

  public createSubject(props: GameState.CreateSubjectProps): Subject {
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
}
// ============================================================================
export namespace SubjectsCreationGameState {
  export type NewProps = GameState.NewProps & {
    state?: SubjectsCreationGameState['state'];
  };
}

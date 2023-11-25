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
import { InvestigationGameState } from '../_investigation';
import { GameState } from '../state';
import {
  CentralFactCreationState,
  UpdatingCentralFactDescriptionState,
} from './states';

export class CentralFactCreationGameState
  extends GameState
  implements Round.RoundFinishObserver
{
  private state: CentralFactCreationState;

  public constructor(props: CentralFactCreationGameState.NewProps) {
    const { state, ...stateProps } = props;

    super(stateProps);

    this.state =
      state ?? new UpdatingCentralFactDescriptionState({ ctx: this });

    const round = this.ctx.getRound();

    round.subscribeRoundFinishObserver(this);

    round.startRound(Round.Rotation.ANTICLOCKWISE);
  }

  public getState(): CentralFactCreationGameState['state'] {
    return this.state;
  }

  public setState(state: CentralFactCreationGameState['state']): void {
    this.state = state;
  }

  public onRoundFinish(): void {
    this.ctx.setState(new InvestigationGameState({ ctx: this.ctx }));
  }

  public updateCentralFactDescription(
    description: CentralFact['description'],
  ): CentralFact {
    return this.state.updateCentralFactDescription(description);
  }

  public rollDice(): Dice {
    return this.state.rollDice();
  }

  public updateCentralPulseAmount(): CentralPulse {
    return this.state.updateCentralPulseAmount();
  }

  public updateDicePosition(position: NonNullable<Dice['position']>): Dice {
    return this.state.updateDicePosition(position);
  }

  public passTurn(): void {
    return this.state.passTurn();
  }
  // --------------------------------------------------------------------------
  public start(): void {
    throw 'Method not allowed';
  }
  public createSubject(): Subject {
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
export namespace CentralFactCreationGameState {
  export type NewProps = GameState.NewProps & {
    state?: CentralFactCreationGameState['state'];
  };
}

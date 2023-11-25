import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
  LightSpot,
  Question,
  Round,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { InvestigationGameState } from '../_investigation';
import { GameState } from '../state';
import { LightSpotCreationState, UpdatingDicePositionState } from './states';

export class LightSpotCreationGameState
  extends GameState
  implements Round.TurnFinishObserver
{
  private state: LightSpotCreationState;

  protected constructor(props: LightSpotCreationGameState.NewProps) {
    const { state, ...stateProps } = props;

    super(stateProps);

    this.state = state ?? UpdatingDicePositionState.create({ ctx: this });

    const round = this.ctx.getLightSpotRound();

    round.subscribeTurnFinishObserver(this);

    round.startRound(Round.Rotation.CLOCKWISE);
  }
  public static create(
    props: LightSpotCreationGameState.CreateProps,
  ): LightSpotCreationGameState {
    return new LightSpotCreationGameState(props);
  }
  public static recreate(
    props: LightSpotCreationGameState.RecreateProps,
  ): LightSpotCreationGameState {
    return new LightSpotCreationGameState(props);
  }

  public getState(): LightSpotCreationGameState['state'] {
    return this.state;
  }

  public setState(state: LightSpotCreationGameState['state']): void {
    this.state = state;
  }

  public updateDicePosition(position: NonNullable<Dice['position']>): Dice {
    return this.state.updateDicePosition(position);
  }

  public createLightSpot(
    props: LightSpotCreationGameState.CreateLightSpotProps,
  ): LightSpot {
    return this.state.createLightSpot(props);
  }

  public passTurn(): void {
    return this.state.passTurn();
  }

  public onTurnFinish(): void {
    this.ctx.setState(InvestigationGameState.create({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public start(): void {
    throw 'Method not allowed';
  }
  public createSubject(): Subject {
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
export namespace LightSpotCreationGameState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = GameState.CreateProps;

  export type RecreateProps = GameState.RecreateProps &
    Required<CreateProps> & {
      state: LightSpotCreationGameState['state'];
    };

  export type CreateLightSpotProps = GameState.CreateLightSpotProps;
}

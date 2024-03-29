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

import { Crossing } from '@utils';

import { crossing } from '@types';

import { ConjecturesGameState } from '../_conjectures';
import { GameState } from '../state';
import { InvestigationState, RollingDiceState } from './states';

export class InvestigationGameState
  extends GameState
  implements Round.RoundFinishObserver
{
  private state: InvestigationState;

  protected constructor(props: InvestigationGameState.NewProps) {
    const { state, ...stateProps } = props;

    super(stateProps);

    this.state = state ?? RollingDiceState.create({ ctx: this });

    const round = this.ctx.getRound();

    round.subscribeRoundFinishObserver(this);

    round.startRound(Round.Rotation.CLOCKWISE);
  }
  public static create(
    props: InvestigationGameState.CreateProps,
  ): InvestigationGameState {
    return new InvestigationGameState(props);
  }
  public static recreate(
    props: InvestigationGameState.RecreateProps,
  ): InvestigationGameState {
    return new InvestigationGameState(props);
  }

  public getState(): InvestigationGameState['state'] {
    return this.state;
  }

  public setState(state: InvestigationGameState['state']): void {
    this.state = state;
  }

  public onRoundFinish(): void {
    this.ctx.setState(new ConjecturesGameState({ ctx: this.ctx }));
  }

  public rollDice(): Dice {
    return this.state.rollDice();
  }

  public createSubjectPulse(gap: SubjectPulse['gap']): SubjectPulse {
    return this.state.createSubjectPulse(gap);
  }

  public getCrossings(tolerance?: number): crossing[] {
    const currentPlayer = this.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const playerSubject = currentPlayer.getSubject();
    if (!playerSubject) throw 'Current player must have a subject';

    const lastPulse = playerSubject.getLastPulse();
    if (!lastPulse) return [];

    const map = this.ctx.getMap();
    const crossings = Crossing.get(lastPulse, map.getPulses(), tolerance);

    console.log({ crossings });

    return crossings;
  }

  public updateDicePosition(position: NonNullable<Dice['position']>): Dice {
    return this.state.updateDicePosition(position);
  }

  public createQuestion(props: GameState.CreateQuestionProps): Question {
    return this.state.createQuestion(props);
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
  public updateCentralFactDescription(): CentralFact {
    throw 'Method not allowed';
  }
  public updateCentralPulseAmount(): CentralPulse {
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
export namespace InvestigationGameState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = GameState.CreateProps;

  export type RecreateProps = GameState.RecreateProps &
    Required<CreateProps> & {
      state: InvestigationGameState['state'];
    };

  export type CreateQuestionProps = GameState.CreateQuestionProps;
}

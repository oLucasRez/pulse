import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Question,
  Round,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { Crossing } from '@utils';

import { crossing, vector } from '@types';

import { GameState } from '../state';
import { DiceRollingState, InvestigationState } from './states';

export class InvestigationGameState extends GameState {
  private rounding: Round.StartReturn;
  private turn: IteratorResult<Player, null>;

  private state: InvestigationState;

  public constructor(context: GameState.NewProps) {
    super(context);

    this.rounding = this.context.getRound().start(Round.Rotation.CLOCKWISE);
    this.turn = this.rounding.next();
    this.state = new DiceRollingState(this);
  }

  public setState(state: InvestigationState): void {
    this.state = state;
  }

  public start(): void {
    throw 'start() method not allowed';
  }

  public getCurrentPlayer(): Player | null {
    const currentPlayer = this.turn.value;

    return currentPlayer;
  }

  public createSubject(): Subject {
    throw 'createSubject() method not allowed';
  }

  public finishTurn(): void {
    this.turn = this.rounding.next();

    if (this.turn.done)
      return this.context.setState(new InvestigationGameState(this.context));
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollCurrentDice(): Dice {
    return this.state.rollCurrentDice();
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }

  public updateCurrentDicePosition(position: vector): Dice {
    return this.state.updateCurrentDicePosition(position);
  }

  public updateCurrentSubjectPosition(): Subject {
    throw 'updateCurrentSubjectPosition() method not allowed';
  }

  public createSubjectPulse(gap: number): SubjectPulse {
    return this.state.createSubjectPulse(gap);
  }

  public getCrossings(tolerance?: number): crossing[] {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const playerSubject = currentPlayer.getSubject();
    if (!playerSubject) throw 'Current player must have a subject';

    const lastPulse = playerSubject.getLastPulse();
    if (!lastPulse) return [];

    const crossings = Crossing.get(
      lastPulse,
      this.context.getPulses(),
      tolerance,
    );

    return crossings;
  }

  public createQuestion(props: GameState.CreateQuestionProps): Question {
    return this.state.createQuestion(props);
  }
}

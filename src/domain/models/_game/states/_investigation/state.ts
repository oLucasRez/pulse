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

import { GameState } from '../state';
import { DiceValueUpdationState, InvestigationState } from './states';

export class InvestigationGameState extends GameState {
  private rounding: Round.StartReturn;
  private turn: IteratorResult<Player, null>;

  private state: InvestigationState;

  public constructor(context: GameState.NewProps) {
    super(context);

    this.rounding = this.context.getRound().start(Round.Rotation.CLOCKWISE);
    this.turn = this.rounding.next();
    this.state = new DiceValueUpdationState(this);
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

  public updateCurrentDiceValue(value: number): Dice {
    return this.state.updateCurrentDiceValue(value);
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }

  public updateCurrentDicePosition(): Dice {
    throw 'updateCurrentDicePosition() method not allowed';
  }

  public updateCurrentSubjectPosition(): Subject {
    throw 'updateCurrentSubjectPosition() method not allowed';
  }

  public createSubjectPulse(gap: number): SubjectPulse {
    return this.state.createSubjectPulse(gap);
  }

  public createQuestion(props: GameState.CreateQuestionProps): Question {
    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const question = currentPlayer.createQuestion(props);

    return question;
  }
}

import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { vector } from '@types';

import { Round } from '../../_round';
import { InvestigationGameState } from '../_investigation';
import { GameState } from '../state';
import {
  CentralFactCreationState,
  CentralFactDescriptionUpdationState,
} from './states';

export class CentralFactCreationGameState extends GameState {
  private rounding: Round.StartReturn;
  private turn: IteratorResult<Player, null>;

  private state: CentralFactCreationState;

  public constructor(context: CentralFactCreationGameState.NewProps) {
    super(context);

    this.rounding = this.context.getRound().start(Round.Rotation.ANTICLOCKWISE);
    this.turn = this.rounding.next();
    this.state = new CentralFactDescriptionUpdationState(this);
  }
  public setState(state: CentralFactCreationState): void {
    this.state = state;
  }

  public start(): void {
    throw 'start() method not allowed';
  }

  public getCurrentPlayer(): Player | null {
    const currentPlayer = this.turn.value;

    return currentPlayer;
  }

  public finishTurn(): void {
    this.turn = this.rounding.next();

    if (this.turn.done)
      return this.context.setState(new InvestigationGameState(this.context));
  }

  public createSubject(): Subject {
    throw 'createSubject() method not allowed';
  }

  public updateCentralFactDescription(description: string): CentralFact {
    return this.state.updateCentralFactDescription(description);
  }

  public updateCurrentDiceValue(value: number): Dice {
    return this.state.updateCurrentDiceValue(value);
  }

  public updateCentralPulseAmount(): CentralPulse {
    return this.state.updateCentralPulseAmount();
  }

  public updateCurrentDicePosition(position: vector): Dice {
    return this.state.updateCurrentDicePosition(position);
  }

  public updateCurrentSubjectPosition(): Subject {
    return this.state.updateCurrentSubjectPosition();
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public createQuestion(): Question {
    throw 'createQuestion() method not allowed';
  }
}

export namespace CentralFactCreationGameState {
  export type NewProps = GameState.NewProps;
}

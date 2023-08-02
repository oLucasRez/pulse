import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Question,
  Subject,
  SubjectPulse,
} from '@domain/models';

import { crossing } from '@types';

import { SubjectCreationGameState } from '../_subject-creation';
import { GameState } from '../state';

export class InitialGameState extends GameState {
  public constructor(context: InitialGameState.NewProps) {
    super(context);
  }

  public start(): void {
    this.context.setState(new SubjectCreationGameState(this.context));
  }

  public getCurrentPlayer(): Player | null {
    throw 'getCurrentPlayer() method not allowed';
  }

  public createSubject(): Subject {
    throw 'createSubject() method not allowed';
  }

  public finishTurn(): void {
    throw 'finishTurn() method not allowed';
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollCurrentDice(): Dice {
    throw 'rollCurrentDice() method not allowed';
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

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public getCrossings(): crossing[] {
    throw 'getCrossings() method not allowed';
  }

  public createQuestion(): Question {
    throw 'createQuestion() method not allowed';
  }
}

export namespace InitialGameState {
  export type NewProps = GameState.NewProps;
}

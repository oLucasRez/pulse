import { CentralFact, CentralPulse, Player, Subject } from '@domain/models';

import { SubjectCreationGameState } from '../_subject-creation';
import { GameState } from '../this';

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

  public rollDice(): number {
    throw 'rollDice() method not allowed';
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }
}

export namespace InitialGameState {
  export type NewProps = GameState.NewProps;
}

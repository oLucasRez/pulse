import { CentralFact, CentralPulse } from '@domain/models';

import { CentralFactCreationGameState } from '../this';

export abstract class CentralFactCreationState {
  private _context: CentralFactCreationGameState;
  protected get context(): CentralFactCreationGameState {
    return this._context;
  }

  protected constructor(context: CentralFactCreationState.NewProps) {
    this._context = context;
  }

  public abstract updateCentralFactDescription(
    description: string,
  ): CentralFact;
  public abstract rollDice(): number;
  public abstract updateCentralPulseAmount(amount: number): CentralPulse;
}

export namespace CentralFactCreationState {
  export type NewProps = CentralFactCreationGameState;
}

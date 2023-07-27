import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { CentralFactCreationGameState } from '../state';

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
  public abstract updateDiceValue(value: number): Dice;
  public abstract updateCentralPulseAmount(): CentralPulse;
}

export namespace CentralFactCreationState {
  export type NewProps = CentralFactCreationGameState;
}

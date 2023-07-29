import { CentralFact, CentralPulse, Dice, Subject } from '@domain/models';

import { vector } from '@types';

import { CentralFactCreationGameState } from '../state';

export abstract class CentralFactCreationState {
  public readonly context: CentralFactCreationGameState;

  protected constructor(context: CentralFactCreationState.NewProps) {
    this.context = context;
  }

  public abstract updateCentralFactDescription(
    description: string,
  ): CentralFact;
  public abstract updateCurrentDiceValue(value: number): Dice;
  public abstract updateCentralPulseAmount(): CentralPulse;
  public abstract updateCurrentDicePosition(position: vector): Dice;
  public abstract updateCurrentSubjectPosition(): Subject;
}

export namespace CentralFactCreationState {
  export type NewProps = CentralFactCreationGameState;
}

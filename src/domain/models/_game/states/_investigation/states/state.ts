import { Dice, SubjectPulse } from '@domain/models';

import { InvestigationGameState } from '../state';

export abstract class InvestigationState {
  public readonly context: InvestigationGameState;

  protected constructor(context: InvestigationState.NewProps) {
    this.context = context;
  }

  public abstract updateCurrentDiceValue(value: number): Dice;
  public abstract createSubjectPulse(gap: number): SubjectPulse;
}

export namespace InvestigationState {
  export type NewProps = InvestigationGameState;
}

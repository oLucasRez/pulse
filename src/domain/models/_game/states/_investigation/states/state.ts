import { Dice, SubjectPulse } from '@domain/models';

import { crossing } from '@types';

import { InvestigationGameState } from '../state';

export abstract class InvestigationState {
  public readonly context: InvestigationGameState;

  protected constructor(context: InvestigationState.NewProps) {
    this.context = context;
  }

  public abstract rollCurrentDice(): Dice;
  public abstract createSubjectPulse(gap: number): SubjectPulse;
  public abstract getCrossings(tolerance?: number): crossing[];
}

export namespace InvestigationState {
  export type NewProps = InvestigationGameState;
}

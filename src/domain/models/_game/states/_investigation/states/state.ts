import { Dice, Player, Question, SubjectPulse } from '@domain/models';

import { vector } from '@types';

import { InvestigationGameState } from '../state';

export abstract class InvestigationState {
  public readonly context: InvestigationGameState;

  protected constructor(context: InvestigationState.NewProps) {
    this.context = context;
  }

  public abstract rollCurrentDice(): Dice;
  public abstract createSubjectPulse(gap: number): SubjectPulse;
  public abstract updateCurrentDicePosition(position: vector): Dice;
  public abstract createQuestion(
    props: InvestigationState.CreateQuestionProps,
  ): Question;
}

export namespace InvestigationState {
  export type NewProps = InvestigationGameState;

  export type CreateQuestionProps = Player.CreateQuestionProps;
}

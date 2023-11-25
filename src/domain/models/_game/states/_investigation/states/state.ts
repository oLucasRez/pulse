import { Dice, Model, Question, SubjectPulse } from '@domain/models';

import { InvestigationGameState } from '../state';

export abstract class InvestigationState extends Model {
  public readonly ctx: InvestigationGameState;

  protected constructor(props: InvestigationState.NewProps) {
    const { ctx, ...modelProps } = props;

    super(modelProps);

    this.ctx = ctx;
  }

  public abstract rollDice(): Dice;
  public abstract createSubjectPulse(gap: SubjectPulse['gap']): SubjectPulse;
  public abstract updateDicePosition(
    position: NonNullable<Dice['position']>,
  ): Dice;
  public abstract createQuestion(
    props: InvestigationState.CreateQuestionProps,
  ): Question;
  public abstract passTurn(): void;
}
// ============================================================================
export namespace InvestigationState {
  export type NewProps = Model.NewProps & {
    ctx: InvestigationState['ctx'];
  };

  export type CreateQuestionProps = InvestigationGameState.CreateQuestionProps;
}

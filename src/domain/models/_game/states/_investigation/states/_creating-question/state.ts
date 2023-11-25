import { Dice, Question, SubjectPulse } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { InvestigationState } from '../state';

export class CreatingQuestionState extends InvestigationState {
  protected constructor(props: CreatingQuestionState.NewProps) {
    super(props);
  }
  public static create(
    props: CreatingQuestionState.CreateProps,
  ): CreatingQuestionState {
    return new CreatingQuestionState(props);
  }
  public static recreate(
    props: CreatingQuestionState.RecreateProps,
  ): CreatingQuestionState {
    return new CreatingQuestionState(props);
  }

  public createQuestion(
    props: CreatingQuestionState.CreateQuestionProps,
  ): Question {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const question = currentPlayer.createQuestion(props);

    this.ctx.setState(PassingTurnState.create({ ctx: this.ctx }));

    return question;
  }
  // --------------------------------------------------------------------------
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public createSubjectPulse(): SubjectPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace CreatingQuestionState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = InvestigationState.CreateProps;

  export type RecreateProps = InvestigationState.RecreateProps &
    Required<CreateProps>;

  export type CreateQuestionProps = InvestigationState.CreateQuestionProps;
}

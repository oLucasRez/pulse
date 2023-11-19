import { Dice, Question, SubjectPulse } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { InvestigationState } from '../state';

export class CreatingQuestionState extends InvestigationState {
  public constructor(props: CreatingQuestionState.NewProps) {
    super(props);
  }

  public createQuestion(
    props: CreatingQuestionState.CreateQuestionProps,
  ): Question {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const question = currentPlayer.createQuestion(props);

    this.ctx.setState(new PassingTurnState({ ctx: this.ctx }));

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
  export type NewProps = InvestigationState.NewProps;

  export type CreateQuestionProps = InvestigationState.CreateQuestionProps;
}

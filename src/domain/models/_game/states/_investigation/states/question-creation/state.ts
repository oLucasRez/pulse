import { Dice, Question, SubjectPulse } from '@domain/models';

import { DiceRollingState } from '../_dice-rolling';
import { InvestigationState } from '../state';

export class QuestionCreationState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public rollCurrentDice(): Dice {
    throw 'rollCurrentDice() method not allowed';
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public updateCurrentDicePosition(): Dice {
    throw 'updateCurrentDicePosition() method not allowed';
  }

  public createQuestion(
    props: InvestigationState.CreateQuestionProps,
  ): Question {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const question = currentPlayer.createQuestion(props);

    this.context.setState(new DiceRollingState(this.context));

    return question;
  }
}

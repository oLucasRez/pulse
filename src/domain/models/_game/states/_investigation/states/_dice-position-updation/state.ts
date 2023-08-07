import { Dice, Question, SubjectPulse } from '@domain/models';

import { vector } from '@types';

import { QuestionCreationState } from '../question-creation';
import { InvestigationState } from '../state';

export class DicePositionUpdationState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public rollCurrentDice(): Dice {
    throw 'rollCurrentDice() method not allowed';
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public updateCurrentDicePosition(position: vector): Dice {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';
    const dice = currentPlayer.getDice();

    this.validatePosition(position);
    dice.updatePosition(position);

    const subject = currentPlayer.getSubject();
    if (!subject) throw 'currentPlayer must have a subject';

    subject.updatePosition(position);

    this.context.setState(new QuestionCreationState(this.context));

    return dice;
  }

  private validatePosition(position: vector): void {
    const crossings = this.context.getCrossings();

    const isValid = crossings.some(
      (crossing) => crossing.position.sub(position).mag() === 0,
    );

    if (!isValid) throw 'Forbidden position';
  }

  public createQuestion(): Question {
    throw 'createQuestion() method not allowed';
  }
}

import { Dice, Question, SubjectPulse } from '@domain/models';

import { SubjectPulseCreationState } from '../_subject-pulse-creation';
import { InvestigationState } from '../state';

export class DiceRollingState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public rollCurrentDice(): Dice {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();
    dice.roll();

    this.context.setState(new SubjectPulseCreationState(this.context));

    return dice;
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public updateCurrentDicePosition(): Dice {
    throw 'updateCurrentDicePosition() method not allowed';
  }

  public createQuestion(): Question {
    throw 'createQuestion() method not allowed';
  }
}

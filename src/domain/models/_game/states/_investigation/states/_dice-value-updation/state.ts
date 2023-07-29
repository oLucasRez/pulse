import { Dice, SubjectPulse } from '@domain/models';

import { SubjectPulseCreationState } from '../_subject-pulse-creation';
import { InvestigationState } from '../state';

export class DiceValueUpdationState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public updateCurrentDiceValue(value: number): Dice {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();
    dice.updateValue(value);

    this.context.setState(new SubjectPulseCreationState(this.context));

    return dice;
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }
}

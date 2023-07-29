import { Dice, SubjectPulse } from '@domain/models';

import { DiceValueUpdationState } from '../_dice-value-updation';
import { InvestigationState } from '../state';

export class SubjectPulseCreationState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public updateCurrentDiceValue(): Dice {
    throw 'updateCurrentDiceValue() method not allowed';
  }

  public createSubjectPulse(gap: number): SubjectPulse {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    const dicePosition = dice.getPosition();
    if (!dicePosition) throw 'Dice must be on the map';

    const diceValue = dice.getValue();
    if (!diceValue) throw 'Dice must have a value';

    const playerSubject = currentPlayer.getSubject();
    if (!playerSubject) throw 'Current player must have a subject';

    const subjectPulse = new SubjectPulse({
      origin: dicePosition,
      gap,
      amount: diceValue,
      subject: playerSubject,
    });

    this.context.setState(new DiceValueUpdationState(this.context));

    return subjectPulse;
  }
}

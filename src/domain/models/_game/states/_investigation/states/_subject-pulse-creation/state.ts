import { Dice, SubjectPulse } from '@domain/models';

import { crossing } from '@types';

import { CrossingsGettionState } from '../_crossings-gettion';
import { InvestigationState } from '../state';

export class SubjectPulseCreationState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public rollCurrentDice(): Dice {
    throw 'rollCurrentDice() method not allowed';
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

    const subjectPulse = playerSubject.createPulse({
      gap,
      amount: diceValue,
    });

    this.context.setState(new CrossingsGettionState(this.context));

    return subjectPulse;
  }

  public getCrossings(): crossing[] {
    throw 'getCrossings() method not allowed';
  }
}

import { CentralFact, CentralPulse, Dice, Subject } from '@domain/models';

import { DicePositionUpdationState } from '../_dice-position-updation';
import { CentralFactCreationState } from '../state';

export class CentralPulseAmountUpdationState extends CentralFactCreationState {
  public constructor(context: CentralFactCreationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollCurrentDice(): Dice {
    throw 'rollCurrentDice() method not allowed';
  }

  public updateCentralPulseAmount(): CentralPulse {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const currentDiceValue = currentPlayer.getDice().getValue();
    if (!currentDiceValue) throw 'Dice has no value';

    const centralPulse = this.context.context
      .getCentralPulse()
      .updateAmount(currentDiceValue);

    this.context.setState(new DicePositionUpdationState(this.context));

    return centralPulse;
  }

  public updateCurrentDicePosition(): Dice {
    throw 'updateCurrentDicePosition() method not allowed';
  }

  public updateCurrentSubjectPosition(): Subject {
    throw 'updateCurrentSubjectPosition() method not allowed';
  }
}

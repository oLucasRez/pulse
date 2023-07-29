import { CentralFact, CentralPulse, Dice, Subject } from '@domain/models';

import { CentralPulseAmountUpdationState } from '../_central-pulse-amount-updation';
import { CentralFactCreationState } from '../state';

export class DiceValueUpdationState extends CentralFactCreationState {
  public constructor(context: CentralFactCreationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public updateCurrentDiceValue(value: number): Dice {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();
    dice.updateValue(value);

    this.context.setState(new CentralPulseAmountUpdationState(this.context));

    return dice;
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }

  public updateCurrentDicePosition(): Dice {
    throw 'updateCurrentDicePosition() method not allowed';
  }

  public updateCurrentSubjectPosition(): Subject {
    throw 'updateCurrentSubjectPosition() method not allowed';
  }
}

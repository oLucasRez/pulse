import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { CentralPulseAmountUpdationState } from '../_central-pulse-amount-updation';
import { CentralFactCreationState } from '../state';

export class DiceRollingState extends CentralFactCreationState {
  public constructor(context: DiceRollingState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public updateDiceValue(value: number): Dice {
    const currentPlayer = this.context.turn.value;

    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    dice.updateValue(value);

    this.context.setState(new CentralPulseAmountUpdationState(this.context));

    return dice;
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }
}

export namespace DiceRollingState {
  export type NewProps = CentralFactCreationState.NewProps;
}

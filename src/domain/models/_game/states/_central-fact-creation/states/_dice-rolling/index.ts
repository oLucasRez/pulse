import { CentralFact, CentralPulse } from '@domain/models';

import { CentralPulseAmountUpdationState } from '../_central-pulse-amount-updation';
import { CentralFactCreationState } from '../this';

export class DiceRollingState extends CentralFactCreationState {
  public constructor(context: DiceRollingState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollDice(): number {
    const currentPlayer = this.context.turn.value;

    if (!currentPlayer) throw 'currentPlayer not found';

    const value = currentPlayer.dice.roll();

    this.context.setState(new CentralPulseAmountUpdationState(this.context));

    return value;
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }
}

export namespace DiceRollingState {
  export type NewProps = CentralFactCreationState.NewProps;
}

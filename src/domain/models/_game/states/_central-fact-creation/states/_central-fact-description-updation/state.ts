import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { DiceRollingState } from '../_dice-rolling';
import { CentralFactCreationState } from '../state';

export class CentralFactDescriptionUpdationState extends CentralFactCreationState {
  public constructor(context: CentralFactDescriptionUpdationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(description: string): CentralFact {
    const centralFact = this.context.context
      .getCentralPulse()
      .getCentralFact()
      .updateDescription(description);

    this.context.setState(new DiceRollingState(this.context));

    return centralFact;
  }

  public updateDiceValue(): Dice {
    throw 'updateDiceValue() method not allowed';
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }
}

export namespace CentralFactDescriptionUpdationState {
  export type NewProps = CentralFactCreationState.NewProps;
}

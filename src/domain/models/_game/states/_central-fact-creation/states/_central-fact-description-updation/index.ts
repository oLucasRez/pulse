import { CentralFact, CentralPulse } from '@domain/models';

import { DiceRollingState } from '../_dice-rolling';
import { CentralFactCreationState } from '../this';

export class CentralFactDescriptionUpdationState extends CentralFactCreationState {
  public constructor(context: CentralFactDescriptionUpdationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(description: string): CentralFact {
    const centralFact =
      this.context.context.centralPulse.centralFact.updateDescription(
        description,
      );

    this.context.setState(new DiceRollingState(this.context));

    return centralFact;
  }

  public rollDice(): number {
    throw 'rollDice() method not allowed';
  }

  public updateCentralPulseAmount(): CentralPulse {
    throw 'updateCentralPulseAmount() method not allowed';
  }
}

export namespace CentralFactDescriptionUpdationState {
  export type NewProps = CentralFactCreationState.NewProps;
}

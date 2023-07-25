import { CentralFact, CentralPulse } from '@domain/models';

import { CentralFactDescriptionUpdationState } from '../_central-fact-description-updation';
import { CentralFactCreationState } from '../this';

export class CentralPulseAmountUpdationState extends CentralFactCreationState {
  public constructor(context: CentralPulseAmountUpdationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public rollDice(): number {
    throw 'rollDice() method not allowed';
  }

  public updateCentralPulseAmount(amount: number): CentralPulse {
    const centralPulse = this.context.context.centralPulse.updateAmount(amount);

    this.context.setState(
      new CentralFactDescriptionUpdationState(this.context),
    );

    return centralPulse;
  }
}

export namespace CentralPulseAmountUpdationState {
  export type NewProps = CentralFactCreationState.NewProps;
}

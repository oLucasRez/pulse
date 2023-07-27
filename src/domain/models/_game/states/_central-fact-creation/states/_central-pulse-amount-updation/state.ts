import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { CentralFactDescriptionUpdationState } from '../_central-fact-description-updation';
import { CentralFactCreationState } from '../state';

export class CentralPulseAmountUpdationState extends CentralFactCreationState {
  public constructor(context: CentralPulseAmountUpdationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
  }

  public updateDiceValue(): Dice {
    throw 'updateDiceValue() method not allowed';
  }

  public updateCentralPulseAmount(): CentralPulse {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const currentDiceValue = currentPlayer.getDice().getValue();

    if (!currentDiceValue) throw 'Dice has no value';

    const centralPulse = this.context.context
      .getCentralPulse()
      .updateAmount(currentDiceValue);

    this.context.setState(
      new CentralFactDescriptionUpdationState(this.context),
    );

    return centralPulse;
  }
}

export namespace CentralPulseAmountUpdationState {
  export type NewProps = CentralFactCreationState.NewProps;
}

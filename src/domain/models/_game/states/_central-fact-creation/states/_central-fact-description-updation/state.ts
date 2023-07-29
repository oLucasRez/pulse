import { CentralFact, CentralPulse, Dice, Subject } from '@domain/models';

import { DiceValueUpdationState } from '../_dice-value-updation';
import { CentralFactCreationState } from '../state';

export class CentralFactDescriptionUpdationState extends CentralFactCreationState {
  public constructor(context: CentralFactCreationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(description: string): CentralFact {
    const centralFact = this.context.context
      .getCentralPulse()
      .getCentralFact()
      .updateDescription(description);

    this.context.setState(new DiceValueUpdationState(this.context));

    return centralFact;
  }

  public updateCurrentDiceValue(): Dice {
    throw 'updateCurrentDiceValue() method not allowed';
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

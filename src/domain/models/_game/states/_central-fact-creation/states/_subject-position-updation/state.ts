import { CentralFact, CentralPulse, Dice, Subject } from '@domain/models';

import { CentralFactDescriptionUpdationState } from '../_central-fact-description-updation';
import { CentralFactCreationState } from '../state';

export class SubjectPositionUpdationState extends CentralFactCreationState {
  public constructor(context: CentralFactCreationState.NewProps) {
    super(context);
  }

  public updateCentralFactDescription(): CentralFact {
    throw 'updateCentralFactDescription() method not allowed';
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
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();
    const dicePosition = dice.getPosition();
    if (!dicePosition) throw 'Dice must have a value';

    const subject = currentPlayer.getSubject();
    if (!subject) throw 'Player must have a subject';

    subject.updatePosition(dicePosition);

    this.context.setState(
      new CentralFactDescriptionUpdationState(this.context),
    );

    return subject;
  }
}

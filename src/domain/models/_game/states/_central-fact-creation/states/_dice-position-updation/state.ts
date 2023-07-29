import { CentralFact, CentralPulse, Dice, Subject } from '@domain/models';

import { vector } from '@types';

import { SubjectPositionUpdationState } from '../_subject-position-updation';
import { CentralFactCreationState } from '../state';

export class DicePositionUpdationState extends CentralFactCreationState {
  private readonly TOLERANCE = 0.0001;

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

  public updateCurrentDicePosition(position: vector): Dice {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';
    const dice = currentPlayer.getDice();

    this.validatePosition(position);
    dice.updatePosition(position);

    this.context.setState(new SubjectPositionUpdationState(this.context));

    return dice;
  }

  private validatePosition(position: vector): void {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';
    const dice = currentPlayer.getDice();

    const value = dice.getValue();
    if (!value) throw 'Current dice must have a value';

    const positionError = position.mag() - value;
    const isValidPosition = positionError <= this.TOLERANCE;

    if (!isValidPosition) throw 'Forbidden position';
  }

  public updateCurrentSubjectPosition(): Subject {
    throw 'updateCurrentSubjectPosition() method not allowed';
  }
}

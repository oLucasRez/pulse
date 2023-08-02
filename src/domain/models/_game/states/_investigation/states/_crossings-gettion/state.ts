import { Dice, SubjectPulse } from '@domain/models';

import { Crossing } from '@utils';

import { crossing } from '@types';

import { DiceRollingState } from '../_dice-rolling';
import { InvestigationState } from '../state';

export class CrossingsGettionState extends InvestigationState {
  public constructor(context: InvestigationState.NewProps) {
    super(context);
  }

  public rollCurrentDice(): Dice {
    throw 'rollCurrentDice() method not allowed';
  }

  public createSubjectPulse(): SubjectPulse {
    throw 'createSubjectPulse() method not allowed';
  }

  public getCrossings(tolerance: number = 0): crossing[] {
    const currentPlayer = this.context.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const playerSubject = currentPlayer.getSubject();
    if (!playerSubject) throw 'Current player must have a subject';

    const lastPulse = playerSubject.getLastPulse();
    if (!lastPulse) return [];

    const crossings = Crossing.get(
      lastPulse,
      this.context.context.getPulses(),
      tolerance,
    );

    this.context.setState(new DiceRollingState(this.context));

    return crossings;
  }
}

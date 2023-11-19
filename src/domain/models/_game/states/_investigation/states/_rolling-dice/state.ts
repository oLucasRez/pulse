import { Dice, Question, SubjectPulse } from '@domain/models';

import { CreatingSubjectPulseState } from '../_creating-subject-pulse';
import { InvestigationState } from '../state';

export class RollingDiceState extends InvestigationState {
  public constructor(props: RollingDiceState.NewProps) {
    super(props);
  }

  public rollDice(): Dice {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    dice.roll();

    this.ctx.setState(new CreatingSubjectPulseState({ ctx: this.ctx }));

    return dice;
  }
  // --------------------------------------------------------------------------
  public createSubjectPulse(): SubjectPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public createQuestion(): Question {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace RollingDiceState {
  export type NewProps = InvestigationState.NewProps;
}

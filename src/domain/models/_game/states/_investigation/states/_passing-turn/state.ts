import { Dice, Question, SubjectPulse } from '@domain/models';

import { RollingDiceState } from '../_rolling-dice';
import { InvestigationState } from '../state';

export class PassingTurnState extends InvestigationState {
  public constructor(props: PassingTurnState.NewProps) {
    super(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(new RollingDiceState({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public createSubjectPulse(): SubjectPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public createQuestion(): Question {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace PassingTurnState {
  export type NewProps = InvestigationState.NewProps;
}

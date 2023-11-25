import { Dice, Question, SubjectPulse } from '@domain/models';

import { RollingDiceState } from '../_rolling-dice';
import { InvestigationState } from '../state';

export class PassingTurnState extends InvestigationState {
  protected constructor(props: PassingTurnState.NewProps) {
    super(props);
  }
  public static create(props: PassingTurnState.CreateProps): PassingTurnState {
    return new PassingTurnState(props);
  }
  public static recreate(
    props: PassingTurnState.RecreateProps,
  ): PassingTurnState {
    return new PassingTurnState(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(RollingDiceState.create({ ctx: this.ctx }));
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
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = InvestigationState.CreateProps;

  export type RecreateProps = InvestigationState.RecreateProps &
    Required<CreateProps>;
}

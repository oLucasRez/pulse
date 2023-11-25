import { Dice, LightSpot } from '@domain/models';

import { UpdatingDicePositionState } from '../_updating-dice-position';
import { LightSpotCreationState } from '../state';

export class PassingTurnState extends LightSpotCreationState {
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

    this.ctx.setState(UpdatingDicePositionState.create({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public createLightSpot(): LightSpot {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace PassingTurnState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = LightSpotCreationState.CreateProps;

  export type RecreateProps = LightSpotCreationState.RecreateProps &
    Required<CreateProps>;
}

import { Dice, LightSpot } from '@domain/models';

import { UpdatingDicePositionState } from '../_updating-dice-position';
import { LightSpotCreationState } from '../state';

export class PassingTurnState extends LightSpotCreationState {
  public constructor(props: PassingTurnState.NewProps) {
    super(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(new UpdatingDicePositionState({ ctx: this.ctx }));
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
  export type NewProps = LightSpotCreationState.NewProps;
}

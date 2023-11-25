import { Dice, LightSpot } from '@domain/models';

import { CreatingLightSpotState } from '../_creating-light-spot';
import { LightSpotCreationState } from '../state';

export class UpdatingDicePositionState extends LightSpotCreationState {
  public constructor(props: UpdatingDicePositionState.NewProps) {
    super(props);
  }

  public updateDicePosition(position: NonNullable<Dice['position']>): Dice {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    dice.updatePosition(position);

    this.ctx.setState(new CreatingLightSpotState({ ctx: this.ctx }));

    return dice;
  }
  // --------------------------------------------------------------------------
  public createLightSpot(): LightSpot {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace UpdatingDicePositionState {
  export type NewProps = LightSpotCreationState.NewProps;
}

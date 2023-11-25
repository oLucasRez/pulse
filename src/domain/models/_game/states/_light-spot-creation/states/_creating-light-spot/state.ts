import { Dice, LightSpot } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { LightSpotCreationState } from '../state';

export class CreatingLightSpotState extends LightSpotCreationState {
  public constructor(props: CreatingLightSpotState.NewProps) {
    super(props);
  }

  public createLightSpot(
    props: CreatingLightSpotState.CreateLightSpotProps,
  ): LightSpot {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const subject = currentPlayer.createSubject(props);

    const map = this.ctx.ctx.getMap();

    const lightSpot = map.createLightSpot({
      landmark: subject,
    });

    this.ctx.setState(new PassingTurnState({ ctx: this.ctx }));

    return lightSpot;
  }
  // --------------------------------------------------------------------------
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace CreatingLightSpotState {
  export type NewProps = LightSpotCreationState.NewProps;

  export type CreateLightSpotProps =
    LightSpotCreationState.CreateLightSpotProps;
}

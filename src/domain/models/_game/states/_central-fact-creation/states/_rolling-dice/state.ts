import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { UpdatingCentralPulseAmountState } from '../_updating-central-pulse-amount';
import { CentralFactCreationState } from '../state';

export class RollingDiceState extends CentralFactCreationState {
  public constructor(props: RollingDiceState.NewProps) {
    super(props);
  }

  public rollDice(): Dice {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    dice.roll();

    this.ctx.setState(new UpdatingCentralPulseAmountState({ ctx: this.ctx }));

    return dice;
  }
  // --------------------------------------------------------------------------
  public updateCentralFactDescription(): CentralFact {
    throw 'Method not allowed';
  }
  public updateCentralPulseAmount(): CentralPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace RollingDiceState {
  export type NewProps = CentralFactCreationState.NewProps;
}

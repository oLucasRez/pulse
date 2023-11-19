import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { UpdatingDicePositionState } from '../_updating-dice-position';
import { CentralFactCreationState } from '../state';

export class UpdatingCentralPulseAmountState extends CentralFactCreationState {
  public constructor(props: UpdatingCentralPulseAmountState.NewProps) {
    super(props);
  }

  public updateCentralPulseAmount(): CentralPulse {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();
    const diceValue = dice.getValue();
    if (!diceValue) throw 'Dice has no value';

    const centralPulse = this.ctx.ctx.getCentralPulse();

    centralPulse.updateAmount(diceValue);

    this.ctx.setState(new UpdatingDicePositionState({ ctx: this.ctx }));

    return centralPulse;
  }
  // --------------------------------------------------------------------------
  public updateCentralFactDescription(): CentralFact {
    throw 'Method not allowed';
  }
  public rollDice(): Dice {
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
export namespace UpdatingCentralPulseAmountState {
  export type NewProps = CentralFactCreationState.NewProps;
}

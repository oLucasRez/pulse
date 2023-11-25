import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { UpdatingDicePositionState } from '../_updating-dice-position';
import { CentralFactCreationState } from '../state';

export class UpdatingCentralPulseAmountState extends CentralFactCreationState {
  protected constructor(props: UpdatingCentralPulseAmountState.NewProps) {
    super(props);
  }
  public static create(
    props: UpdatingCentralPulseAmountState.CreateProps,
  ): UpdatingCentralPulseAmountState {
    return new UpdatingCentralPulseAmountState(props);
  }
  public static recreate(
    props: UpdatingCentralPulseAmountState.RecreateProps,
  ): UpdatingCentralPulseAmountState {
    return new UpdatingCentralPulseAmountState(props);
  }

  public updateCentralPulseAmount(): CentralPulse {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();
    const diceValue = dice.getValue();
    if (!diceValue) throw 'Dice has no value';

    const map = this.ctx.ctx.getMap();
    const centralPulse = map.getCentralPulse();

    centralPulse.updateAmount(diceValue);

    this.ctx.setState(UpdatingDicePositionState.create({ ctx: this.ctx }));

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
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = CentralFactCreationState.CreateProps;

  export type RecreateProps = CentralFactCreationState.RecreateProps &
    Required<CreateProps>;
}

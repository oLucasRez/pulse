import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { RollingDiceState } from '../_rolling-dice';
import { CentralFactCreationState } from '../state';

export class UpdatingCentralFactDescriptionState extends CentralFactCreationState {
  public constructor(props: UpdatingCentralFactDescriptionState.NewProps) {
    super(props);
  }

  public updateCentralFactDescription(
    description: CentralFact['description'],
  ): CentralFact {
    const centralFact = this.ctx.ctx.getCentralFact();

    centralFact.updateDescription(description);

    this.ctx.setState(new RollingDiceState({ ctx: this.ctx }));

    return centralFact;
  }
  // --------------------------------------------------------------------------
  public rollDice(): Dice {
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
export namespace UpdatingCentralFactDescriptionState {
  export type NewProps = CentralFactCreationState.NewProps;
}

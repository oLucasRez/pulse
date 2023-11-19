import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { UpdatingCentralFactDescriptionState } from '../_updating-central-fact-description';
import { CentralFactCreationState } from '../state';

export class PassingTurnState extends CentralFactCreationState {
  public constructor(props: PassingTurnState.NewProps) {
    super(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(
      new UpdatingCentralFactDescriptionState({ ctx: this.ctx }),
    );
  }
  // --------------------------------------------------------------------------
  public updateCentralFactDescription(): CentralFact {
    throw 'Method not allowed';
  }
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public updateCentralPulseAmount(): CentralPulse {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace PassingTurnState {
  export type NewProps = CentralFactCreationState.NewProps;
}

import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { RollingDiceState } from '../_rolling-dice';
import { CentralFactCreationState } from '../state';

export class UpdatingCentralFactDescriptionState extends CentralFactCreationState {
  protected constructor(props: UpdatingCentralFactDescriptionState.NewProps) {
    super(props);
  }
  public static create(
    props: UpdatingCentralFactDescriptionState.CreateProps,
  ): UpdatingCentralFactDescriptionState {
    return new UpdatingCentralFactDescriptionState(props);
  }
  public static recreate(
    props: UpdatingCentralFactDescriptionState.RecreateProps,
  ): UpdatingCentralFactDescriptionState {
    return new UpdatingCentralFactDescriptionState(props);
  }

  public updateCentralFactDescription(
    description: CentralFact['description'],
  ): CentralFact {
    const map = this.ctx.ctx.getMap();
    const centralPulse = map.getCentralPulse();
    const centralFact = centralPulse.getLandmark();

    centralFact.updateDescription(description);

    this.ctx.setState(RollingDiceState.create({ ctx: this.ctx }));

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
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = CentralFactCreationState.CreateProps;

  export type RecreateProps = CentralFactCreationState.RecreateProps &
    Required<CreateProps>;
}

import { CentralFact, CentralPulse, Dice, Model } from '@domain/models';

import { CentralFactCreationGameState } from '../state';

export abstract class CentralFactCreationState extends Model {
  public readonly ctx: CentralFactCreationGameState;

  protected constructor(props: CentralFactCreationState.NewProps) {
    const { ctx, ...modelProps } = props;

    super(modelProps);

    this.ctx = ctx;
  }

  public abstract updateCentralFactDescription(
    description: CentralFact['description'],
  ): CentralFact;
  public abstract rollDice(): Dice;
  public abstract updateCentralPulseAmount(): CentralPulse;
  public abstract updateDicePosition(
    position: NonNullable<Dice['position']>,
  ): Dice;
  public abstract passTurn(): void;
}
// ============================================================================
export namespace CentralFactCreationState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    ctx: CentralFactCreationState['ctx'];
  };

  export type RecreateProps = Model.RecreateProps & Required<CreateProps>;
}

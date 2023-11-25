import { Dice, LightSpot, Model } from '@domain/models';

import { LightSpotCreationGameState } from '../state';

export abstract class LightSpotCreationState extends Model {
  public readonly ctx: LightSpotCreationGameState;

  protected constructor(props: LightSpotCreationState.NewProps) {
    const { ctx, ...modelProps } = props;

    super(modelProps);

    this.ctx = ctx;
  }

  public abstract updateDicePosition(
    position: NonNullable<Dice['position']>,
  ): Dice;
  public abstract createLightSpot(
    props: LightSpotCreationState.CreateLightSpotProps,
  ): LightSpot;
  public abstract passTurn(): void;
}
// ============================================================================
export namespace LightSpotCreationState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    ctx: LightSpotCreationState['ctx'];
  };

  export type RecreateProps = Model.RecreateProps & Required<CreateProps>;

  export type CreateLightSpotProps =
    LightSpotCreationGameState.CreateLightSpotProps;
}

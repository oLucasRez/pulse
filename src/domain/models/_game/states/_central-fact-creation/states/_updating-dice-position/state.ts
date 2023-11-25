import { CentralFact, CentralPulse, Dice } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { CentralFactCreationState } from '../state';

export class UpdatingDicePositionState extends CentralFactCreationState {
  private readonly TOLERANCE = 0.0001;

  protected constructor(props: UpdatingDicePositionState.NewProps) {
    super(props);
  }
  public static create(
    props: UpdatingDicePositionState.CreateProps,
  ): UpdatingDicePositionState {
    return new UpdatingDicePositionState(props);
  }
  public static recreate(
    props: UpdatingDicePositionState.RecreateProps,
  ): UpdatingDicePositionState {
    return new UpdatingDicePositionState(props);
  }

  public updateDicePosition(position: NonNullable<Dice['position']>): Dice {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    this.validatePosition(dice, position);
    dice.updatePosition(position);

    const subject = currentPlayer.getSubject();
    if (!subject) throw 'Player must have a subject';

    subject.updatePosition(position);

    this.ctx.setState(PassingTurnState.create({ ctx: this.ctx }));

    return dice;
  }

  private validatePosition(
    dice: Dice,
    position: NonNullable<Dice['position']>,
  ): void {
    const value = dice.getValue();
    if (!value) throw 'Current dice must have a value';

    const positionError = position.mag() - value;
    const isValid = positionError <= this.TOLERANCE;

    if (!isValid) throw 'Forbidden position';
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
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace UpdatingDicePositionState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = CentralFactCreationState.CreateProps;

  export type RecreateProps = CentralFactCreationState.RecreateProps &
    Required<CreateProps>;
}

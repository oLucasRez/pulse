import { Dice, Question, SubjectPulse } from '@domain/models';

import { vector } from '@types';

import { CreatingQuestionState } from '../_creating-question';
import { InvestigationState } from '../state';

export class UpdatingDicePositionState extends InvestigationState {
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

    this.validatePosition(position);
    dice.updatePosition(position);

    const subject = currentPlayer.getSubject();
    if (!subject) throw 'currentPlayer must have a subject';

    subject.updatePosition(position);

    this.ctx.setState(CreatingQuestionState.create({ ctx: this.ctx }));

    return dice;
  }

  private validatePosition(position: vector): void {
    const crossings = this.ctx.getCrossings();

    const isValid = crossings.some(
      (crossing) => crossing.position.sub(position).mag() === 0,
    );

    if (!isValid) throw 'Forbidden position';
  }
  // --------------------------------------------------------------------------
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public createSubjectPulse(): SubjectPulse {
    throw 'Method not allowed';
  }
  public createQuestion(): Question {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace UpdatingDicePositionState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = InvestigationState.CreateProps;

  export type RecreateProps = InvestigationState.RecreateProps &
    Required<CreateProps>;
}

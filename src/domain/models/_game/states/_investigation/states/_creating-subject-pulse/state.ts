import { Dice, Question, SubjectPulse } from '@domain/models';

import { UpdatingDicePositionState } from '../_updating-dice-position';
import { InvestigationState } from '../state';

export class CreatingSubjectPulseState extends InvestigationState {
  protected constructor(props: CreatingSubjectPulseState.NewProps) {
    super(props);
  }
  public static create(
    props: CreatingSubjectPulseState.CreateProps,
  ): CreatingSubjectPulseState {
    return new CreatingSubjectPulseState(props);
  }
  public static recreate(
    props: CreatingSubjectPulseState.RecreateProps,
  ): CreatingSubjectPulseState {
    return new CreatingSubjectPulseState(props);
  }

  public createSubjectPulse(gap: SubjectPulse['gap']): SubjectPulse {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    const dice = currentPlayer.getDice();

    const dicePosition = dice.getPosition();
    if (!dicePosition) throw 'Dice must be on the map';

    const diceValue = dice.getValue();
    if (!diceValue) throw 'Dice must have a value';

    const playerSubject = currentPlayer.getSubject();
    if (!playerSubject) throw 'Current player must have a subject';

    const map = this.ctx.ctx.getMap();

    const subjectPulse = map.createSubjectPulse(playerSubject, {
      gap,
      amount: diceValue,
    });

    this.ctx.setState(UpdatingDicePositionState.create({ ctx: this.ctx }));

    return subjectPulse;
  }
  // --------------------------------------------------------------------------
  public rollDice(): Dice {
    throw 'Method not allowed';
  }
  public updateDicePosition(): Dice {
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
export namespace CreatingSubjectPulseState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = InvestigationState.CreateProps;

  export type RecreateProps = InvestigationState.RecreateProps &
    Required<CreateProps>;
}

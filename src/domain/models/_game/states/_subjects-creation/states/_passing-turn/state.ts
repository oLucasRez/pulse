import { Subject } from '@domain/models';

import { CreatingSubjectState } from '../_creating-subject';
import { SubjectsCreationState } from '../state';

export class PassingTurnState extends SubjectsCreationState {
  protected constructor(props: PassingTurnState.NewProps) {
    super(props);
  }
  public static create(props: PassingTurnState.CreateProps): PassingTurnState {
    return new PassingTurnState(props);
  }
  public static recreate(
    props: PassingTurnState.RecreateProps,
  ): PassingTurnState {
    return new PassingTurnState(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(CreatingSubjectState.create({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public createSubject(): Subject {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace PassingTurnState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = SubjectsCreationState.CreateProps;

  export type RecreateProps = SubjectsCreationState.RecreateProps &
    Required<CreateProps>;
}

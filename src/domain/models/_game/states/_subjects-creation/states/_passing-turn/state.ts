import { Subject } from '@domain/models';

import { CreatingSubjectState } from '../_creating-subject';
import { SubjectsCreationState } from '../state';

export class PassingTurnState extends SubjectsCreationState {
  public constructor(props: PassingTurnState.NewProps) {
    super(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(new CreatingSubjectState({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public createSubject(): Subject {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace PassingTurnState {
  export type NewProps = SubjectsCreationState.NewProps;
}

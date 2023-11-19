import { Player, Subject } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { SubjectsCreationState } from '../state';

export class CreatingSubjectState extends SubjectsCreationState {
  public constructor(props: CreatingSubjectState.NewProps) {
    super(props);
  }

  public createSubject(props: Player.CreateSubjectProps): Subject {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    if (currentPlayer.getSubject()) throw 'Player already have a subject';

    const subject = currentPlayer.createSubject(props);

    this.ctx.setState(new PassingTurnState({ ctx: this.ctx }));

    return subject;
  }
  // --------------------------------------------------------------------------
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace CreatingSubjectState {
  export type NewProps = SubjectsCreationState.NewProps;
}

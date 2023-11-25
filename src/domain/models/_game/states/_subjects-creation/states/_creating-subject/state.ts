import { Player, Subject } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { SubjectsCreationState } from '../state';

export class CreatingSubjectState extends SubjectsCreationState {
  protected constructor(props: CreatingSubjectState.NewProps) {
    super(props);
  }
  public static create(
    props: CreatingSubjectState.CreateProps,
  ): CreatingSubjectState {
    return new CreatingSubjectState(props);
  }
  public static recreate(
    props: CreatingSubjectState.RecreateProps,
  ): CreatingSubjectState {
    return new CreatingSubjectState(props);
  }

  public createSubject(props: Player.CreateSubjectProps): Subject {
    const currentPlayer = this.ctx.ctx.getCurrentPlayer();
    if (!currentPlayer) throw 'currentPlayer not found';

    if (currentPlayer.getSubject()) throw 'Player already have a subject';

    const subject = currentPlayer.createSubject(props);

    this.ctx.setState(PassingTurnState.create({ ctx: this.ctx }));

    return subject;
  }
  // --------------------------------------------------------------------------
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace CreatingSubjectState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = SubjectsCreationState.CreateProps;

  export type RecreateProps = SubjectsCreationState.RecreateProps &
    Required<CreateProps>;
}

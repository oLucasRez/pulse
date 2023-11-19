import { Model, Player, Subject } from '@domain/models';

import { SubjectsCreationGameState } from '../state';

export abstract class SubjectsCreationState extends Model {
  public readonly ctx: SubjectsCreationGameState;

  protected constructor(props: SubjectsCreationState.NewProps) {
    const { ctx, ...modelProps } = props;

    super(modelProps);

    this.ctx = ctx;
  }

  public abstract createSubject(
    props: SubjectsCreationState.CreateSubjectProps,
  ): Subject;
  public abstract passTurn(): void;
}
// ============================================================================
export namespace SubjectsCreationState {
  export type NewProps = Model.NewProps & {
    ctx: SubjectsCreationState['ctx'];
  };

  export type CreateSubjectProps = Player.CreateSubjectProps;
}

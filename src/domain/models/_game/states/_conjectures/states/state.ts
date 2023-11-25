import { Answer, Model, Player, Question } from '@domain/models';

import { ConjecturesGameState } from '../state';

export abstract class ConjecturesState extends Model {
  public readonly ctx: ConjecturesGameState;

  protected constructor(props: ConjecturesState.NewProps) {
    const { ctx, ...modelProps } = props;

    super(modelProps);

    this.ctx = ctx;
  }

  public abstract answerQuestion(
    question: Question,
    props: ConjecturesState.AnswerQuestionProps,
  ): Answer;
  public abstract playerVote(player: Player, vote: boolean): void;
  public abstract finishVoting(): boolean;
  public abstract passTurn(): void;
}
// ============================================================================
export namespace ConjecturesState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    ctx: ConjecturesState['ctx'];
  };

  export type RecreateProps = Model.RecreateProps & Required<CreateProps>;

  export type AnswerQuestionProps = ConjecturesGameState.AnswerQuestionProps;
}

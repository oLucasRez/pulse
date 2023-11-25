import { Answer, Question } from '@domain/models';

import { VotingState } from '../_voting';
import { ConjecturesState } from '../state';

export class AnsweringQuestionState extends ConjecturesState {
  protected constructor(props: AnsweringQuestionState.NewProps) {
    super(props);
  }
  public static create(
    props: AnsweringQuestionState.CreateProps,
  ): AnsweringQuestionState {
    return new AnsweringQuestionState(props);
  }
  public static recreate(
    props: AnsweringQuestionState.RecreateProps,
  ): AnsweringQuestionState {
    return new AnsweringQuestionState(props);
  }

  public answerQuestion(
    question: Question,
    props: AnsweringQuestionState.AnswerQuestionProps,
  ): Answer {
    const answer = question.createAnswer(props);

    this.ctx.setCurrentAnswer(answer);

    this.ctx.setState(VotingState.create({ ctx: this.ctx, answer }));

    return answer;
  }
  // --------------------------------------------------------------------------
  public playerVote(): void {
    throw 'Method not allowed';
  }
  public finishVoting(): boolean {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace AnsweringQuestionState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = ConjecturesState.CreateProps;

  export type RecreateProps = ConjecturesState.RecreateProps &
    Required<CreateProps>;

  export type AnswerQuestionProps = ConjecturesState.AnswerQuestionProps;
}

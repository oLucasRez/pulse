import { Answer, Question } from '@domain/models';

import { VotingState } from '../_voting';
import { ConjecturesState } from '../state';

export class AnsweringQuestionState extends ConjecturesState {
  public constructor(props: AnsweringQuestionState.NewProps) {
    super(props);
  }

  public answerQuestion(
    question: Question,
    props: AnsweringQuestionState.AnswerQuestionProps,
  ): Answer {
    const answer = question.createAnswer(props);

    this.ctx.setCurrentAnswer(answer);

    this.ctx.setState(new VotingState({ ctx: this.ctx, answer }));

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
  export type NewProps = ConjecturesState.NewProps;

  export type AnswerQuestionProps = ConjecturesState.AnswerQuestionProps;
}

import { Answer } from '@domain/models';

import { AnsweringQuestionState } from '../_answering-question';
import { ConjecturesState } from '../state';

export class PassingTurnState extends ConjecturesState {
  public constructor(props: PassingTurnState.NewProps) {
    super(props);
  }

  public passTurn(): void {
    const round = this.ctx.ctx.getRound();

    round.nextTurn();

    this.ctx.setState(new AnsweringQuestionState({ ctx: this.ctx }));
  }
  // --------------------------------------------------------------------------
  public answerQuestion(): Answer {
    throw 'Method not allowed';
  }
  public playerVote(): void {
    throw 'Method not allowed';
  }
  public finishVoting(): boolean {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace PassingTurnState {
  export type NewProps = ConjecturesState.NewProps;
}

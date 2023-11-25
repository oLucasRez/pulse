import { Answer } from '@domain/models';

import { AnsweringQuestionState } from '../_answering-question';
import { ConjecturesState } from '../state';

export class PassingTurnState extends ConjecturesState {
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

    this.ctx.setState(AnsweringQuestionState.create({ ctx: this.ctx }));
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
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = ConjecturesState.CreateProps;

  export type RecreateProps = ConjecturesState.RecreateProps &
    Required<CreateProps>;
}

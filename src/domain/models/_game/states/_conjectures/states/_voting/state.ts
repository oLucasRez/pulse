import { Answer, Player } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { ConjecturesState } from '../state';

export class VotingState extends ConjecturesState {
  private answer: Answer;
  private playerVotes: Record<Player['id'], boolean>;

  protected constructor(props: VotingState.NewProps) {
    const { answer, playerVotes = {}, ...conjecturesStateProps } = props;

    super(conjecturesStateProps);

    this.answer = answer;
    this.playerVotes = playerVotes;
  }
  public static create(props: VotingState.CreateProps): VotingState {
    return new VotingState(props);
  }
  public static recreate(props: VotingState.RecreateProps): VotingState {
    return new VotingState(props);
  }

  public playerVote(player: Player, vote: boolean): void {
    this.playerVotes[player.id] = vote;
  }

  public finishVoting(): boolean {
    const players = this.ctx.ctx.getPlayers();

    let aPlayerDidntVote = false;
    let allPlayersAgreed = true;
    players.map(({ id }) => {
      if (!(id in this.playerVotes)) aPlayerDidntVote = true;
      if (!this.playerVotes[id]) allPlayersAgreed = false;
    });

    if (aPlayerDidntVote) throw 'all players must vote';

    if (allPlayersAgreed) this.answer.toFact();

    this.ctx.setState(PassingTurnState.create({ ctx: this.ctx }));

    return allPlayersAgreed;
  }
  // --------------------------------------------------------------------------
  public answerQuestion(): Answer {
    throw 'Method not allowed';
  }
  public passTurn(): void {
    throw 'Method not allowed';
  }
}
// ============================================================================
export namespace VotingState {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = ConjecturesState.CreateProps & {
    answer: VotingState['answer'];
  };

  export type RecreateProps = ConjecturesState.RecreateProps &
    Required<CreateProps> & {
      playerVotes: VotingState['playerVotes'];
    };
}

import { Answer, Player } from '@domain/models';

import { PassingTurnState } from '../_passing-turn';
import { ConjecturesState } from '../state';

export class VotingState extends ConjecturesState {
  private answer: Answer;
  private playerVotes: Record<Player['id'], boolean>;

  public constructor(props: VotingState.NewProps) {
    const { answer, playerVotes = {}, ...conjecturesStateProps } = props;

    super(conjecturesStateProps);

    this.answer = answer;
    this.playerVotes = playerVotes;
  }

  public playerVote(player: Player, vote: boolean): void {
    this.playerVotes[player.id] = vote;
  }

  public finishVoting(): boolean {
    const round = this.ctx.ctx.getRound();
    const players = round.getPlayers();

    let aPlayerDidntVote = false;
    let allPlayersAgreed = true;
    players.map(({ id }) => {
      if (!(id in this.playerVotes)) aPlayerDidntVote = true;
      if (!this.playerVotes[id]) allPlayersAgreed = false;
    });

    if (aPlayerDidntVote) throw 'all players must vote';

    if (allPlayersAgreed) this.answer.toFact();

    this.ctx.setState(new PassingTurnState({ ctx: this.ctx }));

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
  export type NewProps = ConjecturesState.NewProps & {
    answer: VotingState['answer'];
    playerVotes?: VotingState['playerVotes'];
  };
}

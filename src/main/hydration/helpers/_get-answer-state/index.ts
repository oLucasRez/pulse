import { AnswerModel } from '@domain/models';

import { IPlayerDAO } from '@data/dao';

export async function getAnswerState(
  answerDTO: AnswerModel.DTO,
  { playerDAO }: Deps,
): Promise<AnswerModel.State> {
  const players = await playerDAO.getUnbanned();

  const isFact = players.every((player) => answerDTO.votes[player.id]);

  const state: AnswerModel.State = isFact
    ? 'fact'
    : players.length > Object.keys(answerDTO.votes).length
    ? 'voting'
    : 'conjecture';

  return state;
}

type Deps = {
  playerDAO: IPlayerDAO;
};

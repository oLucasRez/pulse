import { IVoteAnswerUsecase } from '@domain/usecases';

import { VoteAnswerUsecase } from '@data/usecases';

import {
  makeAnswerDAO,
  makeAnswerHydrator,
  makeGetCurrentGameUsecase,
  makeGetMyPlayerUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeVoteAnswerUsecase(): IVoteAnswerUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();

  return new VoteAnswerUsecase({
    answerDAO,
    answerHydrator,
    getCurrentGame,
    getMyPlayer,
    nextGameState,
  });
}

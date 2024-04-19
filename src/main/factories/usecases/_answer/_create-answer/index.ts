import { ICreateAnswerUsecase } from '@domain/usecases';

import { CreateAnswerUsecase } from '@data/usecases';

import {
  makeAnswerDAO,
  makeAnswerHydrator,
  makeNextGameStateUsecase,
  makeStartVotingUsecase,
} from '@main/factories';

export function makeCreateAnswerUsecase(): ICreateAnswerUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();
  const nextGameState = makeNextGameStateUsecase();
  const startVoting = makeStartVotingUsecase();

  return new CreateAnswerUsecase({
    answerDAO,
    answerHydrator,
    nextGameState,
    startVoting,
  });
}

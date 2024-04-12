import { ICreateAnswerUsecase } from '@domain/usecases';

import { CreateAnswerUsecase } from '@data/usecases';

import {
  makeAnswerDAO,
  makeCreateAnswerPublisher,
  makeNextGameStateUsecase,
  makeStartVotingUsecase,
} from '@main/factories';

export function makeCreateAnswerUsecase(): ICreateAnswerUsecase {
  const createAnswerPublisher = makeCreateAnswerPublisher();
  const answerDAO = makeAnswerDAO();
  const nextGameState = makeNextGameStateUsecase();
  const startVoting = makeStartVotingUsecase();

  return new CreateAnswerUsecase({
    answerDAO,
    createAnswerPublisher,
    nextGameState,
    startVoting,
  });
}

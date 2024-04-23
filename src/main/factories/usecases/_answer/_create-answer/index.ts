import { ICreateAnswerUsecase } from '@domain/usecases';

import { CreateAnswerUsecase } from '@data/usecases';

import {
  makeAnswerDAO,
  makeAnswerHydrator,
  makeGetMyPlayerUsecase,
  makeNextGameStateUsecase,
  makeSetVotingAnswerUsecase,
} from '@main/factories';

export function makeCreateAnswerUsecase(): ICreateAnswerUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();
  const nextGameState = makeNextGameStateUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setVotingAnswer = makeSetVotingAnswerUsecase();

  return new CreateAnswerUsecase({
    answerDAO,
    answerHydrator,
    getMyPlayer,
    nextGameState,
    setVotingAnswer,
  });
}

import { IVoteQuestionFactUsecase } from '@domain/usecases';

import { VoteQuestionFactUsecase } from '@data/usecases';

import {
  makeGetAnswersUsecase,
  makeGetMyPlayerUsecase,
  makeGetPlayersUsecase,
  makeNextGameStateUsecase,
  makeQuestionDAO,
  makeQuestionHydrator,
} from '@main/factories';

export function makeVoteQuestionFactUsecase(): IVoteQuestionFactUsecase {
  const getAnswers = makeGetAnswersUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new VoteQuestionFactUsecase({
    getAnswers,
    getMyPlayer,
    getPlayers,
    nextGameState,
    questionDAO,
    questionHydrator,
  });
}

import { ICreateAnswerUsecase } from '@domain/usecases';

import { CreateAnswerUsecase } from '@data/usecases';

import {
  makeAnswerDAO,
  makeAnswerHydrator,
  makeExpireQuestionVotesUsecase,
  makeGetMyPlayerUsecase,
  makeNextGameStateUsecase,
  makeVoteQuestionFactUsecase,
} from '@main/factories';

export function makeCreateAnswerUsecase(): ICreateAnswerUsecase {
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();
  const expireQuestionVotes = makeExpireQuestionVotesUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const voteQuestionFact = makeVoteQuestionFactUsecase();

  return new CreateAnswerUsecase({
    answerDAO,
    answerHydrator,
    expireQuestionVotes,
    getMyPlayer,
    nextGameState,
    voteQuestionFact,
  });
}

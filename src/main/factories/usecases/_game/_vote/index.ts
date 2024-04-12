import { IVoteUsecase } from '@domain/usecases';

import { VoteUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetAnswerUsecase,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makeNextGameStateUsecase,
  makeSetQuestionFactUsecase,
} from '@main/factories';

export function makeVoteUsecase(): IVoteUsecase {
  const changeGamePublisher = makeChangeGamePublisher();
  const gameDAO = makeGameDAO();
  const getAnswer = makeGetAnswerUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const setQuestionFact = makeSetQuestionFactUsecase();

  return new VoteUsecase({
    changeGamePublisher,
    gameDAO,
    getAnswer,
    getCurrentGame,
    getPlayers,
    nextGameState,
    setQuestionFact,
  });
}

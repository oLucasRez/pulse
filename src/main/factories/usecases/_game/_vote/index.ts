import { IVoteUsecase } from '@domain/usecases';

import { VoteUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makeNextGameStateUsecase,
  makeSetQuestionFactUsecase,
} from '@main/factories';

export function makeVoteUsecase(): IVoteUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const setQuestionFact = makeSetQuestionFactUsecase();

  return new VoteUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
    getPlayers,
    nextGameState,
    setQuestionFact,
  });
}

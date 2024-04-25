import { IStartGameUsecase } from '@domain/usecases';

import { StartGameUsecase } from '@data/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeCreateRoundUsecase,
  makeGameDAO,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeStartGameUsecase(): IStartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const createRound = makeCreateRoundUsecase();
  const gameDAO = makeGameDAO();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new StartGameUsecase({
    createCentralPulse,
    createDice,
    createRound,
    gameDAO,
    getCurrentGame,
    getPlayers,
    nextGameState,
  });
}

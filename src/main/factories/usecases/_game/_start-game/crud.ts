import { StartGameUsecase } from '@domain/usecases';

import { DAOStartGameUsecase } from '@data/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeCreateRoundUsecase,
  makeGameDAO,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makeSetPlayerDiceUsecase,
  makeStartGamePublisher,
  makeStartRoundUsecase,
} from '@main/factories';

export function makeDAOStartGameUsecase(): StartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const createRound = makeCreateRoundUsecase();
  const gameDAO = makeGameDAO();
  const startGamePublisher = makeStartGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const setPlayerDice = makeSetPlayerDiceUsecase();
  const startRound = makeStartRoundUsecase();

  return new DAOStartGameUsecase({
    createCentralPulse,
    createDice,
    createRound,
    gameDAO,
    getCurrentGame,
    getPlayers,
    setPlayerDice,
    startGamePublisher,
    startRound,
  });
}

import { StartGameUsecase } from '@domain/usecases';

import { DAOStartGameUsecase } from '@data/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeCreateRoundUsecase,
  makeGameDAO,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makePassTurnUsecase,
  makeSetPlayerDiceUsecase,
  makeStartGamePublisher,
} from '@main/factories';

export function makeDAOStartGameUsecase(): StartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const createRound = makeCreateRoundUsecase();
  const gameDAO = makeGameDAO();
  const startGamePublisher = makeStartGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const passTurn = makePassTurnUsecase();
  const setPlayerDice = makeSetPlayerDiceUsecase();

  return new DAOStartGameUsecase({
    createCentralPulse,
    createDice,
    createRound,
    gameDAO,
    startGamePublisher,
    getCurrentGame,
    getPlayers,
    passTurn,
    setPlayerDice,
  });
}

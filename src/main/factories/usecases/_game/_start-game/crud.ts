import { CRUDStartGameUsecase } from '@data/usecases';
import { StartGameUsecase } from '@domain/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeCreateRoundUsecase,
  makeGameCRUD,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makePassTurnUsecase,
  makeSetPlayerDiceUsecase,
  makeStartGamePublisher,
} from '@main/factories';

export function makeCRUDStartGameUsecase(): StartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const createRound = makeCreateRoundUsecase();
  const gameCRUD = makeGameCRUD();
  const startGamePublisher = makeStartGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const passTurn = makePassTurnUsecase();
  const setPlayerDice = makeSetPlayerDiceUsecase();

  return new CRUDStartGameUsecase({
    createCentralPulse,
    createDice,
    createRound,
    gameCRUD,
    startGamePublisher,
    getCurrentGame,
    getPlayers,
    passTurn,
    setPlayerDice,
  });
}

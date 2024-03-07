import { CRUDStartGameUsecase } from '@data/usecases';
import { StartGameUsecase } from '@domain/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeCreateRoundUsecase,
  makeGameCRUD,
  makeGamePublisher,
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makePassTurnUsecase,
  makeSetPlayerDiceUsecase,
} from '@main/factories';

export function makeCRUDStartGameUsecase(): StartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const createRound = makeCreateRoundUsecase();
  const gameCRUD = makeGameCRUD();
  const gamePublisher = makeGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const passTurn = makePassTurnUsecase();
  const setPlayerDice = makeSetPlayerDiceUsecase();

  return new CRUDStartGameUsecase({
    createCentralPulse,
    createDice,
    createRound,
    gameCRUD,
    gamePublisher,
    getCurrentGame,
    getPlayers,
    passTurn,
    setPlayerDice,
  });
}

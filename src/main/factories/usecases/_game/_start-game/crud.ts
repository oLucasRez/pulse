import { CRUDStartGameUsecase } from '@data/usecases';
import { StartGameUsecase } from '@domain/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeCreateRoundUsecase,
  makeGameCRUD,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makeSetPlayerDiceUsecase,
} from '@main/factories';

export function makeCRUDStartGameUsecase(): StartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const createRound = makeCreateRoundUsecase();
  const gameCRUD = makeGameCRUD();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const setPlayerDice = makeSetPlayerDiceUsecase();

  return new CRUDStartGameUsecase({
    createCentralPulse,
    createDice,
    createRound,
    gameCRUD,
    getMe,
    getPlayers,
    setPlayerDice,
  });
}
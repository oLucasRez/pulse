import { CRUDCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeCreatePlayerPublisher,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayerCRUD,
} from '@main/factories';

export function makeCRUDCreatePlayerUsecase(): CreatePlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const playerCRUD = makePlayerCRUD();
  const createPlayerPublisher = makeCreatePlayerPublisher();

  return new CRUDCreatePlayerUsecase({
    getCurrentGame,
    getMe,
    getPlayers,
    playerCRUD,
    createPlayerPublisher,
  });
}

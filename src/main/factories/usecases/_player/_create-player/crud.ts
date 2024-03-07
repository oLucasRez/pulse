import { CRUDCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayerCRUD,
  makePlayerPublisher,
} from '@main/factories';

export function makeCRUDCreatePlayerUsecase(): CreatePlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDCreatePlayerUsecase({
    getCurrentGame,
    getMe,
    getPlayers,
    playerCRUD,
    playerPublisher,
  });
}

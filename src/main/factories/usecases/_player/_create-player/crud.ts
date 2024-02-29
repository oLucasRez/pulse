import { CRUDCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayerCRUD,
} from '@main/factories';

export function makeCRUDCreatePlayerUsecase(): CreatePlayerUsecase {
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const playerCRUD = makePlayerCRUD();

  return new CRUDCreatePlayerUsecase({
    getMe,
    getPlayers,
    playerCRUD,
  });
}

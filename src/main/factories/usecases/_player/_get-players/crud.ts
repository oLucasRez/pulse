import { CRUDGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import { makePlayerCRUD, makePlayerPublisher } from '@main/factories';

export function makeCRUDGetPlayersUsecase(): GetPlayersUsecase {
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDGetPlayersUsecase({ playerCRUD, playerPublisher });
}

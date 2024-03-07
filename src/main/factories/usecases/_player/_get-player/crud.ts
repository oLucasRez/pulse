import { CRUDGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import { makePlayerCRUD, makePlayerPublisher } from '@main/factories';

export function makeCRUDGetPlayerUsecase(): GetPlayerUsecase {
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDGetPlayerUsecase({ playerCRUD, playerPublisher });
}

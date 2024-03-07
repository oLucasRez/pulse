import { CRUDDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import { makePlayerCRUD, makePlayerPublisher } from '@main/factories';

export function makeCRUDDeletePlayerUsecase(): DeletePlayerUsecase {
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDDeletePlayerUsecase({ playerCRUD, playerPublisher });
}

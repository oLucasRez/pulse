import { CRUDDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import { makeDeletePlayerPublisher, makePlayerCRUD } from '@main/factories';

export function makeCRUDDeletePlayerUsecase(): DeletePlayerUsecase {
  const playerCRUD = makePlayerCRUD();
  const deletePlayerPublisher = makeDeletePlayerPublisher();

  return new CRUDDeletePlayerUsecase({ playerCRUD, deletePlayerPublisher });
}

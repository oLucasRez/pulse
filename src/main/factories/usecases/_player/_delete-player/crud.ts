import { CRUDDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import { makePlayerCRUD } from '@main/factories';

export function makeCRUDDeletePlayerUsecase(): DeletePlayerUsecase {
  const playerCRUD = makePlayerCRUD();

  return new CRUDDeletePlayerUsecase({
    playerCRUD,
  });
}

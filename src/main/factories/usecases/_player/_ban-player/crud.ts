import { CRUDBanPlayerUsecase } from '@data/usecases';
import { BanPlayerUsecase } from '@domain/usecases';

import { makeGetMeUsecase, makePlayerCRUD } from '@main/factories';

export function makeCRUDBanPlayerUsecase(): BanPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerCRUD = makePlayerCRUD();

  return new CRUDBanPlayerUsecase({
    getMe,
    playerCRUD,
  });
}

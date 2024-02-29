import { CRUDChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import { makeGetMyPlayerUsecase, makePlayerCRUD } from '@main/factories';

export function makeCRUDChangePlayerUsecase(): ChangePlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerCRUD = makePlayerCRUD();

  return new CRUDChangePlayerUsecase({
    getMyPlayer,
    playerCRUD,
  });
}

import { CRUDSetPlayerSubjectUsecase } from '@data/usecases';
import { SetPlayerSubjectUsecase } from '@domain/usecases';

import { makeGetMyPlayerUsecase, makePlayerCRUD } from '@main/factories';

export function makeCRUDSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerCRUD = makePlayerCRUD();

  return new CRUDSetPlayerSubjectUsecase({
    getMyPlayer,
    playerCRUD,
  });
}

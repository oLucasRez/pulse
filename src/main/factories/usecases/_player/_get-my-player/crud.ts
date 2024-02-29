import { CRUDGetMyPlayerUsecase } from '@data/usecases';
import { GetMyPlayerUsecase } from '@domain/usecases';

import { makeGetMeUsecase, makePlayerCRUD } from '@main/factories';

export function makeCRUDGetMyPlayerUsecase(): GetMyPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerCRUD = makePlayerCRUD();

  return new CRUDGetMyPlayerUsecase({
    getMe,
    playerCRUD,
  });
}

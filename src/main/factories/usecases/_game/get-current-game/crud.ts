import { CRUDGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeCRUDGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const gameCRUD = makeGameCRUD();
  const getMe = makeGetMeUsecase();

  return new CRUDGetCurrentGameUsecase({ gameCRUD, getMe });
}

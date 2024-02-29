import { CRUDChangeGameUsecase } from '@data/usecases';
import { ChangeGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeCRUDChangeGameUsecase(): ChangeGameUsecase {
  const gameCRUD = makeGameCRUD();
  const getMe = makeGetMeUsecase();

  return new CRUDChangeGameUsecase({ gameCRUD, getMe });
}

import { CRUDCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeCRUDCreateGameUsecase(): CreateGameUsecase {
  const gameCRUD = makeGameCRUD();
  const getMe = makeGetMeUsecase();

  return new CRUDCreateGameUsecase({ gameCRUD, getMe });
}

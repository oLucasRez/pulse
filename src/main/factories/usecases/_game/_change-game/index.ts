import { ChangeGame } from '@data/usecases';
import { ChangeGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeChangeGameUsecase(): ChangeGameUsecase {
  const gameCRUD = makeGameCRUD();
  const getMe = makeGetMeUsecase();

  return new ChangeGame({ gameCRUD, getMe });
}

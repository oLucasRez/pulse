import { CRUDGetGamesUsecase } from '@data/usecases';
import { GetGamesUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeCRUDGetGamesUsecase(): GetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const gameCRUD = makeGameCRUD();

  return new CRUDGetGamesUsecase({ getMe, gameCRUD });
}

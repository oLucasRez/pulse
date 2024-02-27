import { CreateGame } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeCreateGameUsecase(): CreateGameUsecase {
  const gameCRUD = makeGameCRUD();
  const getMe = makeGetMeUsecase();

  return new CreateGame({ gameCRUD, getMe });
}

import { CRUDCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeGameCRUD,
  makeGamePublisher,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCRUDCreateGameUsecase(): CreateGameUsecase {
  const gameCRUD = makeGameCRUD();
  const gamePublisher = makeGamePublisher();
  const getMe = makeGetMeUsecase();

  return new CRUDCreateGameUsecase({ gameCRUD, gamePublisher, getMe });
}

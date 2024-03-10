import { CRUDCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeCreateGamePublisher,
  makeGameCRUD,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCRUDCreateGameUsecase(): CreateGameUsecase {
  const gameCRUD = makeGameCRUD();
  const createGamePublisher = makeCreateGamePublisher();
  const getMe = makeGetMeUsecase();

  return new CRUDCreateGameUsecase({ gameCRUD, createGamePublisher, getMe });
}

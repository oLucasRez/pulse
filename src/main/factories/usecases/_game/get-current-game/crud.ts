import { CRUDGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

import {
  makeGameCRUD,
  makeGamePublisher,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCRUDGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const gameCRUD = makeGameCRUD();
  const gamePublisher = makeGamePublisher();
  const getMe = makeGetMeUsecase();

  return new CRUDGetCurrentGameUsecase({ gameCRUD, gamePublisher, getMe });
}

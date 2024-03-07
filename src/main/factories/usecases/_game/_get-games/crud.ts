import { CRUDGetGamesUsecase } from '@data/usecases';
import { GetGamesUsecase } from '@domain/usecases';

import {
  makeGameCRUD,
  makeGamePublisher,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCRUDGetGamesUsecase(): GetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const gamePublisher = makeGamePublisher();
  const gameCRUD = makeGameCRUD();

  return new CRUDGetGamesUsecase({ gameCRUD, gamePublisher, getMe });
}

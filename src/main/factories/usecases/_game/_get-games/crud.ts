import { CRUDGetGamesUsecase } from '@data/usecases';
import { GetGamesUsecase } from '@domain/usecases';

import {
  makeFetchGamesPublisher,
  makeGameCRUD,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCRUDGetGamesUsecase(): GetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const fetchGamesPublisher = makeFetchGamesPublisher();
  const gameCRUD = makeGameCRUD();

  return new CRUDGetGamesUsecase({ gameCRUD, fetchGamesPublisher, getMe });
}

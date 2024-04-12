import { IGetGamesUsecase } from '@domain/usecases';

import { GetGamesUsecase } from '@data/usecases';

import {
  makeFetchGamesPublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeGetGamesUsecase(): IGetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const fetchGamesPublisher = makeFetchGamesPublisher();
  const gameDAO = makeGameDAO();

  return new GetGamesUsecase({ gameDAO, fetchGamesPublisher, getMe });
}

import { GetGamesUsecase } from '@domain/usecases';

import { DAOGetGamesUsecase } from '@data/usecases';

import {
  makeFetchGamesPublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDAOGetGamesUsecase(): GetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const fetchGamesPublisher = makeFetchGamesPublisher();
  const gameDAO = makeGameDAO();

  return new DAOGetGamesUsecase({ gameDAO, fetchGamesPublisher, getMe });
}

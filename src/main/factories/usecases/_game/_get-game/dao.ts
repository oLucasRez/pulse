import { GetGameUsecase } from '@domain/usecases';

import { DAOGetGameUsecase } from '@data/usecases';

import { makeFetchGamePublisher, makeGameDAO } from '@main/factories';

export function makeDAOGetGameUsecase(): GetGameUsecase {
  const gameDAO = makeGameDAO();
  const fetchGamePublisher = makeFetchGamePublisher();

  return new DAOGetGameUsecase({ gameDAO, fetchGamePublisher });
}

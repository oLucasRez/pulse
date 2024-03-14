import { GetCurrentGameUsecase } from '@domain/usecases';

import { DAOGetCurrentGameUsecase } from '@data/usecases';

import {
  makeFetchGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDAOGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const gameDAO = makeGameDAO();
  const fetchGamePublisher = makeFetchGamePublisher();
  const getMe = makeGetMeUsecase();

  return new DAOGetCurrentGameUsecase({
    gameDAO,
    fetchGamePublisher,
    getMe,
  });
}

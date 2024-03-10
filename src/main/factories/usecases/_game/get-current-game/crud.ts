import { GetCurrentGameUsecase } from '@domain/usecases';

import { DAOGetCurrentGameUsecase } from '@data/usecases';

import {
  makeFetchCurrentGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDAOGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const gameDAO = makeGameDAO();
  const fetchCurrentGamePublisher = makeFetchCurrentGamePublisher();
  const getMe = makeGetMeUsecase();

  return new DAOGetCurrentGameUsecase({
    gameDAO,
    fetchCurrentGamePublisher,
    getMe,
  });
}

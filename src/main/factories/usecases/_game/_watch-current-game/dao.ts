import { WatchCurrentGameUsecase } from '@domain/usecases';

import { DAOWatchCurrentGameUsecase } from '@data/usecases';

import {
  makeFetchGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDAOWatchCurrentGameUsecase(): WatchCurrentGameUsecase {
  const fetchGamePublisher = makeFetchGamePublisher();
  const gameDAO = makeGameDAO();
  const getMe = makeGetMeUsecase();

  return new DAOWatchCurrentGameUsecase({
    fetchGamePublisher,
    gameDAO,
    getMe,
  });
}

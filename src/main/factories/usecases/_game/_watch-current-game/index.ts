import { IWatchCurrentGameUsecase } from '@domain/usecases';

import { WatchCurrentGameUsecase } from '@data/usecases';

import {
  makeFetchGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeWatchCurrentGameUsecase(): IWatchCurrentGameUsecase {
  const fetchGamePublisher = makeFetchGamePublisher();
  const gameDAO = makeGameDAO();
  const getMe = makeGetMeUsecase();

  return new WatchCurrentGameUsecase({
    fetchGamePublisher,
    gameDAO,
    getMe,
  });
}

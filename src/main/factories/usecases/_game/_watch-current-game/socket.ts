import { WatchCurrentGameUsecase } from '@domain/usecases';

import { SocketWatchCurrentGameUsecase } from '@data/usecases';

import {
  makeFetchGamePublisher,
  makeGamesTableGenerator,
  makeGetMeUsecase,
  makeSocket,
} from '@main/factories';

export function makeSocketWatchCurrentGameUsecase(): WatchCurrentGameUsecase {
  const fetchGamePublisher = makeFetchGamePublisher();
  const getMe = makeGetMeUsecase();
  const socket = makeSocket('only 1 user listen each data');
  const tableGenerator = makeGamesTableGenerator();

  return new SocketWatchCurrentGameUsecase({
    fetchGamePublisher,
    getMe,
    socket,
    tableGenerator,
  });
}

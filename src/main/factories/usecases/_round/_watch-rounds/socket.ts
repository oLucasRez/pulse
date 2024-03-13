import { WatchRoundsUsecase } from '@domain/usecases';

import { SocketWatchRoundsUsecase } from '@data/usecases';

import {
  makeFetchRoundsPublisher,
  makeRoundsTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeSocketWatchRoundsUsecase(): WatchRoundsUsecase {
  const fetchRoundsPublisher = makeFetchRoundsPublisher();
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeRoundsTableGenerator();

  return new SocketWatchRoundsUsecase({
    fetchRoundsPublisher,
    socket,
    tableGenerator,
  });
}

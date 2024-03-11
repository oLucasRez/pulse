import { WatchPlayersUsecase } from '@domain/usecases';

import { SocketWatchPlayersUsecase } from '@data/usecases';

import {
  makeFetchPlayersPublisher,
  makePlayersTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeSocketWatchPlayersUsecase(): WatchPlayersUsecase {
  const fetchPlayersPublisher = makeFetchPlayersPublisher();
  const tableGenerator = makePlayersTableGenerator();
  const socket = makeSocket('multiple users listen same data');

  return new SocketWatchPlayersUsecase({
    fetchPlayersPublisher,
    socket,
    tableGenerator,
  });
}

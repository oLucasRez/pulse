import { SocketWatchPlayersUsecase } from '@data/usecases';
import { WatchPlayersUsecase } from '@domain/usecases';

import {
  makePlayerPublisher,
  makePlayersTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeSocketWatchPlayersUsecase(): WatchPlayersUsecase {
  const playerPublisher = makePlayerPublisher();
  const tableGenerator = makePlayersTableGenerator();
  const socket = makeSocket('multiple users listen same data');

  return new SocketWatchPlayersUsecase({
    playerPublisher,
    socket,
    tableGenerator,
  });
}

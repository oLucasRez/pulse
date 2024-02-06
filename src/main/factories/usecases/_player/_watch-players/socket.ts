import { SocketWatchPlayersUsecase } from '@data/usecases';
import { WatchPlayersUsecase } from '@domain/usecases';

import { makePlayersTableGenerator, makeSocket } from '@main/factories';

export function makeSocketWatchPlayersUsecase(): WatchPlayersUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const socket = makeSocket();

  return new SocketWatchPlayersUsecase({ tableGenerator, socket });
}

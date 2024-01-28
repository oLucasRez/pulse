import { SocketWatchPlayersUsecase } from '@data/usecases';
import { WatchPlayersUsecase } from '@domain/usecases';

import { makeFirebaseSocket, makePlayersTableGenerator } from '@main/factories';

export function makeSocketWatchPlayersUsecase(): WatchPlayersUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const socket = makeFirebaseSocket();

  return new SocketWatchPlayersUsecase({ tableGenerator, socket });
}

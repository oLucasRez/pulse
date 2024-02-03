import { SocketWatchPlayersUsecase } from '@data/usecases';
import { WatchPlayersUsecase } from '@domain/usecases';

import { makeFirebaseSocket, makePlayersTableGenerator } from '@main/factories';

export function makeSocketWatchPlayersUsecase(): WatchPlayersUsecase {
  const socket = makeFirebaseSocket();
  const tableGenerator = makePlayersTableGenerator();

  return new SocketWatchPlayersUsecase({ socket, tableGenerator });
}

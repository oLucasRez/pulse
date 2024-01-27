import { SocketWatchPlayersUsecase } from '@data/usecases';
import { WatchPlayersUsecase } from '@domain/usecases';

import { makeFirebaseSocket } from '@main/factories/adapters';

import { makePlayersTable } from '..';

export function makeSocketWatchPlayersUsecase(): WatchPlayersUsecase {
  const table = makePlayersTable();
  const socket = makeFirebaseSocket();

  return new SocketWatchPlayersUsecase({ table, socket });
}

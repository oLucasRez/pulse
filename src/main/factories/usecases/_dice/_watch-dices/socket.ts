import { SocketWatchDicesUsecase } from '@data/usecases';
import { WatchDicesUsecase } from '@domain/usecases';

import { makeFirebaseSocket } from '@main/factories/adapters';

import { makeDicesTable } from '..';

export function makeSocketWatchDicesUsecase(): WatchDicesUsecase {
  const table = makeDicesTable();
  const socket = makeFirebaseSocket();

  return new SocketWatchDicesUsecase({ table, socket });
}

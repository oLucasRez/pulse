import { SocketWatchDicesUsecase } from '@data/usecases';
import { WatchDicesUsecase } from '@domain/usecases';

import { makeDicesTableGenerator, makeFirebaseSocket } from '@main/factories';

export function makeSocketWatchDicesUsecase(): WatchDicesUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const socket = makeFirebaseSocket();

  return new SocketWatchDicesUsecase({ tableGenerator, socket });
}

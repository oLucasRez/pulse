import { SocketWatchDicesUsecase } from '@data/usecases';
import { WatchDicesUsecase } from '@domain/usecases';

import { makeDicesTableGenerator, makeSocket } from '@main/factories';

export function makeSocketWatchDicesUsecase(): WatchDicesUsecase {
  const tableGenerator = makeDicesTableGenerator();
  const socket = makeSocket('multiple users listen same data');

  return new SocketWatchDicesUsecase({ tableGenerator, socket });
}

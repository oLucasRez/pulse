import { WatchSubjectsUsecase } from '@domain/usecases';

import { SocketWatchSubjectsUsecase } from '@data/usecases';

import { makeSocket, makeSubjectsTableGenerator } from '@main/factories';

export function makeSocketWatchSubjectsUsecase(): WatchSubjectsUsecase {
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeSubjectsTableGenerator();

  return new SocketWatchSubjectsUsecase({ socket, tableGenerator });
}

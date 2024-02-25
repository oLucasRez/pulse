import { SocketWatchSubjectsUsecase } from '@data/usecases';
import { WatchSubjectsUsecase } from '@domain/usecases';

import { makeSocket, makeSubjectsTableGenerator } from '@main/factories';

export function makeSocketWatchSubjectsUsecase(): WatchSubjectsUsecase {
  const socket = makeSocket();
  const tableGenerator = makeSubjectsTableGenerator();

  return new SocketWatchSubjectsUsecase({ socket, tableGenerator });
}

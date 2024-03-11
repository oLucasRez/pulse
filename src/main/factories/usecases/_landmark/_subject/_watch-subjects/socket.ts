import { WatchSubjectsUsecase } from '@domain/usecases';

import { SocketWatchSubjectsUsecase } from '@data/usecases';

import {
  makeFetchSubjectsPublisher,
  makeSocket,
  makeSubjectsTableGenerator,
} from '@main/factories';

export function makeSocketWatchSubjectsUsecase(): WatchSubjectsUsecase {
  const fetchSubjectsPublisher = makeFetchSubjectsPublisher();
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeSubjectsTableGenerator();

  return new SocketWatchSubjectsUsecase({
    fetchSubjectsPublisher,
    socket,
    tableGenerator,
  });
}

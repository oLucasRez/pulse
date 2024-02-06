import { SocketWatchMeUsecase } from '@data/usecases';
import { WatchMeUsecase } from '@domain/usecases';

import {
  makeGetMeUsecase,
  makeSocket,
  makeUsersTableGenerator,
} from '@main/factories';

export function makeSocketWatchMeUsecase(): WatchMeUsecase {
  const getMe = makeGetMeUsecase();
  const socket = makeSocket();
  const tableGenerator = makeUsersTableGenerator();

  return new SocketWatchMeUsecase({ getMe, socket, tableGenerator });
}

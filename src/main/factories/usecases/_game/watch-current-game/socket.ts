import { SocketWatchCurrentGameUsecase } from '@data/usecases';
import { WatchCurrentGameUsecase } from '@domain/usecases';

import {
  makeGamesTableGenerator,
  makeGetCurrentGameUsecase,
  makeSocket,
} from '@main/factories';

export function makeSocketWatchCurrentGameUsecase(): WatchCurrentGameUsecase {
  const tableGenerator = makeGamesTableGenerator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const socket = makeSocket();

  return new SocketWatchCurrentGameUsecase({
    tableGenerator,
    getCurrentGame,
    socket,
  });
}

import { WatchPlayersUsecase } from '@domain/usecases';

import { makeSocketWatchPlayersUsecase } from './socket';

export function makeWatchPlayersUsecase(): WatchPlayersUsecase {
  return makeSocketWatchPlayersUsecase();
}

import { WatchPlayersUsecase } from '@domain/usecases';

import { makeDAOWatchPlayersUsecase } from './dao';

export function makeWatchPlayersUsecase(): WatchPlayersUsecase {
  return makeDAOWatchPlayersUsecase();
}

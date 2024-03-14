import { WatchCurrentGameUsecase } from '@domain/usecases';

import { makeDAOWatchCurrentGameUsecase } from './dao';

export function makeWatchCurrentGameUsecase(): WatchCurrentGameUsecase {
  return makeDAOWatchCurrentGameUsecase();
}

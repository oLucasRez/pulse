import { WatchCurrentGameUsecase } from '@domain/usecases';

import { makeSocketWatchCurrentGameUsecase } from './socket';

export function makeWatchCurrentGameUsecase(): WatchCurrentGameUsecase {
  return makeSocketWatchCurrentGameUsecase();
}

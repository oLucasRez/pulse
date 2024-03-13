import { WatchRoundsUsecase } from '@domain/usecases';

import { makeSocketWatchRoundsUsecase } from './socket';

export function makeWatchRoundsUsecase(): WatchRoundsUsecase {
  return makeSocketWatchRoundsUsecase();
}

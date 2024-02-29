import { WatchMeUsecase } from '@domain/usecases';

import { makeSocketWatchMeUsecase } from './socket';

export function makeWatchMeUsecase(): WatchMeUsecase {
  return makeSocketWatchMeUsecase();
}

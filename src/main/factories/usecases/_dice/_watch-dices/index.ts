import { WatchDicesUsecase } from '@domain/usecases';

import { makeSocketWatchDicesUsecase } from './socket';

export function makeWatchDicesUsecase(): WatchDicesUsecase {
  return makeSocketWatchDicesUsecase();
}

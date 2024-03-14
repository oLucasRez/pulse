import { WatchDicesUsecase } from '@domain/usecases';

import { makeDAOWatchDicesUsecase } from './dao';

export function makeWatchDicesUsecase(): WatchDicesUsecase {
  return makeDAOWatchDicesUsecase();
}

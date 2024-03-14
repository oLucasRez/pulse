import { WatchRoundsUsecase } from '@domain/usecases';

import { makeDAOWatchRoundsUsecase } from './dao';

export function makeWatchRoundsUsecase(): WatchRoundsUsecase {
  return makeDAOWatchRoundsUsecase();
}

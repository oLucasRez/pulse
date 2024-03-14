import { WatchSubjectsUsecase } from '@domain/usecases';

import { makeDAOWatchSubjectsUsecase } from './dao';

export function makeWatchSubjectsUsecase(): WatchSubjectsUsecase {
  return makeDAOWatchSubjectsUsecase();
}

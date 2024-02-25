import { WatchSubjectsUsecase } from '@domain/usecases';

import { makeSocketWatchSubjectsUsecase } from './socket';

export function makeWatchSubjectsUsecase(): WatchSubjectsUsecase {
  return makeSocketWatchSubjectsUsecase();
}

import { WatchSubjectPulsesUsecase } from '@domain/usecases';

import { makeDAOWatchSubjectPulsesUsecase } from './dao';

export function makeWatchSubjectPulsesUsecase(): WatchSubjectPulsesUsecase {
  return makeDAOWatchSubjectPulsesUsecase();
}

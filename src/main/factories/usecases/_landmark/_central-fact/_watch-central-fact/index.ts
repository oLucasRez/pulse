import { WatchCentralFactUsecase } from '@domain/usecases';

import { makeDAOWatchCentralFactUsecase } from './dao';

export function makeWatchCentralFactUsecase(): WatchCentralFactUsecase {
  return makeDAOWatchCentralFactUsecase();
}

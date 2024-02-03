import { WatchCentralFactUsecase } from '@domain/usecases';

import { makeSocketWatchCentralFactUsecase } from './socket';

export function makeWatchCentralFactUsecase(): WatchCentralFactUsecase {
  return makeSocketWatchCentralFactUsecase();
}

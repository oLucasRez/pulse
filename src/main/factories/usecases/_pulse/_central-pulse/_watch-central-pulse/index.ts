import { WatchCentralPulseUsecase } from '@domain/usecases';

import { makeSocketWatchCentralPulseUsecase } from './socket';

export function makeWatchCentralPulseUsecase(): WatchCentralPulseUsecase {
  return makeSocketWatchCentralPulseUsecase();
}

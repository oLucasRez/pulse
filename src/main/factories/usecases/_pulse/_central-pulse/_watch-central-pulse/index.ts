import { WatchCentralPulseUsecase } from '@domain/usecases';

import { makeDAOWatchCentralPulseUsecase } from './dao';

export function makeWatchCentralPulseUsecase(): WatchCentralPulseUsecase {
  return makeDAOWatchCentralPulseUsecase();
}

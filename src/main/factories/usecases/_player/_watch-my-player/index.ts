import { WatchMyPlayerUsecase } from '@domain/usecases';

import { makeDAOWatchMyPlayerUsecase } from './dao';

export function makeWatchMyPlayerUsecase(): WatchMyPlayerUsecase {
  return makeDAOWatchMyPlayerUsecase();
}

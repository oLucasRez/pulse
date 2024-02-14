import { WatchMyPlayerUsecase } from '@domain/usecases';

import { makeSocketWatchMyPlayerUsecase } from './socket';

export function makeWatchMyPlayerUsecase(): WatchMyPlayerUsecase {
  return makeSocketWatchMyPlayerUsecase();
}

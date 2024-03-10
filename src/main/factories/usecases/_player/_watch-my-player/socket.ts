import { WatchMyPlayerUsecase } from '@domain/usecases';

import { SocketWatchMyPlayerUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makeSocketWatchMyPlayerUsecase(): WatchMyPlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const watchPlayers = makeWatchPlayersUsecase();

  return new SocketWatchMyPlayerUsecase({ getMyPlayer, watchPlayers });
}

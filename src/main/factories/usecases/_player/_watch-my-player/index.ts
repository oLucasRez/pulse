import { IWatchMyPlayerUsecase } from '@domain/usecases';

import { WatchMyPlayerUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makeWatchMyPlayerUsecase(): IWatchMyPlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const watchPlayers = makeWatchPlayersUsecase();

  return new WatchMyPlayerUsecase({ getMyPlayer, watchPlayers });
}

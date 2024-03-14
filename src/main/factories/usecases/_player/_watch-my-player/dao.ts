import { WatchMyPlayerUsecase } from '@domain/usecases';

import { DAOWatchMyPlayerUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeWatchPlayersUsecase,
} from '@main/factories';

export function makeDAOWatchMyPlayerUsecase(): WatchMyPlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const watchPlayers = makeWatchPlayersUsecase();

  return new DAOWatchMyPlayerUsecase({ getMyPlayer, watchPlayers });
}

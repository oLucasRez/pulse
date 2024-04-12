import { IWatchPlayersUsecase } from '@domain/usecases';

import { WatchPlayersUsecase } from '@data/usecases';

import { makeFetchPlayersPublisher, makePlayerDAO } from '@main/factories';

export function makeWatchPlayersUsecase(): IWatchPlayersUsecase {
  const fetchPlayersPublisher = makeFetchPlayersPublisher();
  const playerDAO = makePlayerDAO();

  return new WatchPlayersUsecase({
    fetchPlayersPublisher,
    playerDAO,
  });
}

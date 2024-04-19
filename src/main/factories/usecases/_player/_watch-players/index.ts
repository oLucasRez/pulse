import { IWatchPlayersUsecase } from '@domain/usecases';

import { WatchPlayersUsecase } from '@data/usecases';

import { makePlayerDAO, makePlayerHydrator } from '@main/factories';

export function makeWatchPlayersUsecase(): IWatchPlayersUsecase {
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new WatchPlayersUsecase({
    playerDAO,
    playerHydrator,
  });
}

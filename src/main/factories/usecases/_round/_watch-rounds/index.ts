import { IWatchRoundsUsecase } from '@domain/usecases';

import { WatchRoundsUsecase } from '@data/usecases';

import { makeRoundDAO, makeRoundHydrator } from '@main/factories';

export function makeWatchRoundsUsecase(): IWatchRoundsUsecase {
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new WatchRoundsUsecase({
    roundDAO,
    roundHydrator,
  });
}

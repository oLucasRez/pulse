import { IWatchRoundsUsecase } from '@domain/usecases';

import { WatchRoundsUsecase } from '@data/usecases';

import { makeFetchRoundsPublisher, makeRoundDAO } from '@main/factories';

export function makeWatchRoundsUsecase(): IWatchRoundsUsecase {
  const fetchRoundsPublisher = makeFetchRoundsPublisher();
  const roundDAO = makeRoundDAO();

  return new WatchRoundsUsecase({ fetchRoundsPublisher, roundDAO });
}

import { WatchRoundsUsecase } from '@domain/usecases';

import { DAOWatchRoundsUsecase } from '@data/usecases';

import { makeFetchRoundsPublisher, makeRoundDAO } from '@main/factories';

export function makeDAOWatchRoundsUsecase(): WatchRoundsUsecase {
  const fetchRoundsPublisher = makeFetchRoundsPublisher();
  const roundDAO = makeRoundDAO();

  return new DAOWatchRoundsUsecase({ fetchRoundsPublisher, roundDAO });
}

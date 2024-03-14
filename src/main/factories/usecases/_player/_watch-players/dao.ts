import { WatchPlayersUsecase } from '@domain/usecases';

import { DAOWatchPlayersUsecase } from '@data/usecases';

import { makeFetchPlayersPublisher, makePlayerDAO } from '@main/factories';

export function makeDAOWatchPlayersUsecase(): WatchPlayersUsecase {
  const fetchPlayersPublisher = makeFetchPlayersPublisher();
  const playerDAO = makePlayerDAO();

  return new DAOWatchPlayersUsecase({
    fetchPlayersPublisher,
    playerDAO,
  });
}

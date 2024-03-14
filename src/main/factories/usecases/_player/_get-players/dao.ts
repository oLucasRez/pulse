import { GetPlayersUsecase } from '@domain/usecases';

import { DAOGetPlayersUsecase } from '@data/usecases';

import { makeFetchPlayersPublisher, makePlayerDAO } from '@main/factories';

export function makeDAOGetPlayersUsecase(): GetPlayersUsecase {
  const playerDAO = makePlayerDAO();
  const fetchPlayersPublisher = makeFetchPlayersPublisher();

  return new DAOGetPlayersUsecase({ playerDAO, fetchPlayersPublisher });
}

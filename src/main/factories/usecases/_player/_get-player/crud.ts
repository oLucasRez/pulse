import { GetPlayerUsecase } from '@domain/usecases';

import { DAOGetPlayerUsecase } from '@data/usecases';

import { makeFetchPlayerPublisher, makePlayerDAO } from '@main/factories';

export function makeDAOGetPlayerUsecase(): GetPlayerUsecase {
  const playerDAO = makePlayerDAO();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new DAOGetPlayerUsecase({ playerDAO, fetchPlayerPublisher });
}

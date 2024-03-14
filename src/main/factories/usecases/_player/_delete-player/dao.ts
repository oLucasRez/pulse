import { DeletePlayerUsecase } from '@domain/usecases';

import { DAODeletePlayerUsecase } from '@data/usecases';

import { makeDeletePlayerPublisher, makePlayerDAO } from '@main/factories';

export function makeDAODeletePlayerUsecase(): DeletePlayerUsecase {
  const playerDAO = makePlayerDAO();
  const deletePlayerPublisher = makeDeletePlayerPublisher();

  return new DAODeletePlayerUsecase({ playerDAO, deletePlayerPublisher });
}

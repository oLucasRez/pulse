import { DeleteGameUsecase } from '@domain/usecases';

import { DAODeleteGameUsecase } from '@data/usecases';

import { makeDeleteGamePublisher, makeGameDAO } from '@main/factories';

export function makeDAODeleteGameUsecase(): DeleteGameUsecase {
  const gameDAO = makeGameDAO();
  const deleteGamePublisher = makeDeleteGamePublisher();

  return new DAODeleteGameUsecase({ gameDAO, deleteGamePublisher });
}

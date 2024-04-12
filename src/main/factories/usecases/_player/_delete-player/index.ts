import { IDeletePlayerUsecase } from '@domain/usecases';

import { DeletePlayerUsecase } from '@data/usecases';

import { makeDeletePlayerPublisher, makePlayerDAO } from '@main/factories';

export function makeDeletePlayerUsecase(): IDeletePlayerUsecase {
  const playerDAO = makePlayerDAO();
  const deletePlayerPublisher = makeDeletePlayerPublisher();

  return new DeletePlayerUsecase({ playerDAO, deletePlayerPublisher });
}

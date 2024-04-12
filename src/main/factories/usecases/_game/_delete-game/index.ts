import { IDeleteGameUsecase } from '@domain/usecases';

import { DeleteGameUsecase } from '@data/usecases';

import { makeDeleteGamePublisher, makeGameDAO } from '@main/factories';

export function makeDeleteGameUsecase(): IDeleteGameUsecase {
  const gameDAO = makeGameDAO();
  const deleteGamePublisher = makeDeleteGamePublisher();

  return new DeleteGameUsecase({ gameDAO, deleteGamePublisher });
}

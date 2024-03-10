import { CRUDDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeDeleteGamePublisher, makeGameCRUD } from '@main/factories';

export function makeCRUDDeleteGameUsecase(): DeleteGameUsecase {
  const gameCRUD = makeGameCRUD();
  const deleteGamePublisher = makeDeleteGamePublisher();

  return new CRUDDeleteGameUsecase({ gameCRUD, deleteGamePublisher });
}

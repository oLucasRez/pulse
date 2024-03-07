import { CRUDDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGamePublisher } from '@main/factories';

export function makeCRUDDeleteGameUsecase(): DeleteGameUsecase {
  const gameCRUD = makeGameCRUD();
  const gamePublisher = makeGamePublisher();

  return new CRUDDeleteGameUsecase({ gameCRUD, gamePublisher });
}

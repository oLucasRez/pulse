import { CRUDDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeGameCRUD } from '@main/factories';

export function makeCRUDDeleteGameUsecase(): DeleteGameUsecase {
  const gameCRUD = makeGameCRUD();

  return new CRUDDeleteGameUsecase({ gameCRUD });
}

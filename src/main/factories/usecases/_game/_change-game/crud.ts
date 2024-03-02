import { CRUDChangeGameUsecase } from '@data/usecases';
import { ChangeGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetCurrentGameUsecase } from '@main/factories';

export function makeCRUDChangeGameUsecase(): ChangeGameUsecase {
  const gameCRUD = makeGameCRUD();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CRUDChangeGameUsecase({ gameCRUD, getCurrentGame });
}

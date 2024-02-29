import { CRUDGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeGameCRUD } from '@main/factories';

export function makeCRUDGetGameUsecase(): GetGameUsecase {
  const gameCRUD = makeGameCRUD();

  return new CRUDGetGameUsecase({ gameCRUD });
}

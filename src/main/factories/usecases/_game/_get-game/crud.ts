import { CRUDGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeFetchGamePublisher, makeGameCRUD } from '@main/factories';

export function makeCRUDGetGameUsecase(): GetGameUsecase {
  const gameCRUD = makeGameCRUD();
  const fetchGamePublisher = makeFetchGamePublisher();

  return new CRUDGetGameUsecase({ gameCRUD, fetchGamePublisher });
}

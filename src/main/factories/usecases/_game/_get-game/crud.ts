import { CRUDGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGamePublisher } from '@main/factories';

export function makeCRUDGetGameUsecase(): GetGameUsecase {
  const gameCRUD = makeGameCRUD();
  const gamePublisher = makeGamePublisher();

  return new CRUDGetGameUsecase({ gameCRUD, gamePublisher });
}

import { CRUDChangeGameUsecase } from '@data/usecases';
import { ChangeGameUsecase } from '@domain/usecases';

import {
  makeChangeGamePublisher,
  makeGameCRUD,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeCRUDChangeGameUsecase(): ChangeGameUsecase {
  const gameCRUD = makeGameCRUD();
  const changeGamePublisher = makeChangeGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CRUDChangeGameUsecase({
    gameCRUD,
    changeGamePublisher,
    getCurrentGame,
  });
}

import { CRUDChangeGameUsecase } from '@data/usecases';
import { ChangeGameUsecase } from '@domain/usecases';

import {
  makeGameCRUD,
  makeGamePublisher,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeCRUDChangeGameUsecase(): ChangeGameUsecase {
  const gameCRUD = makeGameCRUD();
  const gamePublisher = makeGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new CRUDChangeGameUsecase({ gameCRUD, gamePublisher, getCurrentGame });
}

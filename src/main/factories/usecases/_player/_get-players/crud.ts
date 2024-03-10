import { CRUDGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import { makeFetchPlayersPublisher, makePlayerCRUD } from '@main/factories';

export function makeCRUDGetPlayersUsecase(): GetPlayersUsecase {
  const playerCRUD = makePlayerCRUD();
  const fetchPlayersPublisher = makeFetchPlayersPublisher();

  return new CRUDGetPlayersUsecase({ playerCRUD, fetchPlayersPublisher });
}

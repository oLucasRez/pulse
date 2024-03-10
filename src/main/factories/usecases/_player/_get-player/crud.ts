import { CRUDGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import { makeFetchPlayerPublisher, makePlayerCRUD } from '@main/factories';

export function makeCRUDGetPlayerUsecase(): GetPlayerUsecase {
  const playerCRUD = makePlayerCRUD();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new CRUDGetPlayerUsecase({ playerCRUD, fetchPlayerPublisher });
}

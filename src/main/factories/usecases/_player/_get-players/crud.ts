import { CRUDGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import { makePlayerCRUD } from '@main/factories';

export function makeCRUDGetPlayersUsecase(): GetPlayersUsecase {
  const playerCRUD = makePlayerCRUD();

  return new CRUDGetPlayersUsecase({ playerCRUD });
}

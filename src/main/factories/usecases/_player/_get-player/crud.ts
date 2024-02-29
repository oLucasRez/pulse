import { CRUDGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import { makePlayerCRUD } from '@main/factories';

export function makeCRUDGetPlayerUsecase(): GetPlayerUsecase {
  const playerCRUD = makePlayerCRUD();

  return new CRUDGetPlayerUsecase({ playerCRUD });
}

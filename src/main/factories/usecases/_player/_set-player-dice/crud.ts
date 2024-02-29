import { CRUDSetPlayerDiceUsecase } from '@data/usecases';
import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makePlayerCRUD } from '@main/factories';

export function makeCRUDSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  const playerCRUD = makePlayerCRUD();

  return new CRUDSetPlayerDiceUsecase({
    playerCRUD,
  });
}

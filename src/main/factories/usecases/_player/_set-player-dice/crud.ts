import { CRUDSetPlayerDiceUsecase } from '@data/usecases';
import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makePlayerCRUD, makePlayerPublisher } from '@main/factories';

export function makeCRUDSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDSetPlayerDiceUsecase({
    playerCRUD,
    playerPublisher,
  });
}

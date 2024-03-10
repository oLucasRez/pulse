import { CRUDSetPlayerDiceUsecase } from '@data/usecases';
import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makeChangePlayerPublisher, makePlayerCRUD } from '@main/factories';

export function makeCRUDSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  const playerCRUD = makePlayerCRUD();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new CRUDSetPlayerDiceUsecase({
    playerCRUD,
    changePlayerPublisher,
  });
}

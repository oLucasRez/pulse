import { ISetPlayerDiceUsecase } from '@domain/usecases';

import { SetPlayerDiceUsecase } from '@data/usecases';

import { makePlayerDAO, makePlayerHydrator } from '@main/factories';

export function makeSetPlayerDiceUsecase(): ISetPlayerDiceUsecase {
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new SetPlayerDiceUsecase({
    playerDAO,
    playerHydrator,
  });
}

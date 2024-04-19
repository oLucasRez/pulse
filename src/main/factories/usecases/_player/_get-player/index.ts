import { IGetPlayerUsecase } from '@domain/usecases';

import { GetPlayerUsecase } from '@data/usecases';

import { makePlayerDAO, makePlayerHydrator } from '@main/factories';

export function makeGetPlayerUsecase(): IGetPlayerUsecase {
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new GetPlayerUsecase({
    playerDAO,
    playerHydrator,
  });
}

import { IGetPlayersUsecase } from '@domain/usecases';

import { GetPlayersUsecase } from '@data/usecases';

import { makePlayerDAO, makePlayerHydrator } from '@main/factories';

export function makeGetPlayersUsecase(): IGetPlayersUsecase {
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new GetPlayersUsecase({
    playerDAO,
    playerHydrator,
  });
}

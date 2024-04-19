import { IBanPlayerUsecase } from '@domain/usecases';

import { BanPlayerUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeBanPlayerUsecase(): IBanPlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new BanPlayerUsecase({
    getCurrentGame,
    getMe,
    playerDAO,
    playerHydrator,
  });
}

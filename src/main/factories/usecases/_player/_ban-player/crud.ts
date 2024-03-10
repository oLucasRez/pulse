import { BanPlayerUsecase } from '@domain/usecases';

import { DAOBanPlayerUsecase } from '@data/usecases';

import {
  makeBanPlayerPublisher,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeDAOBanPlayerUsecase(): BanPlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const playerDAO = makePlayerDAO();
  const banPlayerPublisher = makeBanPlayerPublisher();

  return new DAOBanPlayerUsecase({
    getCurrentGame,
    getMe,
    playerDAO,
    banPlayerPublisher,
  });
}

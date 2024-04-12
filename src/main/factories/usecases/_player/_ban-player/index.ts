import { IBanPlayerUsecase } from '@domain/usecases';

import { BanPlayerUsecase } from '@data/usecases';

import {
  makeBanPlayerPublisher,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeBanPlayerUsecase(): IBanPlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const playerDAO = makePlayerDAO();
  const banPlayerPublisher = makeBanPlayerPublisher();

  return new BanPlayerUsecase({
    getCurrentGame,
    getMe,
    playerDAO,
    banPlayerPublisher,
  });
}

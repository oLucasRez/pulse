import { IGetLightSpotRoundUsecase } from '@domain/usecases';

import { GetLightSpotRoundUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makeGetLightSpotRoundUsecase(): IGetLightSpotRoundUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new GetLightSpotRoundUsecase({
    getCurrentGame,
    roundDAO,
    roundHydrator,
  });
}

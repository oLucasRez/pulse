import { IGetCurrentLightSpotPlayerUsecase } from '@domain/usecases';

import { GetCurrentLightSpotPlayerUsecase } from '@data/usecases';

import {
  makeGetLightSpotRoundUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeGetCurrentLightSpotPlayerUsecase(): IGetCurrentLightSpotPlayerUsecase {
  const getLightSpotRound = makeGetLightSpotRoundUsecase();
  const playerDAO = makePlayerDAO();
  const playerHidrator = makePlayerHydrator();

  return new GetCurrentLightSpotPlayerUsecase({
    getLightSpotRound,
    playerDAO,
    playerHidrator,
  });
}

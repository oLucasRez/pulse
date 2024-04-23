import { ICreateLightSpotUsecase } from '@domain/usecases';

import { CreateLightSpotUsecase } from '@data/usecases';

import {
  makeGetCurrentLightSpotDiceUsecase,
  makeLightSpotDAO,
  makeLightSpotHydrator,
} from '@main/factories';

export function makeCreateLightSpotUsecase(): ICreateLightSpotUsecase {
  const getCurrentLightSpotDice = makeGetCurrentLightSpotDiceUsecase();
  const lightSpotDAO = makeLightSpotDAO();
  const lightSpotHydrator = makeLightSpotHydrator();

  return new CreateLightSpotUsecase({
    getCurrentLightSpotDice,
    lightSpotDAO,
    lightSpotHydrator,
  });
}

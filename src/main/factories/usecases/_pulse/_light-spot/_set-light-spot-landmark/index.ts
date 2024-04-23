import { ISetLightSpotLandmarkUsecase } from '@domain/usecases';

import { SetLightSpotLandmarkUsecase } from '@data/usecases';

import { makeLightSpotDAO, makeLightSpotHydrator } from '@main/factories';

export function makeSetLightSpotLandmarkUsecase(): ISetLightSpotLandmarkUsecase {
  const lightSpotDAO = makeLightSpotDAO();
  const lightSpotHydrator = makeLightSpotHydrator();

  return new SetLightSpotLandmarkUsecase({
    lightSpotDAO,
    lightSpotHydrator,
  });
}

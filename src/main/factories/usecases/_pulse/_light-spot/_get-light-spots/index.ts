import { IGetLightSpotsUsecase } from '@domain/usecases';

import { GetLightSpotsUsecase } from '@data/usecases';

import { makeLightSpotDAO, makeLightSpotHydrator } from '@main/factories';

export function makeGetLightSpotsUsecase(): IGetLightSpotsUsecase {
  const lightSpotDAO = makeLightSpotDAO();
  const lightSpotHydrator = makeLightSpotHydrator();

  return new GetLightSpotsUsecase({
    lightSpotDAO,
    lightSpotHydrator,
  });
}

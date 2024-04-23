import { IWatchLightSpotsUsecase } from '@domain/usecases';

import { WatchLightSpotsUsecase } from '@data/usecases';

import { makeLightSpotDAO, makeLightSpotHydrator } from '@main/factories';

export function makeWatchLightSpotsUsecase(): IWatchLightSpotsUsecase {
  const lightSpotDAO = makeLightSpotDAO();
  const lightSpotHydrator = makeLightSpotHydrator();

  return new WatchLightSpotsUsecase({
    lightSpotDAO,
    lightSpotHydrator,
  });
}

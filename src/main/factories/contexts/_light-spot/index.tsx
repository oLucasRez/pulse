import { ReactElement } from 'react';

import { LightSpotContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateLightSpotUsecase,
  makeGetLightSpotsUsecase,
  makeWatchLightSpotsUsecase,
} from '@main/factories';

export function makeLightSpotContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getLightSpots = makeGetLightSpotsUsecase();
  const watchLightSpots = makeWatchLightSpotsUsecase();
  const createLightSpot = makeCreateLightSpotUsecase();

  return (
    <LightSpotContextProvider
      getLightSpots={getLightSpots}
      watchLightSpots={watchLightSpots}
      createLightSpot={createLightSpot}
      {...props}
    />
  );
}

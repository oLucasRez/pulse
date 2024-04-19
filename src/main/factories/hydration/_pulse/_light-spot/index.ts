import { ILightSpotHydrator } from '@data/hydration';

import { LightSpotHydrator } from '@main/hydration';

export function makeLightSpotHydrator(): ILightSpotHydrator {
  return new LightSpotHydrator();
}

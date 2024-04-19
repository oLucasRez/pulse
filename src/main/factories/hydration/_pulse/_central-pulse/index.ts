import { ICentralPulseHydrator } from '@data/hydration';

import { CentralPulseHydrator } from '@main/hydration';

export function makeCentralPulseHydrator(): ICentralPulseHydrator {
  return new CentralPulseHydrator();
}

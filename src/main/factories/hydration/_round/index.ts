import { IRoundHydrator } from '@data/hydration';

import { RoundHydrator } from '@main/hydration';

export function makeRoundHydrator(): IRoundHydrator {
  return new RoundHydrator();
}

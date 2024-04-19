import { ICentralFactHydrator } from '@data/hydration';

import { CentralFactHydrator } from '@main/hydration';

export function makeCentralFactHydrator(): ICentralFactHydrator {
  return new CentralFactHydrator();
}

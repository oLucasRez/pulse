import { IPlayerHydrator } from '@data/hydration';

import { PlayerHydrator } from '@main/hydration';

export function makePlayerHydrator(): IPlayerHydrator {
  return new PlayerHydrator();
}

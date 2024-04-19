import { IGameHydrator } from '@data/hydration';

import { GameHydrator } from '@main/hydration';

export function makeGameHydrator(): IGameHydrator {
  return new GameHydrator();
}

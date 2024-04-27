import { ILightSpotHydrator } from '@data/hydration';

import { makeDiceDAO, makeSubjectDAO } from '@main/factories';
import { LightSpotHydrator } from '@main/hydration';

export function makeLightSpotHydrator(): ILightSpotHydrator {
  const diceDAO = makeDiceDAO();
  const subjectDAO = makeSubjectDAO();

  return new LightSpotHydrator({ diceDAO, subjectDAO });
}

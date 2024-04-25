import { IDiceHydrator } from '@data/hydration';

import { makePlayerDAO, makeSubjectDAO } from '@main/factories';
import { DiceHydrator } from '@main/hydration';

export function makeDiceHydrator(): IDiceHydrator {
  const playerDAO = makePlayerDAO();
  const subjectDAO = makeSubjectDAO();

  return new DiceHydrator({ playerDAO, subjectDAO });
}

import { ISubjectPulseHydrator } from '@data/hydration';

import { makeDiceDAO, makeSubjectDAO } from '@main/factories';
import { SubjectPulseHydrator } from '@main/hydration';

export function makeSubjectPulseHydrator(): ISubjectPulseHydrator {
  const diceDAO = makeDiceDAO();
  const subjectDAO = makeSubjectDAO();

  return new SubjectPulseHydrator({ diceDAO, subjectDAO });
}

import { ISubjectHydrator } from '@data/hydration';

import { makePlayerDAO } from '@main/factories';
import { SubjectHydrator } from '@main/hydration';

export function makeSubjectHydrator(): ISubjectHydrator {
  const playerDAO = makePlayerDAO();

  return new SubjectHydrator({ playerDAO });
}

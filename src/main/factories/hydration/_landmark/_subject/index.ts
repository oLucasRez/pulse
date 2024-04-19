import { ISubjectHydrator } from '@data/hydration';

import { SubjectHydrator } from '@main/hydration';

export function makeSubjectHydrator(): ISubjectHydrator {
  return new SubjectHydrator();
}

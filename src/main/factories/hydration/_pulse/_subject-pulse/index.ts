import { ISubjectPulseHydrator } from '@data/hydration';

import { SubjectPulseHydrator } from '@main/hydration';

export function makeSubjectPulseHydrator(): ISubjectPulseHydrator {
  return new SubjectPulseHydrator();
}

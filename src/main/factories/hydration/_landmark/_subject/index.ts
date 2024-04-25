import { ISubjectHydrator } from '@data/hydration';

import {
  makeLightSpotDAO,
  makePlayerDAO,
  makeSubjectPulseDAO,
} from '@main/factories';
import { SubjectHydrator } from '@main/hydration';

export function makeSubjectHydrator(): ISubjectHydrator {
  const lightSpotDAO = makeLightSpotDAO();
  const playerDAO = makePlayerDAO();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new SubjectHydrator({ lightSpotDAO, playerDAO, subjectPulseDAO });
}

import { ISubjectHydrator } from '@data/hydration';

import {
  makeDiceDAO,
  makeLightSpotDAO,
  makePlayerDAO,
  makeSubjectPulseDAO,
} from '@main/factories';
import { SubjectHydrator } from '@main/hydration';

export function makeSubjectHydrator(): ISubjectHydrator {
  const diceDAO = makeDiceDAO();
  const lightSpotDAO = makeLightSpotDAO();
  const playerDAO = makePlayerDAO();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new SubjectHydrator({
    diceDAO,
    lightSpotDAO,
    playerDAO,
    subjectPulseDAO,
  });
}

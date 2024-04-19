import { IWatchSubjectPulsesUsecase } from '@domain/usecases';

import { WatchSubjectPulsesUsecase } from '@data/usecases';

import { makeSubjectPulseDAO, makeSubjectPulseHydrator } from '@main/factories';

export function makeWatchSubjectPulsesUsecase(): IWatchSubjectPulsesUsecase {
  const subjectPulseDAO = makeSubjectPulseDAO();
  const subjectPulseHydrator = makeSubjectPulseHydrator();

  return new WatchSubjectPulsesUsecase({
    subjectPulseDAO,
    subjectPulseHydrator,
  });
}

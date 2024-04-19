import { IGetSubjectPulsesUsecase } from '@domain/usecases';

import { GetSubjectPulsesUsecase } from '@data/usecases';

import { makeSubjectPulseDAO, makeSubjectPulseHydrator } from '@main/factories';

export function makeGetSubjectPulsesUsecase(): IGetSubjectPulsesUsecase {
  const subjectPulseDAO = makeSubjectPulseDAO();
  const subjectPulseHydrator = makeSubjectPulseHydrator();

  return new GetSubjectPulsesUsecase({
    subjectPulseDAO,
    subjectPulseHydrator,
  });
}

import { IGetSubjectPulseUsecase } from '@domain/usecases';

import { GetSubjectPulseUsecase } from '@data/usecases';

import { makeSubjectPulseDAO, makeSubjectPulseHydrator } from '@main/factories';

export function makeGetSubjectPulseUsecase(): IGetSubjectPulseUsecase {
  const subjectPulseDAO = makeSubjectPulseDAO();
  const subjectPulseHydrator = makeSubjectPulseHydrator();

  return new GetSubjectPulseUsecase({
    subjectPulseDAO,
    subjectPulseHydrator,
  });
}

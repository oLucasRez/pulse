import { CreateSubjectPulseUsecase } from '@domain/usecases';

import { makeDAOCreateSubjectPulseUsecase } from './dao';

export function makeCreateSubjectPulseUsecase(): CreateSubjectPulseUsecase {
  return makeDAOCreateSubjectPulseUsecase();
}

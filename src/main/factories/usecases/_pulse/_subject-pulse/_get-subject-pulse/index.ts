import { GetSubjectPulseUsecase } from '@domain/usecases';

import { makeDAOGetSubjectPulseUsecase } from './dao';

export function makeGetSubjectPulseUsecase(): GetSubjectPulseUsecase {
  return makeDAOGetSubjectPulseUsecase();
}

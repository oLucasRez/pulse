import { GetSubjectPulsesUsecase } from '@domain/usecases';

import { makeDAOGetSubjectPulsesUsecase } from './dao';

export function makeGetSubjectPulsesUsecase(): GetSubjectPulsesUsecase {
  return makeDAOGetSubjectPulsesUsecase();
}

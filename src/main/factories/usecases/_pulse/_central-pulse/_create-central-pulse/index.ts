import { CreateCentralPulseUsecase } from '@domain/usecases';

import { makeDAOCreateCentralPulseUsecase } from './dao';

export function makeCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  return makeDAOCreateCentralPulseUsecase();
}

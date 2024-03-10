import { CreateCentralPulseUsecase } from '@domain/usecases';

import { makeDAOCreateCentralPulseUsecase } from './crud';

export function makeCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  return makeDAOCreateCentralPulseUsecase();
}

import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeDAOGetCentralPulseUsecase } from './dao';

export function makeGetCentralPulseUsecase(): GetCentralPulseUsecase {
  return makeDAOGetCentralPulseUsecase();
}

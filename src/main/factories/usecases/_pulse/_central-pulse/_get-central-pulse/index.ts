import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeDAOGetCentralPulseUsecase } from './crud';

export function makeGetCentralPulseUsecase(): GetCentralPulseUsecase {
  return makeDAOGetCentralPulseUsecase();
}

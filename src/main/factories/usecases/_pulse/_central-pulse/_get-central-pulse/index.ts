import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeCRUDGetCentralPulseUsecase } from './crud';

export function makeGetCentralPulseUsecase(): GetCentralPulseUsecase {
  return makeCRUDGetCentralPulseUsecase();
}

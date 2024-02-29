import { CreateCentralPulseUsecase } from '@domain/usecases';

import { makeCRUDCreateCentralPulseUsecase } from './crud';

export function makeCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  return makeCRUDCreateCentralPulseUsecase();
}

import { ChangeCentralPulseUsecase } from '@domain/usecases';

import { makeCRUDChangeCentralPulseUsecase } from './crud';

export function makeChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  return makeCRUDChangeCentralPulseUsecase();
}

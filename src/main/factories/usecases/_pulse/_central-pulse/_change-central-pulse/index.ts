import { ChangeCentralPulseUsecase } from '@domain/usecases';

import { makeDAOChangeCentralPulseUsecase } from './crud';

export function makeChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  return makeDAOChangeCentralPulseUsecase();
}

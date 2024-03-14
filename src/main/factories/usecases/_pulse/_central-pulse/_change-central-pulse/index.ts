import { ChangeCentralPulseUsecase } from '@domain/usecases';

import { makeDAOChangeCentralPulseUsecase } from './dao';

export function makeChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  return makeDAOChangeCentralPulseUsecase();
}

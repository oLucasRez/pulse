import { ChangeCentralPulseUsecase } from '@domain/usecases';

import { makeDatabaseChangeCentralPulseUsecase } from './database';

export function makeChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  return makeDatabaseChangeCentralPulseUsecase();
}

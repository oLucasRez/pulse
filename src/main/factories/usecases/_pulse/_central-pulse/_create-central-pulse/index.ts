import { CreateCentralPulseUsecase } from '@domain/usecases';

import { makeDatabaseCreateCentralPulseUsecase } from './database';

export function makeCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  return makeDatabaseCreateCentralPulseUsecase();
}

import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeDatabaseGetCentralPulseUsecase } from './database';

export function makeGetCentralPulseUsecase(): GetCentralPulseUsecase {
  return makeDatabaseGetCentralPulseUsecase();
}

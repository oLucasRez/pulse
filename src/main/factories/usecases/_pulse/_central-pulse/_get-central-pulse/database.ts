import { DatabaseGetCentralPulseUsecase } from '@data/usecases';
import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeCentralPulsesTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseGetCentralPulseUsecase(): GetCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const database = makeDatabase();

  return new DatabaseGetCentralPulseUsecase({ tableGenerator, database });
}

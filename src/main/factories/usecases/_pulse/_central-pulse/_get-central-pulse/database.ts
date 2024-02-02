import { DatabaseGetCentralPulseUsecase } from '@data/usecases';
import { GetCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseGetCentralPulseUsecase(): GetCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetCentralPulseUsecase({ tableGenerator, database });
}

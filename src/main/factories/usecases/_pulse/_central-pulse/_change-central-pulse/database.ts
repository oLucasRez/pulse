import { DatabaseChangeCentralPulseUsecase } from '@data/usecases';
import { ChangeCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeDatabaseGetCentralPulseUsecase,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const database = makeFirebaseDatabase();
  const getCentralPulse = makeDatabaseGetCentralPulseUsecase();

  return new DatabaseChangeCentralPulseUsecase({
    tableGenerator,
    database,
    getCentralPulse,
  });
}

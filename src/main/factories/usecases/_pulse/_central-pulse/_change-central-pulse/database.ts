import { DatabaseChangeCentralPulseUsecase } from '@data/usecases';
import { ChangeCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeFirebaseDatabase,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeDatabaseChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const database = makeFirebaseDatabase();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new DatabaseChangeCentralPulseUsecase({
    tableGenerator,
    database,
    getCentralPulse,
  });
}

import { DatabaseCreateCentralPulseUsecase } from '@data/usecases';
import { CreateCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeDatabaseCreateCentralFactUsecase,
  makeFirebaseDatabase,
} from '@main/factories';

export function makeDatabaseCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const database = makeFirebaseDatabase();
  const createCentralFact = makeDatabaseCreateCentralFactUsecase();

  return new DatabaseCreateCentralPulseUsecase({
    tableGenerator,
    database,
    createCentralFact,
  });
}

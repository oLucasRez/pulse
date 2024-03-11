import { CentralPulseDAO } from '@data/dao';

import { DatabaseCentralPulseDAO } from '@main/adapters/dao';
import { makeCentralPulsesTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseCentralPulseDAO(): CentralPulseDAO {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeCentralPulsesTableGenerator();

  return new DatabaseCentralPulseDAO({ database, tableGenerator });
}

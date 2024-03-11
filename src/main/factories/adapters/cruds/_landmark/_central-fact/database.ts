import { CentralFactDAO } from '@data/dao';

import { DatabaseCentralFactDAO } from '@main/adapters/dao';
import { makeCentralFactsTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseCentralFactDAO(): CentralFactDAO {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeCentralFactsTableGenerator();

  return new DatabaseCentralFactDAO({ database, tableGenerator });
}

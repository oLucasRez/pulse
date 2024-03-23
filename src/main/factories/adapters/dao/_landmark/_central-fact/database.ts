import { CentralFactDAO } from '@data/dao';

import { DatabaseCentralFactDAO } from '@main/adapters/dao';
import {
  makeCentralFactsTableGenerator,
  makeDatabase,
  makeSocket,
} from '@main/factories';

export function makeDatabaseCentralFactDAO(): CentralFactDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeCentralFactsTableGenerator();

  return new DatabaseCentralFactDAO({ database, socket, tableGenerator });
}

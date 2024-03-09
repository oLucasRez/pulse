import { CentralFactCRUD } from '@data/cruds';
import { DatabaseCentralFactCRUD } from '@main/adapters/cruds';

import { makeCentralFactsTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseCentralFactCRUD(): CentralFactCRUD {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeCentralFactsTableGenerator();

  return new DatabaseCentralFactCRUD({ database, tableGenerator });
}

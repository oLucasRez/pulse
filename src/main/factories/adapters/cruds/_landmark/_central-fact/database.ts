import { CentralFactCRUD } from '@data/cruds';
import { DatabaseCentralFactCRUD } from '@main/adapters/cruds';

import { makeCentralFactsTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseCentralFactCRUD(): CentralFactCRUD {
  const database = makeDatabase();
  const tableGenerator = makeCentralFactsTableGenerator();

  return new DatabaseCentralFactCRUD({ database, tableGenerator });
}

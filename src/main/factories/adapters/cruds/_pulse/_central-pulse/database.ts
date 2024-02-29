import { CentralPulseCRUD } from '@data/cruds';
import { DatabaseCentralPulseCRUD } from '@main/adapters/cruds';

import { makeCentralPulsesTableGenerator, makeDatabase } from '@main/factories';

export function makeDatabaseCentralPulseCRUD(): CentralPulseCRUD {
  const database = makeDatabase();
  const tableGenerator = makeCentralPulsesTableGenerator();

  return new DatabaseCentralPulseCRUD({ database, tableGenerator });
}

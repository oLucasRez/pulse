import { RoundCRUD } from '@data/cruds';
import { DatabaseRoundCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeRoundsTableGenerator } from '@main/factories';

export function makeDatabaseRoundCRUD(): RoundCRUD {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabaseRoundCRUD({ database, tableGenerator });
}

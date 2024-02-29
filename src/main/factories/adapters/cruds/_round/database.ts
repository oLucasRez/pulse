import { RoundCRUD } from '@data/cruds';
import { DatabaseRoundCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeRoundsTableGenerator } from '@main/factories';

export function makeDatabaseRoundCRUD(): RoundCRUD {
  const database = makeDatabase();
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabaseRoundCRUD({ database, tableGenerator });
}

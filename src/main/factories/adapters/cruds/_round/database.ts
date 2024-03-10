import { RoundDAO } from '@data/dao';

import { DatabaseRoundDAO } from '@main/adapters/cruds';
import { makeDatabase, makeRoundsTableGenerator } from '@main/factories';

export function makeDatabaseRoundDAO(): RoundDAO {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabaseRoundDAO({ database, tableGenerator });
}

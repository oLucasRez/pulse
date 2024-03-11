import { PlayerDAO } from '@data/dao';

import { DatabasePlayerDAO } from '@main/adapters/dao';
import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabasePlayerDAO(): PlayerDAO {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makePlayersTableGenerator();

  return new DatabasePlayerDAO({ database, tableGenerator });
}

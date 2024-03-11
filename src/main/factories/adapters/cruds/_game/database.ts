import { GameDAO } from '@data/dao';

import { DatabaseGameDAO } from '@main/adapters/dao';
import { makeDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseGameDAO(): GameDAO {
  const database = makeDatabase('only 1 user read/write each data');
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseGameDAO({ database, tableGenerator });
}

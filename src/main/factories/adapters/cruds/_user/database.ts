import { UserDAO } from '@data/dao';

import { DatabaseUserDAO } from '@main/adapters/dao';
import { makeDatabase, makeUsersTableGenerator } from '@main/factories';

export function makeDatabaseUserDAO(): UserDAO {
  const database = makeDatabase('only 1 user read/write each data');
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseUserDAO({ database, tableGenerator });
}

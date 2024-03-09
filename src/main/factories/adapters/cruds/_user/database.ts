import { UserCRUD } from '@data/cruds';
import { DatabaseUserCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeUsersTableGenerator } from '@main/factories';

export function makeDatabaseUserCRUD(): UserCRUD {
  const database = makeDatabase('only 1 user read/write each data');
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseUserCRUD({ database, tableGenerator });
}

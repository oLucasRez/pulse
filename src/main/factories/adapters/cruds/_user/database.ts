import { UserCRUD } from '@data/cruds';
import { DatabaseUserCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeUsersTableGenerator } from '@main/factories';

export function makeDatabaseUserCRUD(): UserCRUD {
  const database = makeDatabase();
  const tableGenerator = makeUsersTableGenerator();

  return new DatabaseUserCRUD({ database, tableGenerator });
}

import { UserDAO } from '@data/dao';

import { makeDatabaseUserDAO } from './database';

export function makeUserDAO(): UserDAO {
  return makeDatabaseUserDAO();
}

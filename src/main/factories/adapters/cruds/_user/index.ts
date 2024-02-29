import { UserCRUD } from '@data/cruds';

import { makeDatabaseUserCRUD } from './database';

export function makeUserCRUD(): UserCRUD {
  return makeDatabaseUserCRUD();
}

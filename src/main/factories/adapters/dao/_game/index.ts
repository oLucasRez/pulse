import { GameDAO } from '@data/dao';

import { makeDatabaseGameDAO } from './database';

export function makeGameDAO(): GameDAO {
  return makeDatabaseGameDAO();
}

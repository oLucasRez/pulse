import { PlayerDAO } from '@data/dao';

import { makeDatabasePlayerDAO } from './database';

export function makePlayerDAO(): PlayerDAO {
  return makeDatabasePlayerDAO();
}

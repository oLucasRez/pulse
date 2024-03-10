import { RoundDAO } from '@data/dao';

import { makeDatabaseRoundDAO } from './database';

export function makeRoundDAO(): RoundDAO {
  return makeDatabaseRoundDAO();
}

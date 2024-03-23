import { CentralFactDAO } from '@data/dao';

import { makeDatabaseCentralFactDAO } from './database';

export function makeCentralFactDAO(): CentralFactDAO {
  return makeDatabaseCentralFactDAO();
}

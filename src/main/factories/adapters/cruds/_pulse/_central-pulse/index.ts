import { CentralPulseDAO } from '@data/dao';

import { makeDatabaseCentralPulseDAO } from './database';

export function makeCentralPulseDAO(): CentralPulseDAO {
  return makeDatabaseCentralPulseDAO();
}

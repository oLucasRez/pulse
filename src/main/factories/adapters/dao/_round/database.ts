import { RoundDAO } from '@data/dao';

import { DatabaseRoundDAO } from '@main/adapters/dao';
import {
  makeDatabase,
  makeRoundsTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeDatabaseRoundDAO(): RoundDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabaseRoundDAO({ database, socket, tableGenerator });
}

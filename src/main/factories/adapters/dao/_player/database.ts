import { PlayerDAO } from '@data/dao';

import { DatabasePlayerDAO } from '@main/adapters/dao';
import {
  makeDatabase,
  makePlayersTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeDatabasePlayerDAO(): PlayerDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makePlayersTableGenerator();

  return new DatabasePlayerDAO({ database, socket, tableGenerator });
}

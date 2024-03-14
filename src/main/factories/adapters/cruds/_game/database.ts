import { GameDAO } from '@data/dao';

import { DatabaseGameDAO } from '@main/adapters/dao';
import {
  makeDatabase,
  makeGamesTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeDatabaseGameDAO(): GameDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseGameDAO({ database, socket, tableGenerator });
}

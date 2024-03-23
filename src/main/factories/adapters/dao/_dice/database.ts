import { DiceDAO } from '@data/dao';

import { DatabaseDiceDAO } from '@main/adapters/dao';
import {
  makeDatabase,
  makeDicesTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeDatabaseDiceDAO(): DiceDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseDiceDAO({ database, socket, tableGenerator });
}

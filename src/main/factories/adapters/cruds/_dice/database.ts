import { DiceDAO } from '@data/dao';

import { DatabaseDiceDAO } from '@main/adapters/cruds';
import { makeDatabase, makeDicesTableGenerator } from '@main/factories';

export function makeDatabaseDiceDAO(): DiceDAO {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseDiceDAO({ database, tableGenerator });
}

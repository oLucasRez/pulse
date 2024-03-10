import { DiceDAO } from '@data/dao';

import { makeDatabaseDiceDAO } from './database';

export function makeDiceDAO(): DiceDAO {
  return makeDatabaseDiceDAO();
}

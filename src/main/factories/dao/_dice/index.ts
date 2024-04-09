import { IDiceDAO } from '@data/dao';

import { DiceDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let diceDAO: IDiceDAO | null = null;

export function makeDiceDAO(): IDiceDAO {
  if (!diceDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    diceDAO = new DiceDAO({ database, sessionGetter, socket, userDAO });
  }

  return diceDAO;
}

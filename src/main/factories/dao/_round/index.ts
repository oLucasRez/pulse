import { IRoundDAO } from '@data/dao';

import { RoundDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let roundDAO: IRoundDAO | null = null;

export function makeRoundDAO(): IRoundDAO {
  if (!roundDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    roundDAO = new RoundDAO({ database, sessionGetter, socket, userDAO });
  }

  return roundDAO;
}

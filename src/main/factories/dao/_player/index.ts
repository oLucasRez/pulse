import { IPlayerDAO } from '@data/dao';

import { PlayerDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let playerDAO: IPlayerDAO | null = null;

export function makePlayerDAO(): IPlayerDAO {
  if (!playerDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    playerDAO = new PlayerDAO({ database, sessionGetter, socket, userDAO });
  }

  return playerDAO;
}

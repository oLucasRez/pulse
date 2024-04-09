import { ICentralFactDAO } from '@data/dao';

import { CentralFactDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let centralFactDAO: ICentralFactDAO | null = null;

export function makeCentralFactDAO(): ICentralFactDAO {
  if (!centralFactDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    centralFactDAO = new CentralFactDAO({
      database,
      sessionGetter,
      socket,
      userDAO,
    });
  }

  return centralFactDAO;
}

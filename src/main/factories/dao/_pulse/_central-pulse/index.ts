import { ICentralPulseDAO } from '@data/dao';

import { CentralPulseDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let centralPulseDAO: ICentralPulseDAO | null = null;

export function makeCentralPulseDAO(): ICentralPulseDAO {
  if (!centralPulseDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    centralPulseDAO = new CentralPulseDAO({
      database,
      sessionGetter,
      socket,
      userDAO,
    });
  }

  return centralPulseDAO;
}

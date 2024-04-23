import { ILightSpotDAO } from '@data/dao';

import { LightSpotDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let lightSpotDAO: ILightSpotDAO | null = null;

export function makeLightSpotDAO(): ILightSpotDAO {
  if (!lightSpotDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    lightSpotDAO = new LightSpotDAO({
      database,
      sessionGetter,
      socket,
      userDAO,
    });
  }

  return lightSpotDAO;
}

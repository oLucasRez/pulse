import { IGameDAO } from '@data/dao';

import { GameDAO } from '@main/dao';
import { makeDatabase, makeSessionGetter, makeSocket } from '@main/factories';

let gameDAO: IGameDAO | null = null;

export function makeGameDAO(): IGameDAO {
  if (!gameDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');

    gameDAO = new GameDAO({ database, sessionGetter, socket });
  }

  return gameDAO;
}

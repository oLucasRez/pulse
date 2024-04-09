import { IUserDAO } from '@data/dao';

import { UserDAO } from '@main/dao';
import { makeDatabase } from '@main/factories';

let userDAO: IUserDAO | null = null;

export function makeUserDAO(): IUserDAO {
  if (!userDAO) {
    const database = makeDatabase('only 1 user read/write each data');

    userDAO = new UserDAO({ database });
  }

  return userDAO;
}

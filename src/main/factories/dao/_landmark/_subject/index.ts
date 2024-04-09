import { ISubjectDAO } from '@data/dao';

import { SubjectDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let subjectDAO: ISubjectDAO | null = null;

export function makeSubjectDAO(): ISubjectDAO {
  if (!subjectDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    subjectDAO = new SubjectDAO({ database, sessionGetter, socket, userDAO });
  }

  return subjectDAO;
}

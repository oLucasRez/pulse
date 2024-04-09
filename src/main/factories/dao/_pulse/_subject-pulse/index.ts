import { ISubjectPulseDAO } from '@data/dao';

import { SubjectPulseDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let subjectPulseDAO: ISubjectPulseDAO | null = null;

export function makeSubjectPulseDAO(): ISubjectPulseDAO {
  if (!subjectPulseDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    subjectPulseDAO = new SubjectPulseDAO({
      database,
      sessionGetter,
      socket,
      userDAO,
    });
  }

  return subjectPulseDAO;
}

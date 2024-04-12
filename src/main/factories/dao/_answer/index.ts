import { IAnswerDAO } from '@data/dao';

import { AnswerDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let answerDAO: IAnswerDAO | null = null;

export function makeAnswerDAO(): IAnswerDAO {
  if (!answerDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    answerDAO = new AnswerDAO({ database, sessionGetter, socket, userDAO });
  }

  return answerDAO;
}

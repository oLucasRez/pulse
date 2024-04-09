import { IQuestionDAO } from '@data/dao';

import { QuestionDAO } from '@main/dao';
import {
  makeDatabase,
  makeSessionGetter,
  makeSocket,
  makeUserDAO,
} from '@main/factories';

let questionDAO: IQuestionDAO | null = null;

export function makeQuestionDAO(): IQuestionDAO {
  if (!questionDAO) {
    const database = makeDatabase('multiple users read/write same data');
    const sessionGetter = makeSessionGetter();
    const socket = makeSocket('multiple users listen same data');
    const userDAO = makeUserDAO();

    questionDAO = new QuestionDAO({ database, sessionGetter, socket, userDAO });
  }

  return questionDAO;
}

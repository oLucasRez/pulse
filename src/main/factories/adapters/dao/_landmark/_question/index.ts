import { QuestionDAO } from '@data/dao';

import { makeDatabaseQuestionDAO } from './database';

export function makeQuestionDAO(): QuestionDAO {
  return makeDatabaseQuestionDAO();
}

import { QuestionDAO } from '@data/dao';

import { DatabaseQuestionDAO } from '@main/adapters/dao';
import {
  makeDatabase,
  makeQuestionsTableGenerator,
  makeSocket,
} from '@main/factories';

export function makeDatabaseQuestionDAO(): QuestionDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeQuestionsTableGenerator();

  return new DatabaseQuestionDAO({ database, socket, tableGenerator });
}

import { SubjectDAO } from '@data/dao';

import { DatabaseSubjectDAO } from '@main/adapters/dao';
import {
  makeDatabase,
  makeSocket,
  makeSubjectsTableGenerator,
} from '@main/factories';

export function makeDatabaseSubjectDAO(): SubjectDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeSubjectsTableGenerator();

  return new DatabaseSubjectDAO({ database, socket, tableGenerator });
}

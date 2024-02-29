import { SubjectCRUD } from '@data/cruds';
import { DatabaseSubjectCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeSubjectsTableGenerator } from '@main/factories';

export function makeDatabaseSubjectCRUD(): SubjectCRUD {
  const database = makeDatabase();
  const tableGenerator = makeSubjectsTableGenerator();

  return new DatabaseSubjectCRUD({ database, tableGenerator });
}

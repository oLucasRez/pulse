import { SubjectCRUD } from '@data/cruds';

import { makeDatabaseSubjectCRUD } from './database';

export function makeSubjectCRUD(): SubjectCRUD {
  return makeDatabaseSubjectCRUD();
}

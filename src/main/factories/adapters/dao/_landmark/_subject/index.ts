import { SubjectDAO } from '@data/dao';

import { makeDatabaseSubjectDAO } from './database';

export function makeSubjectDAO(): SubjectDAO {
  return makeDatabaseSubjectDAO();
}

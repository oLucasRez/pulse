import { SubjectPulseDAO } from '@data/dao';

import { makeDatabaseSubjectPulseDAO } from './database';

export function makeSubjectPulseDAO(): SubjectPulseDAO {
  return makeDatabaseSubjectPulseDAO();
}

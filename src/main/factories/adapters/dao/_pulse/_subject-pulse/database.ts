import { SubjectPulseDAO } from '@data/dao';

import { DatabaseSubjectPulseDAO } from '@main/adapters';
import {
  makeDatabase,
  makeSocket,
  makeSubjectPulsesTableGenerator,
} from '@main/factories';

export function makeDatabaseSubjectPulseDAO(): SubjectPulseDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeSubjectPulsesTableGenerator();

  return new DatabaseSubjectPulseDAO({ database, socket, tableGenerator });
}

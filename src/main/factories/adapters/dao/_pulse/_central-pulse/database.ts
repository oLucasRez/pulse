import { CentralPulseDAO } from '@data/dao';

import { DatabaseCentralPulseDAO } from '@main/adapters/dao';
import {
  makeCentralPulsesTableGenerator,
  makeDatabase,
  makeSocket,
} from '@main/factories';

export function makeDatabaseCentralPulseDAO(): CentralPulseDAO {
  const database = makeDatabase('multiple users read/write same data');
  const socket = makeSocket('multiple users listen same data');
  const tableGenerator = makeCentralPulsesTableGenerator();

  return new DatabaseCentralPulseDAO({ database, socket, tableGenerator });
}

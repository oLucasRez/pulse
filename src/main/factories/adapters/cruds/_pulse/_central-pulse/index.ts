import { CentralPulseCRUD } from '@data/cruds';

import { makeDatabaseCentralPulseCRUD } from './database';

export function makeCentralPulseCRUD(): CentralPulseCRUD {
  return makeDatabaseCentralPulseCRUD();
}

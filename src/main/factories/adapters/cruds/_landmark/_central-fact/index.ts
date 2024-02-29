import { CentralFactCRUD } from '@data/cruds';

import { makeDatabaseCentralFactCRUD } from './database';

export function makeCentralFactCRUD(): CentralFactCRUD {
  return makeDatabaseCentralFactCRUD();
}

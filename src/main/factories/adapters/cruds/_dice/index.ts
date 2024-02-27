import { DiceCRUD } from '@data/cruds';

import { makeDatabaseDiceCRUD } from './database';

export function makeDiceCRUD(): DiceCRUD {
  return makeDatabaseDiceCRUD();
}

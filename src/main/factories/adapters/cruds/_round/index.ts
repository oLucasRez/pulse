import { RoundCRUD } from '@data/cruds';

import { makeDatabaseRoundCRUD } from './database';

export function makeRoundCRUD(): RoundCRUD {
  return makeDatabaseRoundCRUD();
}

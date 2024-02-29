import { PlayerCRUD } from '@data/cruds';

import { makeDatabasePlayerCRUD } from './database';

export function makePlayerCRUD(): PlayerCRUD {
  return makeDatabasePlayerCRUD();
}

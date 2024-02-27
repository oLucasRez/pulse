import { GameCRUD } from '@data/cruds';

import { makeDatabaseGameCRUD } from './database';

export function makeGameCRUD(): GameCRUD {
  return makeDatabaseGameCRUD();
}

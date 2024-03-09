import { GameCRUD } from '@data/cruds';
import { DatabaseGameCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseGameCRUD(): GameCRUD {
  const database = makeDatabase('only 1 user read/write each data');
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseGameCRUD({ database, tableGenerator });
}

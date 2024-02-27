import { GameCRUD } from '@data/cruds';
import { DatabaseGameCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseGameCRUD(): GameCRUD {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseGameCRUD({ database, tableGenerator });
}

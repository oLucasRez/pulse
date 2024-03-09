import { PlayerCRUD } from '@data/cruds';
import { DatabasePlayerCRUD } from '@main/adapters/cruds';

import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabasePlayerCRUD(): PlayerCRUD {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makePlayersTableGenerator();

  return new DatabasePlayerCRUD({ database, tableGenerator });
}

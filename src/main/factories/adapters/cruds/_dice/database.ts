import { DiceCRUD } from '@data/cruds';
import { DatabaseDiceCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeDicesTableGenerator } from '@main/factories';

export function makeDatabaseDiceCRUD(): DiceCRUD {
  const database = makeDatabase();
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseDiceCRUD({ database, tableGenerator });
}

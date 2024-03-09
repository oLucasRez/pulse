import { DiceCRUD } from '@data/cruds';
import { DatabaseDiceCRUD } from '@main/adapters/cruds';

import { makeDatabase, makeDicesTableGenerator } from '@main/factories';

export function makeDatabaseDiceCRUD(): DiceCRUD {
  const database = makeDatabase('multiple users read/write same data');
  const tableGenerator = makeDicesTableGenerator();

  return new DatabaseDiceCRUD({ database, tableGenerator });
}

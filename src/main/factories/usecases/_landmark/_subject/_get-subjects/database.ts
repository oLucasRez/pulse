import { DatabaseGetSubjectUsecase } from '@data/usecases';
import { GetSubjectUsecase } from '@domain/usecases';

import { makeDatabase, makeSubjectsTableGenerator } from '@main/factories';

export function makeDatabaseGetSubjectsUsecase(): GetSubjectUsecase {
  const database = makeDatabase();
  const tableGenerator = makeSubjectsTableGenerator();

  return new DatabaseGetSubjectUsecase({
    database,
    tableGenerator,
  });
}

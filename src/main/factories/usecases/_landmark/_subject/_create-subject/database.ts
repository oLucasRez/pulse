import { DatabaseCreateSubjectUsecase } from '@data/usecases';
import { CreateSubjectUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMyPlayerUsecase,
  makeSubjectsTableGenerator,
} from '@main/factories';

export function makeDatabaseCreateSubjectUsecase(): CreateSubjectUsecase {
  const database = makeDatabase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const tableGenerator = makeSubjectsTableGenerator();

  return new DatabaseCreateSubjectUsecase({
    database,
    getMyPlayer,
    tableGenerator,
  });
}

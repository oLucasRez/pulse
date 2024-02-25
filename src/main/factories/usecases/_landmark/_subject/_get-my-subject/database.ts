import { DatabaseGetMySubjectUsecase } from '@data/usecases';
import { GetMySubjectUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMyPlayerUsecase,
  makeSubjectsTableGenerator,
} from '@main/factories';

export function makeDatabaseGetMySubjectUsecase(): GetMySubjectUsecase {
  const database = makeDatabase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const tableGenerator = makeSubjectsTableGenerator();

  return new DatabaseGetMySubjectUsecase({
    database,
    getMyPlayer,
    tableGenerator,
  });
}

import { DatabaseChangeSubjectUsecase } from '@data/usecases';
import { ChangeSubjectUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectsTableGenerator,
} from '@main/factories';

export function makeDatabaseChangeSubjectUsecase(): ChangeSubjectUsecase {
  const database = makeDatabase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const tableGenerator = makeSubjectsTableGenerator();

  return new DatabaseChangeSubjectUsecase({
    database,
    getMyPlayer,
    getSubject,
    tableGenerator,
  });
}

import { CRUDChangeSubjectUsecase } from '@data/usecases';
import { ChangeSubjectUsecase } from '@domain/usecases';

import {
  makeGetMyPlayerUsecase,
  makeGetSubjectUsecase,
  makeSubjectCRUD,
} from '@main/factories';

export function makeCRUDChangeSubjectUsecase(): ChangeSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getSubject = makeGetSubjectUsecase();
  const subjectCRUD = makeSubjectCRUD();

  return new CRUDChangeSubjectUsecase({
    getMyPlayer,
    getSubject,
    subjectCRUD,
  });
}

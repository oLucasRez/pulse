import { CRUDCreateSubjectUsecase } from '@data/usecases';
import { CreateSubjectUsecase } from '@domain/usecases';

import { makeGetMyPlayerUsecase, makeSubjectCRUD } from '@main/factories';

export function makeCRUDCreateSubjectUsecase(): CreateSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectCRUD = makeSubjectCRUD();

  return new CRUDCreateSubjectUsecase({
    getMyPlayer,
    subjectCRUD,
  });
}

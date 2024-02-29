import { CRUDGetSubjectUsecase } from '@data/usecases';
import { GetSubjectUsecase } from '@domain/usecases';

import { makeSubjectCRUD } from '@main/factories';

export function makeCRUDGetSubjectUsecase(): GetSubjectUsecase {
  const subjectCRUD = makeSubjectCRUD();

  return new CRUDGetSubjectUsecase({
    subjectCRUD,
  });
}

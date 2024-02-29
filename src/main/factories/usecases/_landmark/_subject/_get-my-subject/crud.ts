import { CRUDGetMySubjectUsecase } from '@data/usecases';
import { GetMySubjectUsecase } from '@domain/usecases';

import { makeGetMyPlayerUsecase, makeSubjectCRUD } from '@main/factories';

export function makeCRUDGetMySubjectUsecase(): GetMySubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectCRUD = makeSubjectCRUD();

  return new CRUDGetMySubjectUsecase({
    getMyPlayer,
    subjectCRUD,
  });
}

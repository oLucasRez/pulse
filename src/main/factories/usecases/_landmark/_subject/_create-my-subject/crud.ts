import { CRUDCreateMySubjectUsecase } from '@data/usecases';
import { CreateMySubjectUsecase } from '@domain/usecases';

import {
  makeCreateSubjectUsecase,
  makeGetMeUsecase,
  makeGetMyPlayerUsecase,
  makeSetPlayerSubjectUsecase,
} from '@main/factories';

export function makeCRUDCreateMySubjectUsecase(): CreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const getMe = makeGetMeUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setPlayerSubject = makeSetPlayerSubjectUsecase();

  return new CRUDCreateMySubjectUsecase({
    createSubject,
    getMe,
    getMyPlayer,
    setPlayerSubject,
  });
}

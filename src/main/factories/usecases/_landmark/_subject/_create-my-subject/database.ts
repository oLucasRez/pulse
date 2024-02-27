import { DatabaseCreateMySubjectUsecase } from '@data/usecases';
import { CreateMySubjectUsecase } from '@domain/usecases';

import {
  makeCreateSubjectUsecase,
  makeGetMeUsecase,
  makeGetMyPlayerUsecase,
  makeSetPlayerSubjectUsecase,
} from '@main/factories';

export function makeDatabaseCreateMySubjectUsecase(): CreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const getMe = makeGetMeUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setPlayerSubject = makeSetPlayerSubjectUsecase();

  return new DatabaseCreateMySubjectUsecase({
    createSubject,
    getMe,
    getMyPlayer,
    setPlayerSubject,
  });
}

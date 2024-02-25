import { DatabaseCreateMySubjectUsecase } from '@data/usecases';
import { CreateMySubjectUsecase } from '@domain/usecases';

import {
  makeCreateSubjectUsecase,
  makeGetMyPlayerUsecase,
  makeSetPlayerSubjectUsecase,
} from '@main/factories';

export function makeDatabaseCreateMySubjectUsecase(): CreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setPlayerSubject = makeSetPlayerSubjectUsecase();

  return new DatabaseCreateMySubjectUsecase({
    createSubject,
    getMyPlayer,
    setPlayerSubject,
  });
}

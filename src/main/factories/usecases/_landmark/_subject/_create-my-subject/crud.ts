import { CRUDCreateMySubjectUsecase } from '@data/usecases';
import { CreateMySubjectUsecase } from '@domain/usecases';

import {
  makeCreateSubjectUsecase,
  makeGetCurrentGameUsecase,
  makeGetMyPlayerUsecase,
  makeSetPlayerSubjectUsecase,
} from '@main/factories';

export function makeCRUDCreateMySubjectUsecase(): CreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setPlayerSubject = makeSetPlayerSubjectUsecase();

  return new CRUDCreateMySubjectUsecase({
    createSubject,
    getCurrentGame,
    getMyPlayer,
    setPlayerSubject,
  });
}

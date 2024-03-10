import { CreateMySubjectUsecase } from '@domain/usecases';

import { DAOCreateMySubjectUsecase } from '@data/usecases';

import {
  makeCreateSubjectUsecase,
  makeGetCurrentGameUsecase,
  makeGetMyPlayerUsecase,
  makeSetPlayerSubjectUsecase,
} from '@main/factories';

export function makeDAOCreateMySubjectUsecase(): CreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setPlayerSubject = makeSetPlayerSubjectUsecase();

  return new DAOCreateMySubjectUsecase({
    createSubject,
    getCurrentGame,
    getMyPlayer,
    setPlayerSubject,
  });
}
